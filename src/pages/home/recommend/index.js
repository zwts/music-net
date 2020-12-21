import React, { useRef, useEffect }from "react";
import { fetchRecommendList, fetchPlaylist } from "./actions";
import { List, ListItem } from 'kaid';
import store from '../../../redux/store';
import { connect } from "react-redux";
import { compose } from 'redux';
import { withRouter } from 'react-router';

import "./index.scss";

const Recommend = (props) => {
  // TODO: May this do duplicate jobs when remount, need fix.
  dump('recommend fetch list: ' + store.getState().recommendData.length);
  if (!store.getState().recommendData.length) {
    dump('recommend fetch ');
    props.fetchRecommendList(2);
  }

  const { recommendData }= props;
  const element = useRef(null);
  const list = useRef(null);

  function handleFocus() {
    dump(`recommend handle focus`);
    if (list) {
      list.current.container.focus();
    } else if (element) {
      element.current.focus();
    }
  }

  function handleKeyDown(e) {
    dump(`recommend handle keydown`);
    const { key, target } = e;

    if (key === 'Enter') {
      //TODO:  open Play list and show songs
      props.fetchPlaylist(target.dataset.id);
      setTimeout(() => {
        props.history.push('/playlist');
      }, 1000);

    }
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
      onFocus={handleFocus}
      className="list-view"
      tabIndex="-1">
      <List ref={list}>
        {recommendData && recommendData.map(recommend => (
          createListItem(recommend)
        ))}
      </List>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    recommendData: state.recommendData,
  };
};

// Map Redux actions to component props
const mapDispatchToProps = {
  fetchRecommendList,
  fetchPlaylist
};

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(Recommend);
