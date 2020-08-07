import React from 'react';
import PageDisplay from './entities/PageDisplay';
import { Redirect, Route, Switch } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'
import { history } from './app/store';
import Serialize from './entities/Serialize';
import PageList from './entities/PageList';

function App() {
    return (
        <ConnectedRouter history={history}>
            <Switch>
                <Redirect exact path='/' to='/list' />
                <Route path='/page/:pageId/:drillDownBlockId?'>
                    <PageDisplay />
                </Route>
                <Route path='/serialize'>
                    <Serialize />
                </Route>
                <Route path='/list'>
                    <PageList />
                </Route>
                <Redirect to='/' />
            </Switch>
        </ConnectedRouter>
    );
}

export default App;
