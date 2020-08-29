import { BlockComponent, BlockComponentProps} from './BlockComponent';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { BlockId, makeGetBlockRecord, updateBlock, BlocksStoreDataType, getBlocksStore } from './blocksSlice';
import { PageId, PagesStoreDataType, getPagesStore } from '../Page/pagesSlice';
import { setFocusPath, BlockPath, offsetBlockFocus, isBrowseView } from '../ViewState/viewSlice';
import { RootState } from  '../../app/store';

type Props = {
  id: BlockId
  pageId: PageId
  path: BlockPath
}

type StateProps = {
  id: BlockId
  pageId: PageId
  content: string
  path: BlockPath
  subBlockIds: BlockId[]
  isSelected: boolean
  pagesState: PagesStoreDataType
  blocksState: BlocksStoreDataType
};

type DispatchProps = {
  setSelected: () => void
  update: (value: string) => void
  offsetFocus: (path: BlockPath, offset: number, blocksState: BlocksStoreDataType, pagesState: PagesStoreDataType) => void
}

const mapStateToProps = (state: RootState, ownProps: Props): StateProps => {
  let getBlockRecord = makeGetBlockRecord();
  let record = getBlockRecord(state, ownProps.id);
  return {
    id: record.id,
    pageId: ownProps.pageId,
    content: record.content,
    path: ownProps.path,
    subBlockIds: record.subBlockIds,
    isSelected: isBrowseView(state.view) ? (state.view.focusPath?.blockId === ownProps.id) : false,
    pagesState: getPagesStore(state),
    blocksState: getBlocksStore(state),
  };
};

const mapDispatchToProps = (dispatch: Dispatch, ownProps: Props): DispatchProps => ({
  setSelected: () => { dispatch(setFocusPath(ownProps.path)) },
  update: (value: string) => { dispatch(updateBlock(ownProps.id, value)) },
  offsetFocus: (path: BlockPath, offset: number, blocksState: BlocksStoreDataType, pagesState: PagesStoreDataType) => { dispatch(offsetBlockFocus(path, offset, blocksState, pagesState)) },
});

const mergeProps = (stateProps: StateProps, dispatchProps: DispatchProps): BlockComponentProps => ({
  id: stateProps.id,
  pageId: stateProps.pageId,
  content: stateProps.content,
  path: stateProps.path,
  subBlockIds: stateProps.subBlockIds,
  isSelected: stateProps.isSelected,
  setSelected: dispatchProps.setSelected,
  update: dispatchProps.update,
  offsetFocus: (path: BlockPath, offset: number) => { dispatchProps.offsetFocus(path, offset, stateProps.blocksState, stateProps.pagesState) }
});

const Block = connect(mapStateToProps, mapDispatchToProps, mergeProps);

export default Block(BlockComponent);
