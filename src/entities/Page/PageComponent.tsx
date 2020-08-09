import React from 'react';
import { BlockId } from '../Block/blocksSlice';
import Block from '../Block';
import { PageId } from './pagesSlice';

export type PageComponentProps = {
    id: PageId;
    title: string;
    blockIds: BlockId[];
    blockPath?: BlockId[];
};

export const PageComponent: React.FC<PageComponentProps> = (props) => {
    return (
        <>
            <header>
                <h1>{props.title}</h1>
            </header>
            <main>
                { props.blockIds.map(id => <Block id={id} pageId={props.id} key={id} path={[]} />) }
            </main>
        </>
    )
};
