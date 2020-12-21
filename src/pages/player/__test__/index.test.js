import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';
import { togglePlayer, fetchSongUrl } from '../actions';
import thunk from 'redux-thunk';

import Player from '../index';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('<Player />', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      playedState: 'stop',
      loopMode: 'list'
    });

    store.clearActions();
  });

  it('renders correctly', () => {
    let snapshotComponent = renderer.create(
      <Provider store={store}>
        <Player />
      </Provider>
    );

    expect(snapshotComponent).toMatchSnapshot();
  });

  it('should dispatch an "togglePlayer" action when Enter key pressed', () => {
    let component;

    component = mount(
      <Provider store={store}>
        <Player />
      </Provider>
    );

    let fetchSongURLAction = {type: 'FETCH_SONGURL_BEGIN'};
    // will fetch song when Player mount
    expect(store.getActions()[0]).toEqual(fetchSongURLAction);

    component.find('.player').simulate('keydown', {key: 'Enter'});

    // be careful about getActions return.
    expect(store.getActions()[1]).toEqual(togglePlayer());
  });
});
