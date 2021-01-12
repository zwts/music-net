import React, { useRef, useEffect }from 'react';
import { fetchRecommendList } from './actions';
import { updatePlaylistInfo } from '../../playlist/actions'
import { fetchPlaylist } from '../../playlist/actions';
import { List, ListItem, Spin, SoftKey } from 'kaid';
import { connect } from "react-redux";
import { compose } from 'redux';
import { withRouter } from 'react-router';

import "./index.scss";

const Recommend = (props) => {
  const RECOMMEND_PLAYLIST_LIMIT = 5;
  const element = useRef(null);
  const list = useRef(null);

  useEffect(() => {
    if (!props.recommendData.length) {
      dump('recommend fetch ');
      props.fetchRecommendList(RECOMMEND_PLAYLIST_LIMIT);
    }

    SoftKey.register({
      left: '',
      center: 'select',
      right: 'refresh'
    }, element.current);
  }, []);

  useEffect(() => {
    dump('effect: loading state change');
    if (list.current) {
      list.current.container.focus();
    } else if (element) {
      element.current.focus();
    }
  }, [props.recommendData]);

  function onFocus() {
    dump('recommend onFocus.');
    if (list.current.container) {
      list.current.container.focus();
    } else if (element) {
      element.current.focus();
    }
  }

  function handleKeyDown(e) {
    dump(`recommend handle keydown`);
    const { key, target } = e;

    switch (key) {
      case 'Enter':
        // press too fast when enter page will cause error situation
        if (target.tagName === 'LI') {
          props.updatePlaylistInfo(getPlaylistInfo(target.dataset.id));
          props.fetchPlaylist(target.dataset.id);
          props.history.push('/playlist');
        }
        break;
      case 'SoftRight':
        //xxx: +1 just to finger out refresh success.
        props.fetchRecommendList(RECOMMEND_PLAYLIST_LIMIT + 1);
        break;
      default:
        break;
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
    <>
    <div
      ref={element}
      onKeyDown={handleKeyDown}
      onFocus={onFocus}
      className="recommend"
      tabIndex="-1">
      {props.loading ?
        <div className="spin-container">
          <Spin/>
        </div>
        :
        <List ref={list}>
          {props.recommendData && props.recommendData.map(recommend => (
            createListItem(recommend)
          ))}
        </List>
      }

    </div>
    <SoftKey />
    </>
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
