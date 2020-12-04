import React from "react";
import { Component } from "react";
import { connect } from "react-redux";
import { togglePlayer } from "../../redux/actions";

import "./index.scss";

class Player extends Component {
  constructor(props) {
    super(props);

    // not use bind?
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  componentDidMount() {
    this.focus();
  }

  focus() {
    this.element.focus();
  }

  handleKeyDown(e) {
    switch (e.key) {
      case 'Enter':
        this.props.onPlayClick();
        break;
      case 'Backspace':
        this.props.history.push('/');
        e.preventDefault();
        e.stopPropagation();
        break;
      default:
        break;
    }
  }

  render() {
    const { mode, played } = this.props;
    return (
      <div ref={ref => {this.element = ref}} onKeyDown={this.handleKeyDown} className="player" tabIndex="-1">
        <span className="p-pri">{mode}</span>
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
