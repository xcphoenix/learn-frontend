import React from 'react';
import './App.css';
import {view as Todos} from './todos/';
import {view as Filter} from './filter/';

function App() {
  return (
    <div className="App">
      <Todos/>
      <Filter/>
    </div>
  );
}

export default App;
