import React from "react";
import { Component } from "react";
import { connect } from "react-redux";
import { togglePlayer } from "../../redux/actions";

import "./index.scss";

class Player extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    window.addEventListener('keydown', this);
  }

  handleEvent(e) {
    if (e.type === 'keydown') {
      switch (e.key) {
        case 'Enter':
          this.props.onPlayClick();
          break;
        default:
          break;
      }
    }
  }

  render() {
    const { mode, played } = this.props;
    return (
      <div id="player-container" className="player">
        <span className="p-pri" a>{mode}</span>
        <span className="p-sec">{ played ? 'play' : 'stop' }</span>
      </div>
    )
  }
}

// PlayerReducer => store => state => Player props
// Map Redux state to component props
const mapStateToProps = state => {
  return {
    mode: state.loopMode,
    played: state.playedState
  }
};

// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
  return {
    onPlayClick: () => dispatch(togglePlayer)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Player);
