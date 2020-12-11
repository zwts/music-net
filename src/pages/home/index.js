import React from "react";
import { Component } from "react";

import "./index.scss";

export default class Home extends Component {
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
        this.props.history.push('/player');
        break;
      case '0':
        this.props.history.push('/me');
        break;
      case 'ArrowDown':
        this.props.history.push('/playlist');
        break;
      default:
        break;
    }
  }

  render() {
    return (
      <div ref={ref => {this.element = ref}} onKeyDown={this.handleKeyDown} className="home" tabIndex="-1">
        <span>Press Enter key into Player Screen</span>
        <span>Click <b>number '0' </b> key to jump to <b>Me</b> page</span>
        <span>Press ArrowDown key into Playlist Screen</span>
      </div>
    )
  }
}
