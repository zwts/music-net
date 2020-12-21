import React from 'react';
import ReactDOM from 'react-dom';
import { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect } from "react-router-dom";
import { Provider } from 'react-redux';

import store from './redux/store';
import Home from './pages/home';
import Player from './pages/player';

import './app.scss';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Switch>
            <Route exact path='/' component={Home} />
            {/*<Route exact path='/player' component={Player} />*/}

            <Redirect to='/' />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
