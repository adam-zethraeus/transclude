import { AnyAction } from 'redux'
import { BlockComponent, BlockStateProps, BlockDispatchProps } from './BlockComponent';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { BlockId, makeGetBlockRecord, updateBlock } from './blocksSlice';
import { PageId } from '../Page/pagesSlice';
import { setFocusPath, BlockPath, offsetBlockFocus, isBrowseView } from '../ViewState/viewSlice';
import { RootState, AppThunk } from  '../../app/store';
import { ThunkDispatch } from 'redux-thunk';

type Props = {
  id: BlockId;
  pageId: PageId;
  path: BlockPath;
}

const mapStateToProps = (state: RootState, ownProps: Props): BlockStateProps => {
  let getBlockRecord = makeGetBlockRecord();
  let record = getBlockRecord(state, ownProps.id);
  return {
    id: record.id,
    pageId: ownProps.pageId,
    content: record.content,
    path: ownProps.path,
    subBlockIds: record.subBlockIds,
    isSelected: isBrowseView(state.view) ? (state.view.focusPath?.blockId === ownProps.id) : false,
  };
};

const mapDispatchToProps = (dispatch: Dispatch, ownProps: Props): BlockDispatchProps => {
  return {
    setSelected: () => { dispatch(setFocusPath(ownProps.path)) },
    update: (value: string) => { dispatch(updateBlock(ownProps.id, value)) },
    offsetFocus: (path: BlockPath, offset: number) => { (dispatch as ThunkDispatch<RootState, void, AnyAction>)(offsetFocusThunkDispatch(path, offset)) }
  }
};

const offsetFocusThunkDispatch = (path: BlockPath, offset: number): AppThunk =>
  (dispatch, getState): void => {
    let state = getState();
    dispatch(offsetBlockFocus(path, offset, state.blocks, state.pages))
  }


const Block = connect(mapStateToProps, mapDispatchToProps);

export default Block(BlockComponent);
