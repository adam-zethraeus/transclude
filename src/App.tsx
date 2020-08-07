import React from 'react';
import PageDisplay from './entities/PageDisplay';
import { Redirect, Route, Switch } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'
import { history } from './app/store';
import Serialize from './entities/Serialize';
import PageList from './entities/PageList';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function App() {
    return (
        <Container>
            <Row>
            </Row>
            <Row xs={12}>
                <Col xs={3}>
                    <img src="/T.png" alt="" width="100%"/>
                </Col>
                <Col>
                </Col>
                <Col xs="auto" className="align-self-end">
                    hi
                </Col>
            </Row>
            <Row>
                <Col>
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
                </Col>
            </Row>
        </Container>
    );
}

export default App;
