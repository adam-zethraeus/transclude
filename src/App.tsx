import React from 'react';
import { Counter } from './features/counter/Counter';
import { Page } from './entities/page/Page';
import { Block } from './entities/block/Block';

function App() {
  return (
    <>
      <Page id="pId1" />
      <Counter />
    </>
  );
}

export default App;
