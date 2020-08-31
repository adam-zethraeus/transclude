import { assert, assertFail } from '../../utils'
import { createSlice, PayloadAction, createSelector, nanoid } from '@reduxjs/toolkit'
import { addBlock, AddBlockPayload, indentBlock, outdentBlock, IndentPayload } from '../Block/blocksSlice'
import { RootState, PagesStoreDataType, PageRecord, BlockId } from '../../types'

const initialState: PagesStoreDataType = {
  byId: {},
  allIds: []
}

export const pageSlice = createSlice({
  name: 'pages',
  initialState,
  reducers: {
    addPage: {
      reducer: (state, action: PayloadAction<PageRecord>) => {
        let newPage = action.payload;
        if (!state.byId[newPage.id]) {
          state.byId[newPage.id] = newPage;
          state.allIds.push(newPage.id);
        }
      },
      prepare: title => ({
        payload: {
          id: nanoid(),
          title: title,
          blockIds: []
        } as PageRecord
      }),
    },
  },
  extraReducers: builder =>
    builder.addCase(addBlock, (state: PagesStoreDataType, action: PayloadAction<AddBlockPayload>) => {
      let pageId = action.payload.owningPageId;
      let newBlock = action.payload.newRecord;
      let focusPath = action.payload.focusPath;

      // Check validitiy relative to store;
      if (!state.byId[pageId]) { return };

      // If there's a parentBlockId the only insertion is done in the blocksSlice.
      if (!focusPath) {
        state.byId[pageId].blockIds.splice(0, 0, newBlock.id);
      } else if (focusPath.intermediateBlockIds.length === 0) {
        let focusBlock = action.payload.blocksState.byId[focusPath.blockId];
        if (!focusBlock) { assertFail('Inconsistency: focus block not found in store.') };
        // If the block in focus has children, blocksSlice will handle insertion.
        if (focusBlock.subBlockIds.length > 0) { return };

        let page = state.byId[pageId];
        if (!page) { assertFail('Inconsistency: parent of focus block not found in store.') };
        let focusIndex = page.blockIds.indexOf(focusPath.blockId);
        assert(focusIndex >= 0, 'Inconsistency: child not found in direct parent page');
        state.byId[pageId].blockIds.splice(focusIndex + 1, 0, newBlock.id);
      }
    })
    .addCase(indentBlock, (state: PagesStoreDataType, action: PayloadAction<IndentPayload>) => {
        // If there are intermediateBlockIds in the path, the direct parent is a block and blocksSlice owns.
        if (action.payload.focusPath.intermediateBlockIds.length === 0) {
          let blockId = action.payload.focusPath.blockId;
          let pageId = action.payload.focusPath.pageId;
          let page = state.byId[pageId];
          if (!page) { assertFail('Inconsistency: page parent of focus block not found in store.') };
          let focusIndex = page.blockIds.indexOf(blockId);
          assert(focusIndex >= 0, 'Inconsistency: child not found in parent\'s subBlocks.');
          // If first in parent, we can't indent.
          if (focusIndex === 0) { return };
          // Remove the child. blocksSlice will reparent.
          state.byId[pageId].blockIds.splice(focusIndex, 1);
        }
    })
    .addCase(outdentBlock, (state: PagesStoreDataType, action: PayloadAction<IndentPayload>) => {

    })
});

export const { addPage } = pageSlice.actions;

const getPageRecord = (state: PagesStoreDataType, id: string): PageRecord =>
  state.byId[id];

export const getPageBlocks = (state: PagesStoreDataType, id: string): BlockId[] =>
  getPageRecord(state, id).blockIds;

export const makeGetPageRecord = () => createSelector(getPageRecord, x => x)
export const getPagesStore = createSelector((state: RootState) => state.data.pages, x => x);
export default pageSlice.reducer;
