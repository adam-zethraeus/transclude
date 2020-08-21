import { PayloadAction } from '@reduxjs/toolkit'
import { ViewState, Mode } from '../viewSlice'

export default {
  reducer: (state: ViewState, action: PayloadAction<ViewState>) => {
    return action.payload
  },
  prepare: (mode: Mode) => {
    switch (mode) {
      case Mode.Browse:
      return {
        payload: {
          mode: Mode.Browse,
          focusBlockPath: undefined
        }
      }
      case Mode.Serialize:
      return {
        payload: {
          mode: Mode.Serialize
        }
      }
    }
  }
}
