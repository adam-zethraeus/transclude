import { createSlice, PayloadAction, createSelector, nanoid } from '@reduxjs/toolkit'
import { BlockId } from '../Block/blocksSlice'
import { RootState } from '../../app/store'

export type PageId = string;
export type PageRecord = {
  id: PageId,
  title: string,
  blockIds: BlockId[]
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
      prepare: title => {
        return {
          payload: {
            id: nanoid(),
            title: title,
            blockIds: []
          } as PageRecord
        }
      },
    },
  },
});

export const { addPage } = pageSlice.actions;

const getPageRecord = (state: PagesStoreDataType, id: string): PageRecord =>
  state.byId[id];

export const getPageBlocks = (state: PagesStoreDataType, id: string): BlockId[] =>
  getPageRecord(state, id).blockIds;

export const makeGetPageRecord = () => createSelector(getPageRecord, x => x)
export const getPagesStore = createSelector((state: RootState) => state.data.pages, x => x);
export default pageSlice.reducer;
