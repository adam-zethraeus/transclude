import { createSlice, PayloadAction, createSelector, nanoid } from '@reduxjs/toolkit'
import { addBlock, AddBlockPayload, getBlockPathFromPage } from '../Block/blocksSlice'
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
      if (!action.payload.isNominallyValid) { return };

      let blocksState = action.payload.blocksState;
      let pageId = action.payload.owningPageId;
      let parentBlockId = action.payload.parentBlockId;
      let lastSiblingBlockId = action.payload.lastSiblingBlockId;
      let newBlock = action.payload.newRecord;

      // Check validitiy relative to store;
      if (!state.byId[pageId]) { return };

      // If there's a parentBlockId the only insertion is done in the blocksSlice.
      if (parentBlockId) { return };

      // Hook block into correct position relative to other blocks.
      let insertLocation = !!lastSiblingBlockId ? state.byId[pageId].blockIds.indexOf(lastSiblingBlockId) + 1 : 0;
      state.byId[pageId].blockIds.splice(insertLocation, 0, newBlock.id);
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
