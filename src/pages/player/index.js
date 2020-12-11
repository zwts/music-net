import React from "react";
import { Component } from "react";
import { connect } from "react-redux";
import { togglePlayer, fetchSongUrl } from "../../redux/playerActions";

import "./index.scss";

class Player extends Component {
  constructor(props) {
    super(props);

    // not use bind?
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  componentDidMount() {
    this.getCurrentSong();

    this.focus();
  }

  focus() {
    if (this.element) {
      this.element.focus();
    }
  }

  play() {
    this.audio = document.getElementById('player-audio');
    if (this.audio) {
      this.audio.play();
    }
  }

  pause() {
    this.audio = document.getElementById('player-audio');
    if (this.audio) {
      this.audio.pause();
    }
  }

  next() {
    if (this.playlist.length === 1) {
      // loop the first audio
      return
    } else {
      let index = this.currentIndex + 1
      if (index === this.playlist.length) {
        index = 0
      }
      //this.props.playNextSong();
      if (!this.props.played) {
        this.props.togglePlayer();
      }
    }
  }

  previous() {

  }

  getCurrentSong(id) {
    // id need get from xxx list
    this.id = 33894312;
    this.props.fetchSongUrl(this.id);
  }

  togglePlay() {
    this.props.played ? this.pause():this.play();
    this.props.togglePlayer();
  }

  handleKeyDown(e) {
    if (e.type === 'keydown') {
      switch (e.key) {
        case 'Enter':
          this.togglePlay();
          break;
        case 'SoftLeft':
          this.previous();
          break;
        case 'SoftRight':
          this.next();
          break;
        case 'Backspace':
          this.props.history.go(-1);
          e.preventDefault();
          e.stopPropagation();
          break;
        default:
          break;
      }
    }
  }

  render() {
    const { mode, played, error, loading, songUrl } = this.props;

    if (error) {
      // may need show toaster to remind user
    }

    if (loading) {
      // show loading progress icon here
    }

    return (
      <div ref={ref => {this.element = ref}} onKeyDown={this.handleKeyDown} className="player" tabIndex="-1">
        <span className="p-pri">{mode}</span>
        <span className="p-sec">{ played ? 'play' : 'stop' }</span>
        <audio id="player-audio" controls src={songUrl}></audio>
      </div>
    )
  }
}

// PlayerReducer => store => state => Player props
// Map Redux state to component props
const mapStateToProps = state => {
  return {
    mode: state.loopMode,
    played: state.playedState,
    songUrl: state.songUrl
  }
};

// Map Redux actions to component props
const mapDispatchToProps = {
  togglePlayer,
  fetchSongUrl
};

export default connect(mapStateToProps, mapDispatchToProps)(Player);
