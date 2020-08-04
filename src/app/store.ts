import { configureStore, getDefaultMiddleware, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer, { CounterState} from '../features/Counter/counterSlice';
import pagesReducer, { Pages } from '../entities/Page/pagesSlice';
import blocksReducer, { Blocks } from '../entities/Block/blocksSlice';



export type RootState = {
    counter: CounterState,
    blocks: Blocks
    pages: Pages
    aliases: {}
}

const preloadedState = {
    counter : {
        value: 100,
    },
    blocks: {
        byId: {
            "bId1": {
                id: "bId1",
                content: ["bId2"],
            },
            "bId2": {
                id: "bId2",
                content: "This is some text.",
            },
        },
        allIds: ["id1"],
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

const middleware = [...getDefaultMiddleware()];

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        pages: pagesReducer,
        blocks: blocksReducer,
    },
    middleware,
    devTools: process.env.NODE_ENV !== 'production',
    preloadedState,
});

// You can use this to generate the RootState dynamically.
// export type RootState = ReturnType<typeof store.getState>;

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
