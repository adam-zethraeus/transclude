import React from 'react';
import { Block } from '../block/Block';

type Props = {
    id: string;
    title: string;
};

export const Page: React.FC<Props> = ({id, title, children}) => {
    return (
        <>
            <header>
                <h1>
                { title }
                </h1>
            </header>
            <div>{ id }</div>
            { children }
        </>
    )
};
