import { PayloadAction } from '@reduxjs/toolkit'
import { ViewState, Mode, isBrowseView } from '../viewSlice'
import { BlockId } from '../../Block/blocksSlice'

const offsetBlockFocus = (state: ViewState, action: PayloadAction<number>) => {
    if (isBrowseView(state) && !!state.focusPath) {
      let offset = action.payload
    }
  }

export default offsetBlockFocus;