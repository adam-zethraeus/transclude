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
  let currRecord = state.data.blocks.byId[curr];
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

export type AddBlockPayload = {
  isNominallyValid: boolean
  owningPageId: PageId
  parentBlockId?: BlockId
  lastSiblingBlockId?: BlockId
  pagesState: PagesStoreDataType
  blocksState: BlocksStoreDataType
  newRecord: BlockRecord
}

function isAddBlockPayloadInternallyConsistent(
  blocksState: BlocksStoreDataType,
  pagesState: PagesStoreDataType,
  owningPageId: PageId,
  newRecord: BlockRecord,
  parentBlockId?: BlockId,
  lastSiblingBlockId?: BlockId): boolean {
  if (!pagesState.byId[owningPageId]) { return false };
  if (!!parentBlockId && (!blocksState.byId[parentBlockId] || !getBlockPathFromPage(blocksState, pagesState, owningPageId, parentBlockId))) { return false };
  if (!!lastSiblingBlockId && !getBlockPathFromPage(blocksState, pagesState, owningPageId, lastSiblingBlockId)) { return false };
  if (!!blocksState.byId[newRecord.id]) { return false };
  return true;
}

export const blocksSlice = createSlice({
  name: 'blocks',
  initialState,
  reducers: {
    updateBlock: {
      reducer: (state: BlocksStoreDataType, action: PayloadAction<BlockRecord>) => {
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
      reducer: (state: BlocksStoreDataType, action: PayloadAction<AddBlockPayload>) => {
        if (!action.payload.isNominallyValid) { return }

        let pagesState = action.payload.pagesState;
        let pageId = action.payload.owningPageId;
        let parentBlockId = action.payload.parentBlockId;
        let lastSiblingBlockId = action.payload.lastSiblingBlockId;
        let newBlock = action.payload.newRecord;

        // Save block
        state.byId[newBlock.id] = newBlock;
        state.allIds.push(newBlock.id);

        // If there's no parentBlockId the only insertion is done in the pagesSlice.
        if (!parentBlockId) { return };

        // Check validity relative to store.
        if(!state.byId[parentBlockId]) { return };

        // Hook block into correct position relative to other blocks.
        let insertLocation = !!lastSiblingBlockId ? state.byId[parentBlockId].subBlockIds.indexOf(lastSiblingBlockId) + 1 : 0;
        state.byId[parentBlockId].subBlockIds.splice(insertLocation, 0, newBlock.id);


      },
      prepare: (
        owningPageId: PageId,
        pagesState:PagesStoreDataType,
        blocksState: BlocksStoreDataType,
        parentBlockId?: BlockId,
        lastSiblingBlockId?: BlockId,
        initialContent?: string,
      ) => {
        let now = Date.now();
        let record = {
          id: nanoid(),
          content: initialContent ?? "",
          creationTime: now,
          lastModificationTime: now,
          subBlockIds: [],
        }
        return {
          payload: {
            isNominallyValid: isAddBlockPayloadInternallyConsistent(blocksState, pagesState, owningPageId, record, parentBlockId, lastSiblingBlockId),
            owningPageId: owningPageId,
            parentBlockId: parentBlockId,
            lastSiblingBlockId: lastSiblingBlockId,
            pagesState: pagesState,
            blocksState: blocksState,
            newRecord: record,
          }
        }
      },
    }
  }
});

export const { addBlock, updateBlock } = blocksSlice.actions;

export const getBlockRecord = (state: RootState, id: BlockId) => state.data.blocks.byId[id];
export const getSubBlocks = (state: BlocksStoreDataType, id: BlockId): BlockId[] => state.byId[id]?.subBlockIds;
export const makeGetBlockRecord = () => createSelector(getBlockRecord, x => x)
export const getBlocksStore = createSelector((state: RootState) => state.data.blocks, x => x);

export default blocksSlice.reducer;
