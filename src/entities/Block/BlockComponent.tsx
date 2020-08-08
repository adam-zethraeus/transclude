import React from 'react';
import { BlockContent, BlockId } from './blocksSlice';
import { PageId } from '../Page/pagesSlice';
import Block from './';
import ReactMarkdown from 'react-markdown';
import CircularReferenceBlockIndicator from '../../ui/CircularReferenceBlockIndicator';

export type BlockComponentProps = {
    id: BlockId;
    pageId: PageId;
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
                { props.subBlockIds && props.subBlockIds.map((id) => <Block id={id} pageId={props.pageId} key={id} path={props.path.concat(props.id)} />) }
            </div>
        }
        { props.cycle &&
            <CircularReferenceBlockIndicator id={props.id} pageId={props.pageId} />
        }
    </>
};
