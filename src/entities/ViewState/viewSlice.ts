import { createSlice, createSelector } from '@reduxjs/toolkit';
import { BlockId } from '../Block/blocksSlice';
import { PageId } from '../Page/pagesSlice';
import { RootState } from  '../../app/store';
import setViewModeReducer from './reducers/setViewMode'
import setFocusPathReducer from './reducers/setFocusPath'

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

export const createBlockPath =
  (pageId: PageId, blockId: BlockId, intermediateBlockIds: BlockId[] = []): BlockPath =>
    new BlockPathImpl(pageId, blockId, intermediateBlockIds);

export interface BlockPath {
  readonly pageId: PageId
  readonly blockId: BlockId
  readonly intermediateBlockIds: BlockId[]
  extendedToChild(blockId: BlockId): BlockPath
  containsCycle(): boolean
  poppedToParent(): BlockPath | undefined
}

class BlockPathImpl implements BlockPath {
  readonly pageId: PageId
  readonly blockId: BlockId
  readonly intermediateBlockIds: BlockId[]

  constructor (pageId: PageId, blockId: BlockId, intermediateBlockIds: BlockId[] = []) {
    this.pageId = pageId
    this.blockId = blockId
    this.intermediateBlockIds = intermediateBlockIds
  }

  extendedToChild(blockId: BlockId): BlockPath {
    return new BlockPathImpl(this.pageId, blockId, this.intermediateBlockIds.concat(this.blockId))
  }

  containsCycle(): boolean {
    let pathBlockIdSet = new Set(this.intermediateBlockIds);
    pathBlockIdSet.add(this.blockId);
    return pathBlockIdSet.size !== this.intermediateBlockIds.length + 1;
  }

  poppedToParent(): BlockPath | undefined {
    if (this.intermediateBlockIds.length > 0) {
      return new BlockPathImpl(this.pageId, this.intermediateBlockIds[this.intermediateBlockIds.length - 1], this.intermediateBlockIds.slice(0, -1));
    }
    return undefined;
  }

  movedToSibling(siblingId: BlockId) {
    return new BlockPathImpl(this.pageId, siblingId,this.intermediateBlockIds);
  }

}

const initialState = {
  mode: Mode.Browse,
  blockPath: undefined
} as ViewState;

export const viewSlice = createSlice({
  name: 'view',
  initialState,
  reducers: {
    setViewMode: setViewModeReducer,
    setFocusPath: setFocusPathReducer
  }
});

export const { setViewMode, setFocusPath } = viewSlice.actions;

export default viewSlice.reducer;
