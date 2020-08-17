import React from 'react';
import { Provider } from 'react-redux';
import './App.scss';
import { Router } from './navigation/Router';
import store from './redux/store';

/**
 * Entry point into our web application.
 * We'll use hookrouter which adds some
 * basic routing.
 */
function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Router />
      </Provider>
    </div>
  );
}

export default App;
