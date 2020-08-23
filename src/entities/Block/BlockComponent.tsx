import React from 'react';
import { BlockContent, BlockId } from './blocksSlice';
import { PageId } from '../Page/pagesSlice';
import Block from './';
import CircularRefWarning from '../../ui/CircularRefWarning';
import Form from 'react-bootstrap/Form';
import Markdown from '../../markdown';
import { BlockPath, blockPathExtendedToChild } from '../ViewState/viewSlice';

export type BlockDispatchProps = {
  setSelected: () => void;
  update: (value: string) => void;
  offsetFocus: (path: BlockPath, offset: number) => void;
};

export type BlockStateProps = {
  id: BlockId;
  pageId: PageId;
  content: BlockContent;
  path: BlockPath;
  subBlockIds: BlockId[];
  isCycleRepresentation: boolean;
  isSelected: boolean;
};

export type BlockComponentProps = BlockStateProps & BlockDispatchProps

export const BlockComponent: React.FC<BlockComponentProps> = (props) => {
  console.log(props.id);
  return (
    <>
    { props.isCycleRepresentation &&
      <CircularRefWarning id={props.id} pageId={props.pageId} />
    }
    { !props.isCycleRepresentation &&
      <div className='block' onClick={(event) => { props.setSelected(); event.stopPropagation();}}>
      { !props.isSelected &&
        <Markdown>{ props.content }</Markdown>
      }
      { props.isSelected &&
        <Form.Control
        as='textarea'
        rows={(props.content.match(/\n/g)?.length ?? 0) + 1}
        value={props.content}
        onChange={ (event) => { props.update(event.target.value) }}
        onKeyDown={ (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
          let target = e.target as HTMLTextAreaElement;
          if (target.selectionStart !== target.selectionEnd) { return }
          switch (e.keyCode) {
            case 40:// down
              if (target.selectionStart === target.textLength) {
                props.offsetFocus(props.path, 1);
                e.preventDefault();
              }
              break;
            case 38: // up
              if (target.selectionStart === 0) {
                props.offsetFocus(props.path, -1);
                e.preventDefault();
              }
              break;
          }
        }}
        onKeyPress={ (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
          if( e.key === 'Enter' ) {
            e.preventDefault();
          }
        }
      }
      />
    }
    { props.subBlockIds &&
      props.subBlockIds.map(
        (id) =>
          <Block
            id={ id }
            pageId={ props.pageId }
            key={ id }
            path={ blockPathExtendedToChild(props.path, id) }
          />
        )
    }
    </div>
  }
  </>
  );
};
