import { PayloadAction } from '@reduxjs/toolkit'
import { ViewState, Mode } from '../viewSlice'
import { BlockId } from '../../Block/blocksSlice'

export default {
  reducer: (state: ViewState, action: PayloadAction<ViewState>) => {
    if (state.mode === Mode.Browse) {
      return action.payload
    }
  },
  prepare: (path: BlockId[] | undefined) => {
    return {
      payload: {
        mode: Mode.Browse,
        focusBlockPath: path,
        time: Date.now()
      }
    }
  },
}