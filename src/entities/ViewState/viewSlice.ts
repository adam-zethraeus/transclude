import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BlockId } from '../Block/blocksSlice';
import moment from 'moment';

// TODO: If we're modeling this explicitly like this it should probably replace connected-react-router.
enum Mode {
    Browse = "BROWSE",
    Serialize = "SERIALIZE",
    ListPages = "LIST_PAGES",
    AddPage = "ADD_PAGE"
}

type BrowseView = {
    mode: Mode.Browse
    // pageId: PageId
    // drillDownBlockId?: BlockId
    focusBlockId?: BlockId
    time: string
};

type SerializeView = {
    mode: Mode.Serialize
    time: string
};

type ListPagesView = {
    mode: Mode.ListPages
    time: string
};

type AddPageView = {
    mode: Mode.AddPage
    time: string
};

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
    },
});

export const { setViewState } = viewSlice.actions;

export default viewSlice.reducer;
