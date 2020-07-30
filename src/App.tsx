import React from 'react';
import { Counter } from './features/counter/Counter';
import { Page } from './entities/page/Page';

function App() {
  return (
    <>
      <Page id="pId1" />
      <Counter />
    </>
  );
}

export default App;
