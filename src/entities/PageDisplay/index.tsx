import React from 'react';
import Page from '../Page';
import { useParams } from "react-router-dom";

const PageDisplay: React.FC<{}> = () => {
    const { pageId } = useParams();
    return (
        <Page id={pageId} />
    );
};

export default PageDisplay;
