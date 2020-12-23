import React, { useRef, useEffect }from 'react';
import { fetchRecommendList } from './actions';
import { updatePlaylistInfo } from '../../playlist/actions'
import { fetchPlaylist } from '../../playlist/actions';
import { List, ListItem, Spin } from 'kaid';
import { connect } from "react-redux";
import { compose } from 'redux';
import { withRouter } from 'react-router';

import "./index.scss";

const Recommend = (props) => {
  // TODO: May this do duplicate jobs when remount, need fix.
  if (!props.recommendData.length) {
    dump('recommend fetch ');
    props.fetchRecommendList(2);
  }

  const element = useRef(null);
  const list = useRef(null);

  useEffect(() => {
    dump('effect: loading state change');
    onFocus();
  }, [props.recommendData]);

  function onFocus() {
    dump(`recommend handle focus`);
    if (list.current) {
      list.current.container.focus();
    } else if (element) {
      element.current.focus();
    }
  }

  function handleKeyDown(e) {
    dump(`recommend handle keydown`);
    const { key, target } = e;

    if (key === 'Enter') {
      props.updatePlaylistInfo(getPlaylistInfo(target.dataset.id));
      props.fetchPlaylist(target.dataset.id);
      props.history.push('/playlist');
    }
  }

  function getPlaylistInfo(id) {
    let info;
    props.recommendData.forEach((playlist) => {
      if(playlist.id == id) {
        info = playlist;
      }
    });
    return info;
  }

  function createListItem(itemsData) {
    const { picUrl, name, playCount, id } = itemsData;
    const options = {};
    picUrl && (options.icon = picUrl);
    options.primary = name;
    options.secondary = playCount;
    options.focusable = 'true';
    options.data = { 'data-id': id };

    return (
      <ListItem {...options}/>
    );
  }

  return (
    <div
      ref={element}
      onKeyDown={handleKeyDown}
      onFocus={onFocus}
      className="list-view"
      tabIndex="-1">
      {props.loading ?
        <Spin/> :
        <List ref={list}>
          {props.recommendData && props.recommendData.map(recommend => (
            createListItem(recommend)
          ))}
        </List>
      }
    </div>
  );
};

const mapStateToProps = state => {
  return {
    recommendData: state.recommend.recommendData,
    loading: state.recommend.loading
  };
};

// Map Redux actions to component props
const mapDispatchToProps = {
  fetchRecommendList,
  fetchPlaylist,
  updatePlaylistInfo
};

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(Recommend);
