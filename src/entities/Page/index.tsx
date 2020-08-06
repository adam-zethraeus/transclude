import React from 'react';
import Block from '../Block';
import { connect } from 'react-redux';
import { PageComponent, PageComponentProps } from './PageComponent';
import { makeGetPageRecord } from './pagesSlice';
import { RootState } from  '../../app/store';

type Props = {
    id: string;
}

const mapStateToProps = (state: RootState, ownProps: Props): PageComponentProps => {
    let getPageRecord = makeGetPageRecord();
    let pageRecord = getPageRecord(state, ownProps);
    return {
        title: pageRecord.title,
        blocks: pageRecord.blockIds.map(id => <Block id={id} />)
    };
};

const Page = connect(mapStateToProps)(PageComponent);

export default Page;