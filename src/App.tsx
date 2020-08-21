import React, { MouseEvent } from 'react';
import PageDisplay from './entities/PageDisplay';
import { Redirect, Route, Switch } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'
import { history, store } from './app/store';
import Serialize from './entities/Serialize';
import PageList from './entities/PageList';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import LinkButton from './ui/LinkButton';
import { setFocusPath } from './entities/ViewState/viewSlice';


function App() {
  return (
    <ConnectedRouter history={history}>
      <Container onClick={ (event: MouseEvent) => { store.dispatch(setFocusPath(undefined)); } }>
        <Row xs={12} id="header">
          <Col xs={3}>
            <img src="/T.png" alt="" id="T" />
          </Col>
          <Col>
          </Col>
          <Col xs="auto" className="align-self-center">
            <ButtonGroup size="sm" >
              <LinkButton to="/page/new" variant="dark">New Page</LinkButton>
              <LinkButton to="/list" variant="dark">List Pages</LinkButton>
              <LinkButton to="/serialize" variant="dark">Serialize</LinkButton>
            </ButtonGroup>
          </Col>
          </Row>
          <Row>
            <Col>
              <hr />
            </Col>
          </Row>
          <Row>
          <Col>
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
          </Col>
        </Row>
      </Container>
    </ConnectedRouter>
    );
}

export default App;
