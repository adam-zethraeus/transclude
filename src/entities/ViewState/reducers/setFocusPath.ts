import { PayloadAction } from '@reduxjs/toolkit'
import { ViewState, Mode, BlockPath } from '../viewSlice'

export default {
  reducer: (state: ViewState, action: PayloadAction<ViewState>) => {
    if (state.mode === Mode.Browse) {
      return action.payload
    }
  },
  prepare: (path?: BlockPath) => {
    return {
      payload: {
        mode: Mode.Browse,
        focusPath: path
      }
    }
  },
}