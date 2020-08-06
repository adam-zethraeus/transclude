import React from 'react';
import { BlockComponent, BlockComponentProps } from './BlockComponent';
import { connect } from 'react-redux';
import { isLeafBlockContent, BlockContent, makeGetBlockRecord } from './blocksSlice';
import { RootState } from  '../../app/store';

type Props = {
    id: string;
}

const mapStateToProps = (state: RootState, ownProps: Props): BlockComponentProps => {
    let getBlockRecord = makeGetBlockRecord();
    let content: BlockContent = getBlockRecord(state, ownProps).content;
    let contentComponent = (isLeafBlockContent(content) ? content : content.map(id => <Block id={id} />));
    return {
        content: contentComponent
    };
};

export const Block = connect(
    mapStateToProps,
)(BlockComponent);