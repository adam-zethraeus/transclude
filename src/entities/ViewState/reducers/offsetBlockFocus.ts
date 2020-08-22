import { createAction, createReducer } from '@reduxjs/toolkit'
import { BlockPath, isBrowseView, createBlockPath } from '../viewSlice'
import { RootState } from '../../../app/store'
import { BlockId, getSubBlocks, getBlockPathFromPage } from '../../Block/blocksSlice'
import { getPageBlocks } from '../../Page/pagesSlice'
import { store } from '../../../app/store'



export const offsetBlockFocusAction = createAction('view/offset-block-focus', (path: BlockPath | undefined, offset: number) => ({
  payload: { path: path, offset: offset}
}));

const accumulateBlockIdsInViewOrder = (state: RootState, blockId: BlockId, accumulator: BlockId[]) => {
  accumulator.push(blockId);
  getSubBlocks(state, blockId).forEach( id => accumulateBlockIdsInViewOrder(state, id, accumulator));
}

// TODO: actually use this.
export const offsetBlockFocusReducer = createReducer(store.getState(), builder => {
  builder.addCase(offsetBlockFocusAction, (state, action) => {
    let path = action.payload.path;
    let offset = action.payload.offset;
    if (!path) {
      return;
    }
    let pageRootBlocks = getPageBlocks(state, path.pageId);
    let linearBlocks: BlockId[] = [];
    pageRootBlocks.forEach(id => accumulateBlockIdsInViewOrder(state, id, linearBlocks));
    let currBlockIndex = linearBlocks.indexOf(path.blockId);
    if (currBlockIndex < 0) {
      return;
    }
    let newBlockIndex = currBlockIndex + offset;
    if (newBlockIndex < 0 || newBlockIndex > linearBlocks.length) {
      return;
    }
    let newBlockId = linearBlocks[newBlockIndex];
    if (isBrowseView(state.view)) {
      let newPath = getBlockPathFromPage(state, path.pageId, newBlockId);
      if (!!newPath) {
        state.view.focusPath = newPath;
      }
    }
  })
});

