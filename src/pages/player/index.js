import React, { useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchSongUrl, updatePlayer } from './actions';

import './index.scss';

const Player = (props) => {
  const { songUrl, songId, song, songs } = props;
  const element = useRef(null);
  const audio = useRef(null);
  const disc = useRef(null);

  useEffect(() => {
    if (songId) {
      dump('Player fetch song url with id: ' + songId);
      dump(`Player fetch song url when songList: ${JSON.stringify(songs)}`);
      props.fetchSongUrl(songId);
    }
  }, [props.songId]);

  useEffect(() => {
    // autoPlay={ture} not work
    audio.current.play();
    disc.current.classList.remove('brake');
  }, [props.songUrl]);

  useEffect(() => {
    if (element) {
      element.current.focus();
    }
  });

  function togglePlay() {
    if (audio) {
      dump('toggle audio');
      disc.current.classList.toggle('brake', !audio.current.paused);
      audio.current.paused ? audio.current.play() : audio.current.pause();
    }
  }

  function handleKeyDown(e) {
    dump(`Player handle keydown`);
    const { key } = e;
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
        playNext(-1);
        break;
      case 'ArrowRight':
        playNext(1);
        break;
      case 'ArrowUp':
        // All media application cannot tell which channel we request change?
        // Current we default will judgment 'notification' channel, but we need
        // 'content' channel. So can we change the API to:
        // navigator.volumeManager.requestUp('content'); ?
        navigator.volumeManager.requestUp();
        break;
      case 'ArrowDown':
        navigator.volumeManager.requestDown();
        break;
      default:
        break;
    }
  }

  function playNext(towards) {
    let nextIndex;
    let songsNumber = songs.length;
    let curIndex = songs.findIndex((v) => {
      return v.id == props.songId;
    });

    if (curIndex === -1) {
      return;
    }

    if (towards === 0) {
      // replay
    } else if (towards > 0) {
      //TODO play mode code
      // list as default
      if (curIndex === songsNumber - 1) {
        // play the first
        nextIndex = 0;
      } else {
        nextIndex = curIndex + 1;
      }
    } else {
      if (curIndex === 0) {
        nextIndex = songsNumber - 1;
      } else {
        nextIndex = curIndex - 1;
      }
    }

    dump(`Player index : ${curIndex} =>  ${nextIndex}`);

    props.updatePlayer(
      songs[nextIndex].id,
      songs[nextIndex],
      songs
    );
  }

  function onTimeUpdate() {
    dump('on timeupdate');
    // xxx  not good here use react implement
    element.current.querySelector('.current-time').innerText = format(audio.current.currentTime);
  }
  
  function onCanPlay() {
    dump('on canplay');
    // xxx not good here use react implement
    element.current.querySelector('.current-time').innerText = '00:00';
    element.current.querySelector('.total-time').innerText = format(audio.current.duration);
  }

  function onEnded() {
    dump('on ended');
    playNext(1);
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
      <div className="player-info">
        <span className="song-name p-pri">{song.name}</span>
        <span className="song-art p-sec">{song.ar}</span>
        <div ref={disc} className="song-disc wheel brake" style={{backgroundImage: `url(${song.picUrl})`}}></div>
      </div>
      <div className="player-controller">
        <div className="player-progress">
          <span className="p-sec current-time"></span>
          <span className="p-sec total-time"></span>
        </div>
      </div>
      <audio
        ref={audio}
        src={songUrl}
        onTimeUpdate={onTimeUpdate}
        onCanPlay={onCanPlay}
        onEnded={onEnded}>
      </audio>
    </div>
  );
};

// Map Redux state to component props
const mapStateToProps = state => {
  return {
    songUrl: state.player.songUrl,
    songId: state.player.songId,
    song: state.player.song,
    songs: state.player.songs,
    error: state.player.error
  }
};

// Map Redux actions to component props
const mapDispatchToProps = {
  fetchSongUrl,
  updatePlayer
};

export default connect(mapStateToProps, mapDispatchToProps)(Player);
