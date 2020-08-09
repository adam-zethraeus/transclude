import React from 'react';
import { BlockId } from '../Block/blocksSlice';

export type PageComponentProps = {
    title: string;
    blocks: JSX.Element[];
    blockPath?: BlockId[];
};

export const PageComponent: React.FC<PageComponentProps> = (props) => {
    return (
        <>
            <header>
                <h1>{props.title}</h1>
            </header>
            <main>
                { props.blocks }
            </main>
        </>
    )
};
