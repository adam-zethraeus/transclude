import { BlockComponent, BlockStateProps, BlockDispatchProps } from './BlockComponent';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { BlockId, makeGetBlockRecord, updateBlock } from './blocksSlice';
import { PageId } from '../Page/pagesSlice';
import { isBlockSelected, setFocusPath, BlockPath } from '../ViewState/viewSlice';
import { RootState } from  '../../app/store';

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
    isCycleRepresentation: ownProps.path.containsCycle(),
    isSelected: isBlockSelected(state, ownProps.path),
  };
};

const mapDispatchToProps = (dispatch: Dispatch, ownProps: Props): BlockDispatchProps => {
  return {
    setSelected: () => { dispatch(setFocusPath(ownProps.path)) },
    update: (value: string) => { dispatch(updateBlock(ownProps.id, value)) }
  }
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(BlockComponent);