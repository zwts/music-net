import 'l10n';
import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './redux/store';
import Home from './pages/home';
import Player from './pages/player';
import Playlist from './pages/playlist';

import './app.scss';

function App() {
 return (
  <Provider store={store}>
    <Router>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/playlist' component={Playlist} />
        <Route exact path='/player' component={Player} />

        <Redirect to='/' />
      </Switch>
    </Router>
  </Provider>
 );
}

ReactDOM.render(<App />, document.getElementById('root'));
