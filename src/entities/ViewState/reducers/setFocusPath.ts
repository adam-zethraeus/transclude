import { PayloadAction } from '@reduxjs/toolkit'
import { ViewState, BlockPath, isBrowseView } from '../viewSlice'

const setFocusPathReducer = (state: ViewState, action: PayloadAction<BlockPath | undefined>) => {
  if (isBrowseView(state)) {
    state.focusPath = action.payload;
  }
}

export default {
  reducer: setFocusPathReducer,
  prepare: (path?: BlockPath) => {
    return {
      payload: path
    }
  },
}