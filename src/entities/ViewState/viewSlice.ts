import { createSlice, createSelector } from '@reduxjs/toolkit';
import { BlockId } from '../Block/blocksSlice';
import { RootState } from  '../../app/store';
import setViewModeReducer from './reducers/setViewMode'
import setFocusBlockReducer from './reducers/setFocusBlock'

// TODO: If we're modeling this explicitly like this it should probably replace connected-react-router.
export enum Mode {
  Browse = "BROWSE",
  Serialize = "SERIALIZE"
}

type ViewMode = {
  mode: Mode
}

export type BrowseView = ViewMode & {
  mode: Mode.Browse
  focusBlockPath?: BlockId[]
  time: number
};

export type SerializeView = ViewMode & {
  mode: Mode.Serialize
  time: number
};

export type ViewState = ViewMode & (BrowseView | SerializeView);

export function getViewState(state: RootState): ViewState {
  return state.view
}

export function isBrowseView(state: ViewState): state is BrowseView {
  return state.mode === Mode.Browse;
}

export function isSerializeView(state: ViewState): state is SerializeView {
  return state.mode === Mode.Serialize;
}

export const isBlockSelected = createSelector((state: RootState, path: BlockId[]): boolean => (
  isBrowseView(state.view) && state.view.focusBlockPath === path), x => x);


const initialState = {
  mode: Mode.Browse,
  focusBlockPath: undefined,
  time: Date.now()
} as ViewState;

export const viewSlice = createSlice({
  name: 'view',
  initialState,
  reducers: {
    setViewMode: setViewModeReducer,
    setFocusBlock: setFocusBlockReducer
  }
});

export const { setViewMode, setFocusBlock } = viewSlice.actions;

export default viewSlice.reducer;
