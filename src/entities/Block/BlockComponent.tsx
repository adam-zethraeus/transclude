import React from 'react';
import { BlockContent, BlockId } from './blocksSlice';
import { PageId } from '../Page/pagesSlice';
import Block from './';
import CircularReferenceBlockIndicator from '../../ui/CircularReferenceBlockIndicator';
import Form from 'react-bootstrap/Form';
import Markdown from '../../markdown';

export type BlockDispatchProps = {
    setSelected: () => void;
    update: (value: string) => void;
};

export type BlockStateProps = {
    id: BlockId;
    pageId: PageId;
    content: BlockContent;
    path: BlockId[];
    subBlockIds: BlockId[];
    isCycleRepresentation: boolean;
    isSelected: boolean;
};

export type BlockComponentProps = BlockStateProps & BlockDispatchProps

export const BlockComponent: React.FC<BlockComponentProps> = (props) => {
    return (
        <>
            { !props.isCycleRepresentation &&
                <div className="block" onClick={(event) => { props.setSelected(); event.stopPropagation();}}>
                    { !props.isSelected && <Markdown>{ props.content } </Markdown> }
                    { props.isSelected && <Form.Control as='textarea' rows={(props.content.match(/\n/g)?.length ?? 0) + 1} value={props.content} onChange={ (event) => { props.update(event.target.value) }} /> }
                    { props.subBlockIds && props.subBlockIds.map((id) => <Block id={id} pageId={props.pageId} key={id} path={props.path.concat(props.id)} />) }
                </div>
            }
            { props.isCycleRepresentation &&
                <CircularReferenceBlockIndicator id={props.id} pageId={props.pageId} />
            }
        </>
    );
};
