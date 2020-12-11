import React from "react";
import { Component } from "react";
import { connect } from "react-redux";
import { fetchPlaylist } from "../../redux/playlistActions";
import { List, ListItem } from 'kaid';
import store from '../../redux/store';

import "./index.scss";

class Playlist extends Component {
  constructor(props) {
    super(props);
    if (!store.getState().itemsData) {
      this.props.fetchPlaylist('邓紫棋', 2);
    }
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  componentDidMount() {
    dump(`componentDidMount`);
    this.focus();
  }

  componentDidUpdate() {
    dump(`componentDidUpdate`);
  }

  focus() {
    dump(`focus`);
    if (this.list) {
      this.list.container.focus();
    } else if (this.element) {
      this.element.focus();
    }
  }

  handleKeyDown(e) {
    switch (e.key) {
      case 'Enter':
        this.props.history.push('/player');
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

  render() {
    const { itemsData } = this.props;
    dump(`itemsData: ${JSON.stringify(itemsData)}`);

    function createListItem(itemsData) {
      const { icon, name, ar } = itemsData;
      const options = {};
      options.icon = icon;
      options.primary = name;
      options.secondary = ar;
      options.focusable = 'true';

      return (
        <ListItem {...options}/>
      );
    }

    return (
      <div ref={ref => {
        this.element = ref;
      }} onKeyDown={this.handleKeyDown} className="list-view" tabIndex="-1">
        <List ref={(list) => {
          this.list = list;
        }}
        >
          {itemsData && itemsData.map(itemData => (
            createListItem(itemData)
          ))}
        </List>
      </div>

    );
  }
}

const mapStateToProps = state => {
  return {
    itemsData: state.itemsData,
  };
};

// Map Redux actions to component props
const mapDispatchToProps = {
  fetchPlaylist
};

export default connect(mapStateToProps, mapDispatchToProps)(Playlist);

