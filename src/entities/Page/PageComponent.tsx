import React from 'react'
import Block from '../Block'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import { Link } from 'react-router-dom'
import { createBlockPath } from '../ViewState/viewSlice'
import { BlockId, PageId } from '../../types';

export type PageComponentProps = {
  id: PageId;
  title: string;
  blockIds: BlockId[];
  blockPath?: BlockId[];
};

export const PageComponent: React.FC<PageComponentProps> = (props) => {
  return (
    <>
      <header>
        <Row>
          <Col>
            <h1>{props.title}</h1>
          </Col>
          { !!props.blockPath && (
          <>
            <Col>
            </Col>
            <Col xs="auto" className="align-self-center">
            <Breadcrumb>
              <Breadcrumb.Item key={props.id} linkAs={Link} linkProps={{to: `/page/${props.id}`}}>{props.title}</Breadcrumb.Item>
              { props.blockPath.slice(0, -1).map((id)=> <Breadcrumb.Item key={id} linkAs={Link} linkProps={{to: `/page/${props.id}/${id}`}}>{id}</Breadcrumb.Item>) }
              { props.blockPath.slice(-1).map((id)=> <Breadcrumb.Item key={id} active>{id}</Breadcrumb.Item>) }
            </Breadcrumb>
            </Col>
          </>
          )}
        </Row>
      </header>
      <main>
        { props.blockIds.map(id => <Block id={id} pageId={props.id} key={id} path={ createBlockPath(props.id, id) } />) }
      </main>
    </>
    )
};
