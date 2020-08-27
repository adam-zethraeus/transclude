import { createSlice, PayloadAction, createSelector, nanoid } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { assert } from '../../utils'
import { PageId, getPageBlocks, PagesStoreDataType }  from '../Page/pagesSlice'
import { BlockPath, createBlockPath } from '../ViewState/viewSlice';

export type BlockId = string;
export type BlockRecord = {
  id: BlockId
  content: string
  subBlockIds: BlockId[]
  creationTime: number
  lastModificationTime: number
}

export type BlocksStoreDataType = { allIds: BlockId[], byId: Record<string, BlockRecord> };

// FIXME: use BlockPath
export function findPathToBlock(state: RootState, curr: BlockId, to: BlockId, path: BlockId[] = []): BlockId[] | null {
  if (path.includes(curr)) {
    return null;
  }
  let currPath = path.concat([curr]);
  if (curr === to) {
    return currPath;
  }
  let currRecord = state.blocks.byId[curr];
  assert(!!currRecord, `Invalid block: ${curr} linked via: ${path}`)

  for (let id of currRecord.subBlockIds) {
    let nextPath = findPathToBlock(state, id, to, currPath);
    if (nextPath !== null) {
      return nextPath;
    }
  }
  return null;
}

export const getBlockPathFromPage = (
    blocksState: BlocksStoreDataType,
    pagesState: PagesStoreDataType,
    pageId: PageId,
    blockId: BlockId): BlockPath | undefined => {

  const pathToBlock = (curr: BlockId, to: BlockId, path: BlockId[] = []): BlockId[] | undefined => {
    if (curr === to) { return path }
    return getSubBlocks(blocksState, curr)
      .filter(val => !!val)
      .map(id => pathToBlock(id, to, path.concat([curr])))
      .filter(val => !!val)
      .pop()
  }
  return getPageBlocks(pagesState, pageId)
    .map(id => pathToBlock(id, blockId))
    .filter(val => !!val)
    .map(path => createBlockPath(pageId, blockId, path))
    .pop()
}

const initialState: BlocksStoreDataType = {
  byId: {},
  allIds: []
}

type AddBlockPayload = {
  owningPageId: PageId
  parentBlockId?: BlockId
  lastSiblingBlockId?: BlockId
  record: BlockRecord
}

export const blocksSlice = createSlice({
  name: 'blocks',
  initialState,
  reducers: {
    updateBlock: {
      reducer: (state, action: PayloadAction<BlockRecord>) => {
        if (!!state.byId[action.payload.id]) {
          state.byId[action.payload.id].content = action.payload.content
        }
      },
      prepare: (blockId: BlockId, value: string) => {
        return {
          payload: {
            id: blockId,
            content: value
          } as BlockRecord
        }
      }
    },
    addBlock: {
      reducer: (state, action: PayloadAction<AddBlockPayload>) => {
        let newBlock = action.payload.record;
        // TODO:
        // - actually hook the block into the right place.
        // - include enough page state in the action to verify the page actually exists.
        // - include enough block state in the action for the page reducer to check sibling blocks.
        // - (should actions preppers be heavy enough that they actually do this themselves?)
        // - use the exported action to add an extraReducer to the pagesSlice.
        if (!state.byId[newBlock.id]) {
          state.byId[newBlock.id] = newBlock;
          state.allIds.push(newBlock.id);
        }
      },
      prepare: (owningPageId: PageId, parentBlockId?: BlockId, lastSiblingBlockId?: BlockId, initialContent?: string) => {
        let now = Date.now();
        return {
          payload: {
            owningPageId: owningPageId,
            parentBlockId: parentBlockId,
            lastSiblingBlockId: lastSiblingBlockId,
            record: {
              id: nanoid(),
              content: initialContent ?? "",
              creationTime: now,
              lastModificationTime: now,
              subBlockIds: [],
            }
          }
        }
      },
    }
  }
});

export const { addBlock, updateBlock } = blocksSlice.actions;

export const getBlockRecord = (state: RootState, id: BlockId) => state.blocks.byId[id];
export const getSubBlocks = (state: BlocksStoreDataType, id: BlockId): BlockId[] => state.byId[id]?.subBlockIds;
export const makeGetBlockRecord = () => createSelector(getBlockRecord, x => x)

export default blocksSlice.reducer;
