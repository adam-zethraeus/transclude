import React from 'react';
import { BlockContent, BlockId } from './blocksSlice';
import Block from './';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import ReactMarkdown from 'react-markdown';

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
                <ReactMarkdown source={props.content} />
                { props.subBlockIds && props.subBlockIds.map((id) => <Block id={id} key={id} path={props.path.concat(props.id)} />) }
            </div>
        }
        { props.cycle &&
            <OverlayTrigger
                placement="bottom"
                overlay={<Tooltip id={`tooltip-top`}>{ `Circular block reference: ${props.id}` }</Tooltip>
            }>
                {({ ref, ...triggerHandler }) => (
                    <div ref={ref} {...triggerHandler} className="block-cycle">↳ ∞</div>
                )}
            </OverlayTrigger>
        }
    </>
};
