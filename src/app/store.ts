import { configureStore, getDefaultMiddleware, ThunkAction, Action, combineReducers } from '@reduxjs/toolkit';
import pagesReducer, { Pages } from '../entities/Page/pagesSlice';
import blocksReducer, { Blocks } from '../entities/Block/blocksSlice';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory, History } from 'history';
import state from './state';


// TODO: Group all current non-router RootState into a data field.
export type RootState = {
    blocks: Blocks
    pages: Pages
    aliases: {}
}

// TODO: consider the bar required for view state to be stored here.

/*
TODO: If we're modeling this explicitly like this it should probably replace connected-react-router.
enum Mode {
    Browse,
    Serialize,
    ListPages,
    AddPage
}
type BrowseView {
    mode: Mode.Browse
    pageId: PageId
    drillDownBlockId?: BlockId
    focusBlockId?: BlockId
}
type SerializeView {
    mode: Mode.Serialize
}
type ListPagesView {
    mode: Mode.ListPages
}

type AddPageView {
    mode: Mode.AddPage
}
export type ViewState = {
    mode: BrowseView | SerializeView | ListPagesView | AddPageView
}
*/

export const history = createBrowserHistory()

const preloadedState = state as RootState;

const middleware = [...getDefaultMiddleware(), routerMiddleware(history)];

const createRootReducer = (history: History) => combineReducers({
    router: connectRouter(history),
    pages: pagesReducer,
    blocks: blocksReducer,
});

export const store = configureStore({
    reducer: createRootReducer(history),
    middleware,
    devTools: process.env.NODE_ENV !== 'production',
    preloadedState,
});

// You can use this to generate the RootState dynamically.
// export type RootState = ReturnType<typeof store.getState>;

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
