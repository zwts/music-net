import React, { useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { List, ListItem, SoftKey } from 'kaid';
import { compose } from 'redux';
import { withRouter } from 'react-router';

import './index.scss';

const Me = (props) => {
  const element = useRef(null);
  const list = useRef(null);

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

  return (
    <>
    <div
      className="me"
      ref={element}
      onKeyDown={handleKeyDown}
      onFocus={handleFocus}
      tabIndex="-1">

      <List ref={list}>
        <ListItem primary='Recently played' focusable='true'/>
        <ListItem primary='Favorite songs' focusable='true'/>
        <ListItem primary='Favorite Playlist' focusable='true'/>
      </List>
    </div>
    <SoftKey />
    </>
  );
};

const mapStateToProps = state => {
  return {};
};

// Map Redux actions to component props
const mapDispatchToProps = {
};

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(Me);


