import React from 'react';
import { Block } from '../block/Block';
import { useSelector } from 'react-redux';
import { makePageRecordSelector } from './pagesSlice';

type Props = {
    id: string;
};

export const Page: React.FC<Props> = (props) => {
    const record = useSelector(makePageRecordSelector(props.id));
    console.log(record);
    return (
        <>
            <header>
                <h1>{record.title}</h1>
            </header>
            <p>Blocks:</p>
            <ul>
                { record.blockIds.map((blockId) => <li key={blockId}>{blockId}</li>)}
            </ul>
        </>
    )
};
