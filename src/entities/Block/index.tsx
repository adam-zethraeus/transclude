import { BlockComponent, BlockStateProps, BlockDispatchProps } from './BlockComponent';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { BlockId, makeGetBlockRecord, updateBlock } from './blocksSlice';
import { PageId } from '../Page/pagesSlice';
import { isBlockSelected, setFocusBlock } from '../ViewState/viewSlice';
import { RootState } from  '../../app/store';

type Props = {
    id: string;
    pageId: PageId;
    path: BlockId[];
}

const mapStateToProps = (state: RootState, ownProps: Props): BlockStateProps => {
    let getBlockRecord = makeGetBlockRecord();
    let record = getBlockRecord(state, ownProps.id);
    let cycle = ownProps.path.includes(record.id);
    let isSelected = isBlockSelected(state, ownProps.id)
    return {
        id: record.id,
        pageId: ownProps.pageId,
        content: record.content,
        path: ownProps.path,
        subBlockIds: record.subBlockIds,
        isCycleRepresentation: cycle,
        isSelected: isSelected,
    };
};

const mapDispatchToProps = (dispatch: Dispatch, ownProps: Props): BlockDispatchProps => ({
    setSelected: () => { dispatch(setFocusBlock(ownProps.id)) },
    update: (value: string) => { dispatch(updateBlock(ownProps.id, value)) }
})

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(BlockComponent);