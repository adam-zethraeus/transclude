import { PayloadAction } from '@reduxjs/toolkit'
import { isBrowseView } from '../viewSlice'
import { ViewState, BlockPath} from '../../../types'

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