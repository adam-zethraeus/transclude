import { PayloadAction, PrepareAction, createAction, createReducer } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'
import { ViewState, Mode, isBrowseView, BlockPath } from '../viewSlice'
import { BlockId } from '../../Block/blocksSlice'
import { RootState } from '../../../app/store'


export const offsetBlockFocus = createAction('view/offset-block-focus', (path: BlockPath, offset: number) => {
  let pageRecord = useSelector((state: RootState) => state.pages.byId[path.pageId]);
  let currBlockIndex = pageRecord?.blockIds.indexOf(path.blockId);
  let newBlockIndex = currBlockIndex + offset; // TODO: don't be and idiot.
  if (!!newBlockIndex && newBlockIndex >= 0 && newBlockIndex < pageRecord.blockIds.length) {
    return {
      payload: {
        path: path.poppedToParent()
      }
    }
  }

  return {
    payload: {}
  }
});

export default offsetBlockFocus;
