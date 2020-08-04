import React from 'react';
import { Counter } from './features/Counter/Counter';
import { Page } from './entities/Page/Page';

function App() {
  return (
    <>
      <Page id="pId1" />
      <Counter />
    </>
  );
}

export default App;
