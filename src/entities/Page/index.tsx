import React from 'react';
import Block from '../Block';
import { connect } from 'react-redux';
import { PageComponent, PageComponentProps } from './PageComponent';
import { makeGetPageRecord } from './pagesSlice';
import { RootState } from  '../../app/store';
import { searchBlockRecords } from '../Block/blocksSlice';

type Props = {
    id: string;
    drillDownBlockId?: string;
}

const mapStateToProps = (state: RootState, ownProps: Props): PageComponentProps => {
    let getPageRecord = makeGetPageRecord();
    let pageRecord = getPageRecord(state, ownProps.id);
    if (ownProps.drillDownBlockId === undefined) {
        return {
            title: pageRecord.title,
            blocks: pageRecord.blockIds.map(id => <Block id={id} pageId={ownProps.id} key={id} path={[]} />)
        };
    } else {
        let treeContainsDrillDownBlock = pageRecord.blockIds
            .map(id => !!searchBlockRecords(state, id, (pr) => pr.id === ownProps.drillDownBlockId))
            .reduce((acc, curr) => acc || curr);
        if (treeContainsDrillDownBlock) {
            return {
                title: pageRecord.title,
                blocks: [<Block id={ownProps.drillDownBlockId} pageId={ownProps.id} key={ownProps.drillDownBlockId} path={[]} />]
            };
        } else {
            return {
                title: pageRecord.title,
                blocks: [<p>Block: {ownProps.drillDownBlockId} not found on Page: ownProps.id</p>]
            };
        }
    };
};

const Page = connect(mapStateToProps)(PageComponent);

export default Page;
