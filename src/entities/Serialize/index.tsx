import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';

const getStore = (state: RootState) => state;

const SerializeStore: React.FC<{}> = () => {
    let store = useSelector(getStore);
    let removedFields = ['router'];
    let storeWithoutRoute = Object.keys(store)
        .filter(key => !removedFields.includes(key))
        .reduce((acc, key) => {
            return {
                ...acc,
                [key]: (store as Record<string, any>)[key]
            };
        }, {});

    return (
        <pre>
            <code>
                { JSON.stringify(storeWithoutRoute, null, 2) }
            </code>
        </pre>
    );
};

export default SerializeStore;
