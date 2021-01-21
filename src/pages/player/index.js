import React, { useRef, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { fetchSongUrl, updatePlayer } from './actions';
import { toggleFavoriteSong } from '../home/me/actions';

import './index.scss';

const Player = (props) => {
  const { songUrl, songId, song, songs} = props;
  const element = useRef(null);
  const audio = useRef(null);
  const disc = useRef(null);
  const MODES = ['list', 'single', 'random'];
  const MODES_ICON_MAP = {
    'list': 'media-repeat',
    'single': 'media-repeat-once',
    'random': 'media-shuffle'
  };

  const [favorite, setFavorite] = useState(isFavorite(songId));
  const [mode, setMode] = useState('list');

  useEffect(() => {
    if (songId) {
      dump('Player fetch song url with id: ' + songId);
      dump(`Player fetch song url when songList: ${JSON.stringify(songs)}`);
      props.fetchSongUrl(songId);
    }

    setFavorite(isFavorite(props.songId))
  }, [props.songId]);

  useEffect(() => {
    // autoPlay={ture} not work
    audio.current.play();
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

  function isFavorite(id) {
    const idStr = id.toString();
    return props.favoriteSongs.has(idStr);
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
        playNext(mode === 'random' ? 0 : -1);
        break;
      case 'ArrowRight':
        playNext(mode === 'random' ? 0 : 1);
        break;
      case 'ArrowUp':
        navigator.volumeManager.requestUp();
        break;
      case 'ArrowDown':
        navigator.volumeManager.requestDown();
        break;
      case 'SoftRight':
        setFavorite(!favorite);
        props.toggleFavoriteSong(song, props.favoriteSongs);
        break;
      case 'SoftLeft':
        changeMode();
        break;
      default:
        break;
    }
  }

  function changeMode() {
    let preModeIndex = MODES.findIndex((value) => {return value === mode});
    let nextModeIndex;

    if (preModeIndex < MODES.length - 1) {
      nextModeIndex = preModeIndex + 1;
    } else {
      nextModeIndex = 0;
    }

    setMode(MODES[nextModeIndex]);
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
      if (mode === 'single') {
        // replay
        audio.current.play();
        return;
      } else if (mode === 'random') {
        function getRndInteger(min, max) {
          return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        nextIndex = getRndInteger(0, songsNumber - 1);
      }
    } else if (towards > 0) {
      // forward
      if (curIndex === songsNumber - 1) {
        // play the first
        nextIndex = 0;
      } else {
        nextIndex = curIndex + 1;
      }
    } else {
      // back
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
    disc.current.classList.remove('brake');
  }

  function onEnded() {
    dump('on ended');
    playNext(mode === 'list' ? 1 : 0);
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
        <div className="player-options">
          <span className="mode" data-icon={MODES_ICON_MAP[mode]} />
          <span className="favorite" data-icon={favorite ? 'favorite-on' : 'favorite-off'} />
        </div>
        <div ref={disc} className="song-disc wheel brake" style={{backgroundImage: `url(${song.picUrl})`}}></div>
      </div>
      <div className="player-controller">
        <div className="player-progress">
          <span className="p-sec current-time" />
          <span className="p-sec total-time" />
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
    error: state.player.error,
    mode: state.player.mode,
    favoriteSongs: state.me.favoriteSongs
  }
};

// Map Redux actions to component props
const mapDispatchToProps = {
  fetchSongUrl,
  updatePlayer,
  toggleFavoriteSong
};

export default connect(mapStateToProps, mapDispatchToProps)(Player);
