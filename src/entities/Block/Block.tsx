import React from 'react';
import { BlockComponent, BlockComponentProps } from './BlockComponent';
import { connect } from 'react-redux';
import { isLeafBlockContent, BlockContent, makeGetBlock } from './blocksSlice';
import { RootState } from  '../../app/store';

type Props = {
    id: string;
}

const mapStateToProps = (state: RootState, ownProps: Props): BlockComponentProps => {
    let getBlock = makeGetBlock()
    let content: BlockContent = getBlock(state, ownProps).content
    let contentComponent = (isLeafBlockContent(content) ? content : content.map(id => <Block id={id} />));
    return {
        content: contentComponent
    };
};

export const Block = connect(
    mapStateToProps,
)(BlockComponent);