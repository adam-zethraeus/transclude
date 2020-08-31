import { createSlice, PayloadAction, nanoid } from '@reduxjs/toolkit'
import { assert, assertFail } from '../../utils'
import { createBlockPath } from '../ViewState/viewSlice'
import { BlockId, BlockRecord, BlocksStoreDataType, PagesStoreDataType, PageId, BlockPath, RootState } from '../../types'
import { getPageBlocks, getSubBlocks } from '../../selectors'

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
  owningPageId: PageId
  pagesState: PagesStoreDataType
  blocksState: BlocksStoreDataType
  newRecord: BlockRecord
  focusPath?: BlockPath
}

export type IndentPayload = {
  focusPath: BlockPath
  pagesState: PagesStoreDataType
  blocksState: BlocksStoreDataType
  lastModificationTime: number
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
    indentBlock: {
      reducer: (state: BlocksStoreDataType, action: PayloadAction<IndentPayload>) => {
        let blockId = action.payload.focusPath.blockId;
        if (action.payload.focusPath.intermediateBlockIds.length > 0) {
          let parentBlockId = action.payload.focusPath.intermediateBlockIds[action.payload.focusPath.intermediateBlockIds.length - 1]
          let parent = state.byId[parentBlockId];
          if (!parent) { assertFail('Inconsistency: parent of focus block not found in store.') };
          let focusIndex = parent.subBlockIds.indexOf(blockId);
          assert(focusIndex >= 0, 'Inconsistency: child not found in parent\'s subBlocks.');
          // If first in parent, we can't indent.
          if (focusIndex === 0) { return };
          let newParentId = state.byId[parentBlockId].subBlockIds[focusIndex - 1];
          // Remove from parent.
          state.byId[parentBlockId].subBlockIds.splice(focusIndex, 1);
          // We can always insert last.
          state.byId[newParentId].subBlockIds.push(blockId);
        } else {
          // Parent is a page.
          let parentPageId = action.payload.focusPath.pageId;
          let parent = action.payload.pagesState.byId[parentPageId];
          if (!parent) { assertFail('Inconsistency: parent page of focus block without intermediate not found in reducer\'s copy of pages state.') };
          let focusIndex = parent.blockIds.indexOf(blockId);
          assert(focusIndex >= 0, 'Inconsistency: child not found in parent page\'s subBlocks.');
          // If first in parent, we can't indent.
          if (focusIndex === 0) { return };
          let newParentId = action.payload.pagesState.byId[parentPageId].blockIds[focusIndex - 1];
          // We must rely on pagesSlice to remove the original reference from parent page.
          // We can always insert last.
          state.byId[newParentId].subBlockIds.push(blockId);
        }
      },
      prepare: (focusPath: BlockPath, pagesState:PagesStoreDataType, blocksState: BlocksStoreDataType) => {
        return {
          payload: { focusPath, pagesState, blocksState, lastModificationTime: Date.now()}
        }
      }
    },
    outdentBlock: {
      reducer: (state: BlocksStoreDataType, action: PayloadAction<IndentPayload>) => {
      },
      prepare: (focusPath: BlockPath, pagesState:PagesStoreDataType, blocksState: BlocksStoreDataType) => {
        return {
          payload: { focusPath, pagesState, blocksState, lastModificationTime: Date.now()}
        }
      }
    },
    addBlock: {
      reducer: (state: BlocksStoreDataType, action: PayloadAction<AddBlockPayload>) => {
        let newBlock = action.payload.newRecord;
        let focusPath = action.payload.focusPath;

        // Save block
        state.byId[newBlock.id] = newBlock;
        state.allIds.push(newBlock.id);

        // If there's no selected block the only remaining insertion is done in the pagesSlice.
        if (!focusPath) { return };

        let focusBlock = state.byId[focusPath.blockId];

        if (!focusBlock) { assertFail('Inconsistency: focus block not found in store.') };

        // Hook block into correct position relative to other blocks.

        // If focusBlock has children, add the new block as first child...
        if (focusBlock.subBlockIds.length > 0) {
          state.byId[focusBlock.id].subBlockIds.splice(0, 0, newBlock.id);
        } else { // ...else selected has no children so add as the next sibling to it.
          // If the focus block has no block parents, the pagesSlice will do the remaining insertion.
          if (focusPath.intermediateBlockIds.length === 0) { return };
          let parentBlockId = focusPath.intermediateBlockIds[focusPath.intermediateBlockIds.length - 1];
          let parentBlock = state.byId[parentBlockId];
          if (!parentBlock) { assertFail('Inconsistency: parent of focus block not found in store.') };
          let focusIndex = parentBlock.subBlockIds.indexOf(focusBlock.id);
          assert(focusIndex >= 0, 'Inconsistency: child not found in parent\'s subBlocks.');
          state.byId[parentBlockId].subBlockIds.splice(focusIndex + 1, 0, newBlock.id);
        }
      },
      prepare: (
        owningPageId: PageId,
        pagesState:PagesStoreDataType,
        blocksState: BlocksStoreDataType,
        focusPath?: BlockPath,
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
            owningPageId: owningPageId,
            pagesState: pagesState,
            blocksState: blocksState,
            newRecord: record,
            focusPath: focusPath,
          }
        }
      },
    }
  }
});

export const { addBlock, updateBlock, indentBlock, outdentBlock } = blocksSlice.actions;

export default blocksSlice.reducer;
