import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import { Page } from './entities/page/Page';
import { Block } from './entities/block/Block';

function App() {
  return (
    <>
      <Page title="title" id="pId1">
        <Block id="bId1" text="block text">
        </Block>
      </Page>
      <Counter />
    </>
  );
}

export default App;
