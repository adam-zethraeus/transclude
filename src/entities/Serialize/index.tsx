import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import Form from 'react-bootstrap/Form';

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
                <Form.Control as="textarea" rows={20} value={JSON.stringify(storeWithoutRoute, null, 2) } readOnly />
            </code>
        </pre>
    );
};

export default SerializeStore;
