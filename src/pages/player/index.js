import React, { useRef, useEffect } from "react";
import { connect } from "react-redux";
import { togglePlayer, fetchSongUrl } from "./actions";

import "./index.scss";

const Player = (props) => {
  const { mode, played, error, loading, songUrl, songId, songList } = props;
  const element = useRef(null);
  const player = useRef(null);

  if (songId) {
    dump('Player fetch song url with id: ' + songId);
    props.fetchSongUrl(songId);
  }

  useEffect(() => {
    dump('player handle effect');
    if (element) {
      element.current.focus();
    }
  });

  function togglePlay() {
    if (player) {
      props.played ? player.current.pause() : player.current.play();
      props.togglePlayer();
    }
  }

  function handleKeyDown(e) {
    dump(`Player handle keydown`);
    const { key, target } = e;
    switch (key) {
      case 'Enter':
        togglePlay();
        break;
      case 'Backspace':
        props.history.go(-1);
        e.preventDefault();
        e.stopPropagation();
        break;
      case 'ArrowLeft':
        // TODO: previous song, use props.songList implement
      case 'ArrowRight':
        // TODO: next song, use props.songList implement
      default:
        break;
    }
  }

  return (
    <div
      ref={element}
      onKeyDown={handleKeyDown}
      className="player"
      tabIndex="-1">
      <span className="p-pri">{mode}</span>
      <span className="p-sec">{ played ? 'play' : 'stop' }</span>
      <audio ref={player} controls src={songUrl}></audio>
    </div>
  );
};

// Map Redux state to component props
const mapStateToProps = state => {
  return {
    mode: state.loopMode,
    played: state.playedState,
    songUrl: state.songUrl,
    songList: state.playerSongList,
    songId: state.playerSongId
  }
};

// Map Redux actions to component props
const mapDispatchToProps = {
  togglePlayer,
  fetchSongUrl
};

export default connect(mapStateToProps, mapDispatchToProps)(Player);
