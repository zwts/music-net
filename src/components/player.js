import React from "react";
import { Component } from "react";
import { connect } from "react-redux";
import { togglePlayer } from "../redux/actions";

const Player = ({ togglePlayer }) => (
  <li onClick={() => togglePlayer()}>
    <span>
      hello world
    </span>
  </li>
);

export default connect(null, { togglePlayer })(Player);
