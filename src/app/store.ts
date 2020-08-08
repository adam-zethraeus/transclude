import { configureStore, getDefaultMiddleware, ThunkAction, Action, combineReducers } from '@reduxjs/toolkit';
import pagesReducer, { Pages } from '../entities/Page/pagesSlice';
import blocksReducer, { Blocks } from '../entities/Block/blocksSlice';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory, History } from 'history';
import state from './state';


export type RootState = {
    blocks: Blocks
    pages: Pages
    aliases: {}
}

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
