import React, { useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchFoundList } from './actions';
import { List, ListItem } from 'kaid';
import store from '../../../redux/store';

import './index.scss';

const Found = (props) => {
  const { foundData } = props;
  const element = useRef(null);
  const list = useRef(null);

  // default we show static search result;
  // TODO: next we should add input area to search dynamic.
  if (!store.getState().foundData) {
    props.fetchFoundList('邓紫棋', 2);
  }

  function handleKeyDown(e) {
    dump('Found handle key down');
    if (e.key === 'Enter') {
      //TODO: can not get props, so we need go through home?
      // props.history.push('/player');
    }
  }

  function handleFocus() {
    dump(`Found handle focus`);
    if (list) {
      list.current.container.focus();
    } else if (element) {
      element.current.focus();
    }
  }

  function createListItem(found) {
    const { icon, name, ar, id } = found;
    const options = {};
    options.icon = icon;
    options.primary = name;
    options.secondary = ar;
    options.id = id;
    options.focusable = 'true';

    return (
      <ListItem {...options}/>
    );
  }

  return (
    <div
      className="list-view"
      ref={element}
      onKeyDown={handleKeyDown}
      onFocus={handleFocus}
      tabIndex="-1">
      <List ref={list}>
        {foundData && foundData.map(found => (
          createListItem(found)
        ))}
      </List>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    foundData: state.foundData,
  };
};

// Map Redux actions to component props
const mapDispatchToProps = {
  fetchFoundList
};

export default connect(mapStateToProps, mapDispatchToProps)(Found);

