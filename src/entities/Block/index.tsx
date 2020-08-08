import { BlockComponent, BlockComponentProps } from './BlockComponent';
import { connect } from 'react-redux';
import { BlockId, makeGetBlockRecord } from './blocksSlice';
import { PageId } from '../Page/pagesSlice';
import { RootState } from  '../../app/store';

type Props = {
    id: string;
    pageId: PageId;
    path: BlockId[];
}

const mapStateToProps = (state: RootState, ownProps: Props): BlockComponentProps => {
    let getBlockRecord = makeGetBlockRecord();
    let record = getBlockRecord(state, ownProps);
    let cycle = ownProps.path.includes(record.id);
    return {
        id: record.id,
        pageId: ownProps.pageId,
        content: record.content,
        path: ownProps.path,
        subBlockIds: record.subBlockIds,
        cycle: cycle
    };
};

const Block = connect(mapStateToProps)(BlockComponent);

export default Block;