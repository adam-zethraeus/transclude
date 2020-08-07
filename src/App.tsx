import React from 'react';
import PageDisplay from './entities/PageDisplay';
import { Redirect, Route, Switch } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'
import { history } from './app/store';

function App() {
    return (
        <ConnectedRouter history={history}>
            <Switch>
                <Route exact path="/">
                    <p>Select something</p>
                </Route>
                <Route path="/page/:pageId">
                    <PageDisplay />
                </Route>
                <Redirect to="/" />
            </Switch>
        </ConnectedRouter>
    );
}

export default App;
