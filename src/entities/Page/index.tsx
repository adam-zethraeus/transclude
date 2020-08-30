import { connect } from 'react-redux';
import { PageComponent, PageComponentProps } from './PageComponent';
import { makeGetPageRecord } from './pagesSlice';
import { findPathToBlock } from '../Block/blocksSlice';
import { RootState } from '../../types';

type Props = {
  id: string;
  drillDownBlockId?: string;
}

function isDefined<Type>(variable: Type | undefined): variable is Type {
  return variable !== undefined;
}

const mapStateToProps = (state: RootState, ownProps: Props): PageComponentProps => {
  let getPageRecord = makeGetPageRecord();
  let pageRecord = getPageRecord(state.data.pages, ownProps.id);
  if (isDefined(ownProps.drillDownBlockId)) {
    let drillDownBlockId: string = ownProps.drillDownBlockId;
    let blockPath = pageRecord.blockIds
    .map(id => findPathToBlock(state, id, drillDownBlockId))
    .filter(path => path != null)
    .pop()

    if (!!blockPath) {
      return {
        id: ownProps.id,
        title: pageRecord.title,
        blockPath: blockPath,
        blockIds: [drillDownBlockId]
      };
    } else {
      return {
        id: ownProps.id,
        title: pageRecord.title,
        blockIds: [] // TODO: factor to 404 block
      };
    }
  }

  return {
    id: ownProps.id,
    title: pageRecord.title,
    blockIds: pageRecord.blockIds
  };
};

const Page = connect(mapStateToProps)(PageComponent);

export default Page;
