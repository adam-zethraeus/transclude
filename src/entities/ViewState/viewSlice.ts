import { createSlice, createSelector } from '@reduxjs/toolkit';
import { BlockId } from '../Block/blocksSlice';
import { PageId } from '../Page/pagesSlice';
import { RootState } from  '../../app/store';
import setViewModeReducer from './reducers/setViewMode'
import setFocusPathReducer from './reducers/setFocusPath'
import offsetBlockFocusReducer from './reducers/offsetBlockFocus'

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
  focusPath?: BlockPath
}

export type SerializeView = ViewMode & {
  mode: Mode.Serialize
}

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

export const isBlockSelected = createSelector((state: RootState, path: BlockPath): boolean =>
  (isBrowseView(state.view) && state.view.focusPath === path), x => x);



export type BlockPath = {
  pageId: PageId
  blockId: BlockId
  intermediateBlockIds: BlockId[]
}

export const createBlockPath =
  (pageId: PageId, blockId: BlockId, intermediateBlockIds: BlockId[] = []): BlockPath => ({
    pageId,blockId, intermediateBlockIds
  });

export const blockPathExtendedToChild = (path: BlockPath, blockId: BlockId): BlockPath => ({
  pageId: path.pageId,
  blockId: blockId,
  intermediateBlockIds: path.intermediateBlockIds.concat(path.blockId)
});

export const blockPathContainsCycle = (path: BlockPath): boolean => {
  let pathBlockIdSet = new Set(path.intermediateBlockIds);
  pathBlockIdSet.add(path.blockId);
  return pathBlockIdSet.size !== path.intermediateBlockIds.length + 1;
};

const initialState = {
  mode: Mode.Browse,
  blockPath: undefined
} as ViewState;

export const viewSlice = createSlice({
  name: 'view',
  initialState,
  reducers: {
    setViewMode: setViewModeReducer,
    setFocusPath: setFocusPathReducer,
    offsetBlockFocus: offsetBlockFocusReducer
  }
});

export const { setViewMode, setFocusPath, offsetBlockFocus } = viewSlice.actions;

export default viewSlice.reducer;
