import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { Link } from 'react-router-dom';

const getStore = (state: RootState) => state;

const PageList: React.FC<{}> = () => {
    let store = useSelector(getStore);
    return (
        <ul>
            { store.pages.allIds.map((pageId) => <li><Link to={`/page/${pageId}`}>{pageId}</Link></li> ) }
        </ul>
    );
};

export default PageList;