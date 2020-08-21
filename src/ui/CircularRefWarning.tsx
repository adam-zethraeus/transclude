import React from 'react';
import { BlockId } from '../entities/Block/blocksSlice';
import { PageId } from '../entities/Page/pagesSlice';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { Link } from 'react-router-dom'

type CircularRefWarningProps = {
  id: BlockId;
  pageId: PageId;
}

const CircularRefWarning: React.FC<CircularRefWarningProps> = (props) => {
  return (
    <OverlayTrigger
    placement="bottom"
    overlay={<Tooltip id={`tooltip-top`}>{ `Circular block reference: ${props.id}` }</Tooltip>
  }>
  {({ ref, ...triggerHandler }) => (
    <div className="block block-cycle"><Link to={`/page/${props.pageId}/${props.id}`} ref={ref} {...triggerHandler}>↳ ∞</Link></div>
    )}
  </OverlayTrigger>
  );
};

export default CircularRefWarning;
