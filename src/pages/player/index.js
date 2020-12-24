import React, { useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { togglePlayer, fetchSongUrl } from './actions';
import { Spin } from 'kaid';

import './index.scss';

const Player = (props) => {
  const { mode, played, error, loading, songUrl, songId, song, songList } = props;
  const element = useRef(null);
  const player = useRef(null);
  const disc = useRef(null);

  useEffect(() => {
    if (songId) {
      dump('Player fetch song url with id: ' + songId);
      props.fetchSongUrl(songId);
    }
  }, [props.songId]);

  useEffect(() => {
    if (element) {
      element.current.focus();
    }
  });

  function togglePlay() {
    if (player) {
      dump('toggle player');
      disc.current.classList.toggle('wheel', !played);
      played ? player.current.pause() : player.current.play();
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
      {loading ?
        <Spin /> :
        <>
        <div className="player-info">
          <span className="song-name p-pri">{song.name}</span>
          <span className="song-art p-sec">{song.ar}</span>
          <div ref={disc} className="song-disc" style={{backgroundImage: `url(${song.picUrl})`}}></div>
        </div>
        <div className="player-controller">
          <span className="p-sec">{mode}</span>
          <span className="p-sec">{ played ? 'play' : 'stop' }</span>
          <audio ref={player} src={songUrl}></audio>
        </div>
        </>
      }
    </div>
  );
};

// Map Redux state to component props
const mapStateToProps = state => {
  return {
    mode: state.player.loopMode,
    played: state.player.played,
    songUrl: state.player.songUrl,
    songId: state.player.songId,
    song: state.player.song,
    songs: state.player.songs,
    error: state.player.error
  }
};

// Map Redux actions to component props
const mapDispatchToProps = {
  togglePlayer,
  fetchSongUrl
};

export default connect(mapStateToProps, mapDispatchToProps)(Player);
