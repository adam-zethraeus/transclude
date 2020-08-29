import { PayloadAction } from '@reduxjs/toolkit'
import { isBrowseView } from '../viewSlice'
import { getSubBlocks, getBlockPathFromPage } from '../../Block/blocksSlice'
import { getPageBlocks } from '../../Page/pagesSlice'
import { BlockId, BlockRecord, BlocksStoreDataType, PagesStoreDataType, PageId, BlockPath, RootState, ViewState } from '../../../types';

type Payload = {
    path: BlockPath
    offset: number
    blocksStore: BlocksStoreDataType
    pagesStore: PagesStoreDataType
}

export default {
  reducer: (state: ViewState, action: PayloadAction<Payload>) => {
    let path = action.payload.path;
    let offset = action.payload.offset;
    let pagesState = action.payload.pagesStore;
    let blocksState = action.payload.blocksStore;
    if (!path) {
      return;
    }
    let pageRootBlocks = getPageBlocks(pagesState, path.pageId);
    let linearBlocks: BlockId[] = [];
    pageRootBlocks.forEach(id => accumulateBlockIdsInViewOrder(blocksState, id, linearBlocks));
    let currBlockIndex = linearBlocks.indexOf(path.blockId);
    if (currBlockIndex < 0) {
      return;
    }
    let newBlockIndex = currBlockIndex + offset;
    if (newBlockIndex < 0 || newBlockIndex > linearBlocks.length) {
      return;
    }
    let newBlockId = linearBlocks[newBlockIndex];
    if (isBrowseView(state)) {
      let newPath = getBlockPathFromPage(blocksState, pagesState, path.pageId, newBlockId);
      if (!!newPath) {
        state.focusPath = newPath;
      }
    }
  },
  prepare: (path: BlockPath, offset: number, blocksStore: BlocksStoreDataType, pagesStore: PagesStoreDataType) => ({
    payload: {
      path: path,
      offset: offset,
      blocksStore: blocksStore,
      pagesStore: pagesStore
    }
  })
}

const accumulateBlockIdsInViewOrder = (state: BlocksStoreDataType, blockId: BlockId, accumulator: BlockId[]) => {
  accumulator.push(blockId);
  getSubBlocks(state, blockId).forEach( id => accumulateBlockIdsInViewOrder(state, id, accumulator));
}

