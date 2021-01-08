import React, { useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchFoundList } from './actions';
import { updatePlayer } from '../../player/actions'
import { List, ListItem, Spin, SoftKey } from 'kaid';
import { compose } from 'redux';
import { withRouter } from 'react-router';

import './index.scss';

const Found = (props) => {
  const SEARCH_RESULT_LIMIT = 5;
  const element = useRef(null);
  const list = useRef(null);
  const input = useRef(null);

  useEffect(() => {
    SoftKey.register({
      left: '',
      center: '',
      right: 'search'
    }, input.current);
    SoftKey.register({
      left: '',
      center: 'play',
      right: ''
    }, list.current.container);
  }, []);

  function getSongFromFoundList(id) {
    let matched;
    props.foundData.forEach((song) => {
      // id will be string number or number
      if(song.id == id) {
        matched = song;
      }
    });
    return matched;
  }


  function handleKeyDown(e) {
    dump('Found handle key down' + input.current.value);
    const { key, target } = e;
    switch (key) {
      case 'Enter':
        if (target.tagName === 'LI') {
          // play
          if (props.foundData) {
            props.updatePlayer(
              target.dataset.id,
              getSongFromFoundList(target.dataset.id),
              props.foundData);
            props.history.push('/player');
          }
        }
        break;
      case 'ArrowLeft':
      case 'ArrowRight':
        if (target.tagName === 'INPUT' && input.current.value) {
          e.stopPropagation();
        }
        break;
      case 'SoftRight':
        if (target.tagName === 'INPUT') {
          // search
          if (input.current.value) {
            props.fetchFoundList(input.current.value, SEARCH_RESULT_LIMIT);
          }
        }
        break;
      default:
        break;
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
    <>
    <div
      className="found"
      ref={element}
      onKeyDown={handleKeyDown}
      onFocus={handleFocus}
      tabIndex="-1">

      <List ref={list}>
        <li className="found-input-warpper">
          <input
            ref={input}
            className="found-input focusable"
            type="search"
            placeholder="Search"
          />
        </li>
        {props.loading ?
          <Spin /> :
          props.foundData && props.foundData.map(found => (
            createListItem(found)
          ))
        }
      </List>
    </div>
    <SoftKey />
    </>
  );
};

const mapStateToProps = state => {
  return {
    foundData: state.found.foundData,
    loading: state.found.loading
  };
};

// Map Redux actions to component props
const mapDispatchToProps = {
  fetchFoundList,
  updatePlayer
};

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(Found);
