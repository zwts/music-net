import React, { useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { List, ListItem, Spin } from 'kaid';
import { updatePlayerSongs } from '../player/actions';


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


  function handleKeyDown(e) {
    dump(`Playlist handle keydown`);
    const { key, target } = e;
    switch (key) {
      case 'Enter':
        const id = target.dataset.id;
        props.updatePlayerSongs(id, props.playlistData);
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
      className="list-view"
      tabIndex="-1">
      {props.loading ?
        <Spin/> :
        <List ref={list}>
          {props.playlistData && props.playlistData.map(song => (
            createListItem(song)
          ))}
        </List>
      }
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
  updatePlayerSongs
};

export default connect(mapStateToProps, mapDispatchToProps)(Playlist);
