import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';
import { BlockId } from '../Block/blocksSlice';
import moment from 'moment';
import { RootState } from  '../../app/store';

// TODO: If we're modeling this explicitly like this it should probably replace connected-react-router.
export enum Mode {
    Browse = "BROWSE",
    Serialize = "SERIALIZE",
    ListPages = "LIST_PAGES",
    AddPage = "ADD_PAGE"
}

export type BrowseView = {
    mode: Mode // TODO: make Mode
    // pageId: PageId
    // drillDownBlockId?: BlockId
    focusBlockId?: BlockId
    time: string
};

export type SerializeView = {
    mode: Mode.Serialize
    time: string
};

export type ListPagesView = {
    mode: Mode.ListPages
    time: string
};

export type AddPageView = {
    mode: Mode.AddPage
    time: string
};

export function getViewState(state: RootState): ViewState {
    return state.view
}

export function isBrowseView(state: ViewState): state is BrowseView {
    return state.mode === Mode.Browse;
}
export function isSerializeView(state: ViewState): state is BrowseView {
    return state.mode === Mode.Serialize;
}
export function isListPagesView(state: ViewState): state is ListPagesView {
    return state.mode === Mode.ListPages;
}
export function isAddPageView(state: ViewState): state is AddPageView {
    return state.mode === Mode.AddPage;
}

export const getState = () => createSelector((getViewState), x => x)

export type ViewState = BrowseView | SerializeView | ListPagesView | AddPageView;


const initialState: BrowseView = {
    mode: Mode.Browse,
    focusBlockId: undefined,
    time: moment().toISOString() // TODO: find a good way to serialize the direct type
};

export const viewSlice = createSlice({
    name: 'view',
    initialState,
    reducers: {
        setViewState: (state: ViewState, action: PayloadAction<ViewState>) => {
            state = action.payload
        },
        setFocusBlock: {
            reducer: (state: ViewState, action: PayloadAction<ViewState>) => {
                state = action.payload
            },
            prepare: blockId => {
                return {
                    payload: {
                        mode: Mode.Browse,
                        focusBlockId: blockId,
                        time: moment().toISOString()
                    }
                }
            },
        },
        unfocus: {
            reducer: (state: ViewState, action: PayloadAction<ViewState>) => {
                state = action.payload
            },
            prepare: blockId => {
                return {
                    payload: {
                        mode: Mode.Browse,
                        focusBlockId: undefined,
                        time: moment().toISOString()
                    }
                }
            },
        } 
    },
});

export const { setViewState, setFocusBlock, unfocus } = viewSlice.actions;

export default viewSlice.reducer;
