import React, { useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { togglePlayer, fetchSongUrl } from './actions';
import { Spin } from 'kaid';

import './index.scss';

const Player = (props) => {
  const { mode, playState, error, loading, songUrl, songId, song, songList } = props;
  const element = useRef(null);
  const audio = useRef(null);
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
    if (audio) {
      dump('toggle audio');
      disc.current.classList.toggle('brake', playState);
      playState ? audio.current.pause() : audio.current.play();
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

  function audioTimeUpdate() {
    dump('on timeupdate');
    // xxx
    element.current.querySelector('.current-time').innerText = format(audio.current.currentTime);
  }
  
  function audioCanPlay() {
    dump('on canplay');
    // xxx
    element.current.querySelector('.total-time').innerText = format(audio.current.duration);
  }

  function format(t) {
    dump('format t: ' + t);
    let m = Math.floor(t / 60);
    let s = Math.floor(t % 60);
    if (m <= 9) {
      m=`0${m}`;
    }

    if (s <= 9) {
      s=`0${s}`;
    }

    return `${m}:${s}`;
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
          <div ref={disc} className="song-disc wheel brake" style={{backgroundImage: `url(${song.picUrl})`}}></div>
        </div>
        <div className="player-controller">
          <span className="p-sec">{mode}</span>
          <span className="p-sec">{ playState ? 'play' : 'stop' }</span>
          <div className="player-progress">
            <span className="p-sec current-time"></span>
            <progress value="0" max="100"></progress>
            <span className="p-sec total-time"></span>
          </div>
        </div>
        <audio
          ref={audio}
          src={songUrl}
          onTimeUpdate={audioTimeUpdate}
          onCanPlay={audioCanPlay}>
        </audio>
        </>
      }
    </div>
  );
};

// Map Redux state to component props
const mapStateToProps = state => {
  return {
    mode: state.player.loopMode,
    playState: state.player.playState,
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
