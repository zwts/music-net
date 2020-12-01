import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import renderer from 'react-test-renderer';
import { togglePlayer } from '../../../redux/actions'

import Player from '../index';

const mockStore = configureStore([]);

describe('<Player />', () => {
  let store;
  let component;

  beforeEach(() => {
    store = mockStore({
      playedState: 'stop',
      loopMode: 'list'
    });

    store.dispatch = jest.fn();

    component = renderer.create(
      <Provider store={store}>
        <Player />
      </Provider>
    );
  });

  it('renders correctly', () => {
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('should dispatch an action on enter key click', () => {
    let event = new CustomEvent ('keydown', {
      bubbles: true, cancelable: false
    });
    event.key = 'Enter';

    document.dispatchEvent(event);

    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(togglePlayer);
  });
});
