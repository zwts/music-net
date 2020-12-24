import React, { useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { List, ListItem, Spin } from 'kaid';
import { updatePlayer } from '../player/actions';

import './index.scss';

const Playlist = (props) => {
  const element = useRef(null);
  const list = useRef(null);

  useEffect(() => {
    dump('playlist handle effect');
    dump(`playlistData:  ${JSON.stringify(props.playlistData)}`);
    if (list.current) {
      list.current.container.focus();
    } else if (element) {
      element.current.focus();
    }
  });


  function getSongFromPlaylist(id) {
    let matched;
    props.playlistData.forEach((song) => {
      // id will be string number or number
      if(song.id == id) {
        matched = song;
      }
    });
    return matched;
  }

  function handleKeyDown(e) {
    const { key, target } = e;
    switch (key) {
      case 'Enter':
        dump(`Playlist handle keydown`);
        props.updatePlayer(
          target.dataset.id,
          getSongFromPlaylist(target.dataset.id),
          props.playlistData);
        props.history.push('/player');
        break;
      case 'Backspace':
        props.history.go(-1);
        e.preventDefault();
        e.stopPropagation();
        break;
      default:
        break;
    }
  }

  function createListItem(item) {
    const { picUrl, name, id, ar} = item;
    const options = {};
    picUrl && (options.icon = picUrl);
    options.primary = name;
    options.secondary = ar;
    options.focusable = 'true';
    options.data = { 'data-id': id }; // list item attribute data-id="xxxxx"

    return (
      <ListItem {...options}/>
    );
  }

  return (
    <div
      ref={element}
      onKeyDown={handleKeyDown}
      className="playlist-view"
      tabIndex="-1">
      <div className="playlist-info" style={{backgroundImage: `url(${props.info.picUrl})`}}>
        <span className="playlist-name p-pri">{props.info.name}</span>
        <span className="playlist-count p-sec">{props.info.playCount}</span>
      </div>
      <div className="playlist-list">
        {props.loading ?
          <Spin/> :
          <List ref={list}>
            {props.playlistData && props.playlistData.map(song => (
              createListItem(song)
            ))}
          </List>
        }
      </div>
    </div>
  );
};


const mapStateToProps = state => {
  return {
    info: state.playlist.info,
    loading: state.playlist.loading,
    playlistData: state.playlist.playlistData
  };
};

// Map Redux actions to component props
const mapDispatchToProps = {
  updatePlayer
};

export default connect(mapStateToProps, mapDispatchToProps)(Playlist);
