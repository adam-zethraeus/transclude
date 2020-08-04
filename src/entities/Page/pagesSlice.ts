import { createSlice, PayloadAction } from '@reduxjs/toolkit';
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
        addPage: (state, action: PayloadAction<PageRecord>) => {
            let newPage = action.payload;
            if (!state.byId[newPage.id]) {
                state.byId[newPage.id] = newPage;
                state.allIds.push(newPage.id);
            }
        }
    },
});

export const { addPage } = pageSlice.actions;

// FIXME: use nested reducers instead here.
export const makePageRecordSelector = (id: PageId) => {
    return (state: RootState) => { 
        return state.pages.byId[id];
    };
}

export default pageSlice.reducer;
