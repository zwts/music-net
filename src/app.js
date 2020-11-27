import React from 'react';
import ReactDOM from 'react-dom';
import { Component } from "react";

import { Provider } from 'react-redux';
import store from './redux/store';
import Player from './pages/player';

import './app.scss';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Player/>
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
