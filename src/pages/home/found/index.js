import React, { useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchFoundList } from './actions';
import { updatePlayerSongs } from '../../player/actions'
import { List, ListItem } from 'kaid';
import { compose } from 'redux';
import { withRouter } from 'react-router';

import './index.scss';

const Found = (props) => {
  const element = useRef(null);
  const list = useRef(null);

  // default we show static search result;
  // TODO: next we should add input area to search dynamic.
  if (!props.foundData.length) {
    dump('Found fetch dzq');
    props.fetchFoundList('邓紫棋', 2);
  }

  function handleKeyDown(e) {
    dump('Found handle key down');
    const { key, target } = e;
    if (key === 'Enter') {
      const id = target.dataset.id;
      props.updatePlayerSongs(id, props.foundData);
      props.history.push('/player');
    }
  }

  function handleFocus() {
    dump(`Found handle focus`);
    if (list.current.container) {
      list.current.container.focus();
    } else if (element) {
      element.current.focus();
    }
  }

  function createListItem(found) {
    const { picUrl, name, ar, id } = found;
    const options = {};
    picUrl && (options.icon = picUrl);
    options.primary = name;
    options.secondary = ar;
    options.focusable = 'true';
    options.data = { 'data-id': id };

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
        {props.foundData && props.foundData.map(found => (
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
  fetchFoundList,
  updatePlayerSongs
};

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(Found);
