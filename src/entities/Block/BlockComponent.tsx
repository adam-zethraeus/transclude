import React from 'react';
import { BlockContent, BlockId } from './blocksSlice';
import { PageId } from '../Page/pagesSlice';
import Block from './';
import ReactMarkdown from 'react-markdown';
import CircularReferenceBlockIndicator from '../../ui/CircularReferenceBlockIndicator';


export type BlockDispatchProps = {
    setSelected: () => void;
}

export type BlockStateProps = {
    id: BlockId;
    pageId: PageId;
    content: BlockContent;
    path: BlockId[];
    subBlockIds: BlockId[];
    isCycleRepresentation: boolean;
    isSelected: boolean;
}

export type BlockComponentProps = BlockStateProps & BlockDispatchProps

export const BlockComponent: React.FC<BlockComponentProps> = (props) => {
    console.log("FFUUU", props);
    return <>
        { !props.isCycleRepresentation &&
            <div className="block" onClick={(event) => { props.setSelected(); event.stopPropagation();}}>
                { !props.isSelected && <ReactMarkdown source={props.content} /> }
                { props.isSelected && <textarea>{props.content}</textarea> }
                { props.subBlockIds && props.subBlockIds.map((id) => <Block id={id} pageId={props.pageId} key={id} path={props.path.concat(props.id)} />) }
            </div>
        }
        { props.isCycleRepresentation &&
            <CircularReferenceBlockIndicator id={props.id} pageId={props.pageId} />
        }
    </>
};
