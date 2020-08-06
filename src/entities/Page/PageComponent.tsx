import React from 'react';

export type PageComponentProps = {
    title: string;
    blocks: JSX.Element[];
};

export const PageComponent: React.FC<PageComponentProps> = (props) => {
    return (
        <>
            <header>
                <h1>{props.title}</h1>
            </header>
            <p>Blocks:</p>
            { props.blocks }
        </>
    )
};
