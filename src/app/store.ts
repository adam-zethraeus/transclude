import { configureStore, getDefaultMiddleware, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer, { CounterState} from '../features/counter/counterSlice';
import pagesReducer, { Pages } from '../entities/page/pagesSlice';

export type BlockId = string;
export type BlockContent = string | BlockId[];
export type BlockRecord = {
    id: BlockId,
    content: BlockContent
};

export type RootState = {
    counter: CounterState,
    blocks: { allIds: BlockId[], byId: Record<string, BlockRecord> }
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
    },
    middleware,
    devTools: process.env.NODE_ENV !== 'production',
    preloadedState,
});

// You can use this to generate the RootState dynamically, but that requires
// setting up reducers for all fields to generate the right return type.
// export type RootState = ReturnType<typeof store.getState>;

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
