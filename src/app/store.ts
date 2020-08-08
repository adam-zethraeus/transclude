import { configureStore, getDefaultMiddleware, ThunkAction, Action, combineReducers } from '@reduxjs/toolkit';
import pagesReducer, { Pages } from '../entities/Page/pagesSlice';
import blocksReducer, { Blocks } from '../entities/Block/blocksSlice';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory, History } from 'history';


export type RootState = {
    blocks: Blocks
    pages: Pages
    aliases: {}
}

export const history = createBrowserHistory()

const preloadedState = {
    blocks: {
        byId: {
            "bId1": {
                id: "bId1",
                content: "block one.",
                subBlockIds: ["bId2", "bId3"]
            },
            "bId2": {
                id: "bId2",
                content: "block two.",
                subBlockIds: []
            },
            "bId3": {
                id: "bId3",
                content: "block three.",
                subBlockIds: ["bId4"]
            },
            "bId4": {
                id: "bId4",
                content: "block four. block four. block four. block four. block four. block four. block four. block four. block four. block four. block four. block four. block four. block four. block four. block four. block four. block four. block four. block four. block four. block four. block four. block four. block four. block four. block four. block four.",
                subBlockIds: ["bId1"]
            },
        },
        allIds: ["bId1", "bId2", "bId3", "bId4"],
    },
    pages: {
        byId: {
            "pId1": {
                id: "pId1",
                title: "Page One",
                blockIds: ["bId1", "bId2"],
            }
        },
        allIds: ["pId1"],
    },
    aliases: {}
} as RootState;

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
