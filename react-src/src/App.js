import React from 'react';
import Menu from './Menu';
import ErrorBoundry from './ErrorBoundry'

function App() {
  return (
    <ErrorBoundry>
      <Menu />
    </ErrorBoundry>
  );
}

export default App;
