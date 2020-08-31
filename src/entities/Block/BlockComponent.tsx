import React from 'react';
import Block from './';
import Form from 'react-bootstrap/Form';
import Markdown from '../../markdown';
import { blockPathExtendedToChild} from '../ViewState/viewSlice';
import { BlockId, PageId, BlockPath } from '../../types';

export type BlockComponentProps = {
  setSelected: () => void;
  update: (value: string) => void;
  offsetFocus: (path: BlockPath, offset: number) => void;
  addBlock: (
    parentBlockId?: BlockId,
    lastSiblingBlockId?: BlockId,
    initialContent?: string)
  => void
  id: BlockId;
  pageId: PageId;
  content: string;
  path: BlockPath;
  subBlockIds: BlockId[];
  isSelected: boolean;
};

export const BlockComponent: React.FC<BlockComponentProps> = (props) => {
  return (
    <>
    {
      <div className='block' onClick={(event) => { props.setSelected(); event.stopPropagation();}}>
      { !props.isSelected &&
        <Markdown>{ props.content }</Markdown>
      }
      { props.isSelected &&
        <Form.Control
          as='textarea'
          ref={ (element: HTMLTextAreaElement) => { element?.focus() }}
          rows={(props.content.match(/\n/g)?.length ?? 0) + 1}
          value={props.content}
          onChange={ (event) => { props.update(event.target.value) }}
          onKeyDown={ (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
            let target = e.target as HTMLTextAreaElement;
            if (target.selectionStart !== target.selectionEnd) { return }
            switch (e.keyCode) {
              case 40: // down
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
              props.addBlock();
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
