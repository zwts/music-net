import React, { useRef, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { List, ListItem, SoftKey } from 'kaid';
import { compose } from 'redux';
import { withRouter } from 'react-router';
import { updatePlayer } from '../../player/actions';

import './index.scss';

const Me = (props) => {
  const { favoriteSongs } = props;
  const element = useRef(null);
  const list = useRef(null);
  let favoriteSongsArr = [...favoriteSongs.values()];

  const [favSongShown, setFavSongShown] = useState(false);


  useEffect(() => {
    SoftKey.register({
      left: '',
      center: 'enter',
      right: ''
    }, list.current.container);
  }, []);

  function getSongFromList(id, songsArr) {
    let matched;
    songsArr.forEach((song) => {
      //TODO: CLEAN UP ALL GET SONG FUNCTION
      // id will be string number or number
      if(song.id == id) {
        matched = song;
      }
    });
    return matched;
  }

  function handleKeyDown(e) {
    dump('Me handle key down');
    let target = e.target;
    let key = e.key;
    switch (key) {
      case 'Enter':
        if (target.classList.contains('fav-songs')) {
          setFavSongShown(!favSongShown);
        } else if (target.classList.contains('fav-song')) {
          props.updatePlayer(
            target.dataset.id,
            getSongFromList(target.dataset.id, favoriteSongsArr),
            favoriteSongsArr);
          props.history.push('/player');
        }
        break;
      default:
        break;
    }
  }


  function handleFocus() {
    dump(`Me handle focus`);
    if (list.current.container) {
      list.current.container.focus();
    } else if (element) {
      element.current.focus();
    }
  }

  function createSongItem(item) {
    const { picUrl, name, id, ar } = item;
    const options = {};
    picUrl && (options.icon = picUrl);
    options.primary = name;
    options.secondary = ar;
    options.focusable = 'true';
    options.data = { 'data-id': id };
    options.outerClass = 'fav-song';

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
        <ListItem
          primary="Favorite songs"
          focusable="true"
          outerClass="fav-songs"
          controller={favSongShown ? "back" : "forward"}/>
        {favSongShown ?
          favoriteSongsArr && favoriteSongsArr.map(song => (
            createSongItem(song))
          ) : null
        }
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
  updatePlayer
};

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(Me);


