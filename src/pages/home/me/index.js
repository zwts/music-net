import React, { useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { List, ListItem, SoftKey } from 'kaid';
import { compose } from 'redux';
import { withRouter } from 'react-router';

import './index.scss';

const Me = (props) => {
  const { favoriteSongs } = props;
  const element = useRef(null);
  const list = useRef(null);
  let favoriteSongsArr = [...favoriteSongs.values()];

  useEffect(() => {
    SoftKey.register({
      left: '',
      center: 'enter',
      right: ''
    }, list.current.container);
  }, []);

  function handleKeyDown(e) {
    dump('Me handle key down');
  }


  function handleFocus() {
    dump(`Me handle focus`);
    if (list.current.container) {
      list.current.container.focus();
    } else if (element) {
      element.current.focus();
    }
  }

  function createListItem(item) {
    const { picUrl, name, id, ar } = item;
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
    <>
    <div
      className="me"
      ref={element}
      onKeyDown={handleKeyDown}
      onFocus={handleFocus}
      tabIndex="-1">

      <List ref={list}>
        <ListItem primary="Recently played" focusable="true" controller="forward"/>
        <ListItem primary="Favorite songs" focusable="true" controller="forward"/>
        {favoriteSongsArr && favoriteSongsArr.map(song => (
          createListItem(song)
        ))}
        <ListItem primary="Favorite Playlist" focusable="true" controller="forward"/>
      </List>
    </div>
    <SoftKey />
    </>
  );
};

const mapStateToProps = state => {
  return {
    favoriteSongs: state.me.favoriteSongs
  };
};

// Map Redux actions to component props
const mapDispatchToProps = {
};

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(Me);


