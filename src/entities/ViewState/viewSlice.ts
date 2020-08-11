import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';
import { BlockId } from '../Block/blocksSlice';
import { RootState } from  '../../app/store';

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
    focusBlockId?: BlockId
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

export const isBlockSelected = createSelector((state: RootState, blockId: BlockId): boolean => (
    isBrowseView(state.view) && state.view.focusBlockId === blockId), x => x);


const initialState = {
    mode: Mode.Browse,
    focusBlockId: undefined,
    time: Date.now()
} as ViewState;

export const viewSlice = createSlice({
    name: 'view',
    initialState,
    reducers: {
        setViewMode: {
            reducer: (state: ViewState, action: PayloadAction<ViewState>) => {
                return action.payload
            },
            prepare: (mode: Mode) => {
                switch (mode) {
                case Mode.Browse:
                    return {
                        payload: {
                            mode: Mode.Browse,
                            focusBlockId: undefined,
                            time: Date.now()
                        }
                    }
                case Mode.Serialize:
                    return {
                        payload: {
                            mode: Mode.Serialize,
                            time: Date.now()
                        }
                    }
                }
            },
        },
        setFocusBlock: {
            reducer: (state: ViewState, action: PayloadAction<ViewState>) => {
                if (state.mode === Mode.Browse) {
                    return action.payload
                }
            },
            prepare: (blockId: BlockId | undefined) => {
                return {
                    payload: {
                        mode: Mode.Browse,
                        focusBlockId: blockId,
                        time: Date.now()
                    }
                }
            },
        },
    },
});

export const { setViewMode, setFocusBlock } = viewSlice.actions;

export default viewSlice.reducer;
