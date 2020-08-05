import React from 'react';
import { Block } from '../Block/Block';
import { useSelector } from 'react-redux';
import { makePageRecordSelector } from './pagesSlice';

type Props = {
    id: string;
};

export const Page: React.FC<Props> = (props) => {
    const record = useSelector(makePageRecordSelector(props.id));// useSelector is the actual thing that gets replaced by connect
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
