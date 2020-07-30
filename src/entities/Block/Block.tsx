import React from 'react';
import { useSelector } from 'react-redux';
import { LeafBlockContent, BranchBlockContent, isLeafBlockContent, makeBlockRecordSelector, BlockRecord } from '../block/blocksSlice';


type Props = {
    id: string;
}

function blockContent(blockRecord: BlockRecord) {
    let content = blockRecord.content;
    if(isLeafBlockContent(content)) {
        return (<p>{content}</p>);
    } else {
        return content.map(blockId => <Block id={blockId} key={blockId} />)
    }
}

export const Block: React.FC<Props> = (props) => {
    console.log(props.id);
    let blockRecord: BlockRecord = useSelector(makeBlockRecordSelector(props.id))
    console.log(blockRecord);
    return (
        <div className='block'>
            { blockContent(blockRecord) }
        </div>
    );
};
