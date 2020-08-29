import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { BlockId, BlockRecord, BlocksStoreDataType, PagesStoreDataType, PageId, BlockPath, RootState } from '../../types';

const getStore = (state: RootState) => state;

const PageList: React.FC<{}> = () => {
  let state = useSelector(getStore);
  return (
    <ul>
    { state.data.pages.allIds.map((pageId) => <li key={pageId}><Link to={`/page/${pageId}`}>{pageId}</Link></li> ) }
    </ul>
    );
};

export default PageList;
