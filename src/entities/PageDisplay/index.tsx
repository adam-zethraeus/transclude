import React from 'react';
import Page from '../Page';
import { useParams } from "react-router-dom";

const PageDisplay: React.FC<{}> = () => {
  const { pageId, drillDownBlockId } = useParams();
  return (
    <Page id={pageId} drillDownBlockId={drillDownBlockId} />
    );
};

export default PageDisplay;
