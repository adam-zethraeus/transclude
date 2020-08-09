import React from 'react';
import Block from '../Block';
import { connect } from 'react-redux';
import { PageComponent, PageComponentProps } from './PageComponent';
import { makeGetPageRecord } from './pagesSlice';
import { RootState } from  '../../app/store';
import { findPathToBlock } from '../Block/blocksSlice';

type Props = {
    id: string;
    drillDownBlockId?: string;
}

function isDefined<Type>(variable: Type | undefined): variable is Type {
    return variable !== undefined;
}

const mapStateToProps = (state: RootState, ownProps: Props): PageComponentProps => {
    let getPageRecord = makeGetPageRecord();
    let pageRecord = getPageRecord(state, ownProps.id);
    if (isDefined(ownProps.drillDownBlockId)) {
        let drillDownBlockId: string = ownProps.drillDownBlockId;
        let blockPath = pageRecord.blockIds
            .map(id => findPathToBlock(state, id, drillDownBlockId))
            .filter(path => path != null)
            .pop()

        if (!!blockPath) {
            return {
                title: pageRecord.title,
                blockPath: blockPath,
                blocks: [<Block id={drillDownBlockId} pageId={ownProps.id} key={drillDownBlockId} path={[]} />]
            };
        } else {
            return {
                title: pageRecord.title,
                blocks: [<p>Block: {drillDownBlockId} not found on Page: ownProps.id</p>] // TODO: factor to 404 block
            };
        }
    }

    return {
        title: pageRecord.title,
        blocks: pageRecord.blockIds.map(id => <Block id={id} pageId={ownProps.id} key={id} path={[]} />)
    };
};

const Page = connect(mapStateToProps)(PageComponent);

export default Page;
