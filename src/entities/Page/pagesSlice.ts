import { createSlice, PayloadAction, createSelector, nanoid } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { BlockId } from '../Block/blocksSlice';

export type PageId = string;
export type PageRecord = {
    id: PageId,
    title: string,
    blockIds: BlockId[]
};
export type Pages = { allIds: PageId[], byId: Record<string, PageRecord> };

const initialState: Pages = {
    byId: {
        "?": {
            id: "?",
            title: "unknown",
            blockIds: []
        }
    },
    allIds: ["?"]
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

const getPageRecord = (state: RootState, props: { id: string }): PageRecord => 
    state.pages.byId[props.id];

export const makeGetPageRecord = () => createSelector(getPageRecord, x => x)
export default pageSlice.reducer;
