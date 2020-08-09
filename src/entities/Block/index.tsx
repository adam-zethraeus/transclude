import { BlockComponent, BlockComponentProps } from './BlockComponent';
import { connect } from 'react-redux';
import { BlockId, makeGetBlockRecord } from './blocksSlice';
import { PageId } from '../Page/pagesSlice';
import { isBlockSelected } from '../ViewState/viewSlice';
import { RootState } from  '../../app/store';

type Props = {
    id: string;
    pageId: PageId;
    path: BlockId[];
}

const mapStateToProps = (state: RootState, ownProps: Props): BlockComponentProps => {
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
        isSelected: isSelected
    };
};

const Block = connect(mapStateToProps)(BlockComponent);

export default Block;