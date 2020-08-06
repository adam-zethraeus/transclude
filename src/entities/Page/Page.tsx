import React from 'react';
import { Block } from '../Block/Block';
import { connect } from 'react-redux';
import { PageComponent, PageComponentProps } from './PageComponent';
import { RootState } from  '../../app/store';

type Props = {
    id: string;
};


const mapStateToProps = (state: RootState, ownProps: Props): PageComponentProps => ({
    title: state.pages.byId[ownProps.id].title,
    blocks: state.pages.byId[ownProps.id].blockIds.map(id => <Block id={id} />)
})


export const Page = connect(
    mapStateToProps,
)(PageComponent)