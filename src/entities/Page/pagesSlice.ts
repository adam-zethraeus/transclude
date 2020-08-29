import { createSlice, PayloadAction, createSelector, nanoid } from '@reduxjs/toolkit'
import { BlockId, addBlock, AddBlockPayload, getBlockPathFromPage } from '../Block/blocksSlice'
import { RootState } from '../../app/store'

export type PageId = string;
export type PageRecord = {
  id: PageId,
  title: string,
  blockIds: BlockId[] // TODO: rename to subBlockIds, topLevelBlockIds or something that doesn't imply it contains all its decendents.
};
export type PagesStoreDataType = { allIds: PageId[], byId: Record<string, PageRecord> };

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
