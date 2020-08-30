import { configureStore, getDefaultMiddleware, ThunkAction, Action, combineReducers } from '@reduxjs/toolkit';
import pagesReducer from '../entities/Page/pagesSlice';
import blocksReducer from '../entities/Block/blocksSlice';
import viewReducer from '../entities/ViewState/viewSlice';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory, History } from 'history';
import state from './state';
import { RootState } from '../types'

export const history = createBrowserHistory()

const preloadedState = state as RootState;

const middleware = [...getDefaultMiddleware(), routerMiddleware(history)];

const dataReducer = combineReducers({
  blocks: blocksReducer,
  pages: pagesReducer,
});

// TODO: remove connected-react-router
const createRootReducer = (history: History) => combineReducers({
  router: connectRouter(history),
  data: dataReducer,
  view: viewReducer,
});

export const store = configureStore({
  reducer: createRootReducer(history),
  middleware,
  devTools: process.env.NODE_ENV !== 'production',
  preloadedState,
});

// TODO: fix, or consider removing, the view state's union type to enable this.
// export type RootState = ReturnType<typeof store.getState>;

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
