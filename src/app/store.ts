import { configureStore, getDefaultMiddleware, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer, { CounterState} from '../features/counter/counterSlice';


const middleware = [...getDefaultMiddleware()];

const preloadedState = {
    counter : {
        value: 100,
    } as CounterState,
    blocks: {
        byId: {
            "bid1": {
                id: "bid1",
                text: "This is some text.",
                blocks: [], // TODO: this should be a union type with the text.
            },
            "bid2": {
                id: "bid2",
                text: "This is some text.",
                blocks: [],
            },
        },
        allIds: ["id1"],
    },
    pages: {
        byId: {
            "pId1": {
                id: "pId1",
                title: "Page One", // TODO: Probably remove.
                blocks: ["bid1", "bid2"],
            }
        },
        allIds: ["pId1"]
    },
    aliases: {},
    titles: {},
}


export const store = configureStore({
    reducer: {
        counter: counterReducer,
    },
    middleware,
    devTools: process.env.NODE_ENV !== 'production',
    preloadedState,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
