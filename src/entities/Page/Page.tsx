import React from 'react';
import { Block } from '../block/Block';
import { useSelector } from 'react-redux';
import { makePageRecordSelector } from './pagesSlice';

type Props = {
    id: string;
};

export const Page: React.FC<Props> = (props) => {
    const record = useSelector(makePageRecordSelector(props.id));
    return (
        <>
            <header>
                <h1>{record.title}</h1>
            </header>
            <p>Blocks:</p>
            { record.blockIds.map((blockId) => {
                return <Block id={blockId} key={blockId} />
            })}
        </>
    )
};
