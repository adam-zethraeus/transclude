import React from 'react';
import { BlockContent, BlockId } from './blocksSlice';
import Block from './';

export type BlockComponentProps = {
    id: BlockId;
    content: BlockContent;
    path: BlockId[];
    subBlockIds: BlockId[];
    cycle: boolean;
}

export const BlockComponent: React.FC<BlockComponentProps> = (props) => {
    return <>
        { !props.cycle &&
            <div className="block">
                { props.content }
                { props.subBlockIds && props.subBlockIds.map((id) => <Block id={id} key={id} path={props.path.concat(props.id)} />) }
            </div>
        }
        { props.cycle &&
            <div className="block-cycle">↺</div>
        }
    </>
};
