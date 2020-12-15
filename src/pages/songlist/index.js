import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSongList } from '../../redux/songlistActions';
import { List, ListItem } from 'kaid';
import store from '../../redux/store';

import './index.scss';

class SongList extends Component {
  constructor(props) {
    super(props);
    if (!store.getState().songsData) {
      this.props.fetchSongList('邓紫棋', 2);
    }
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.onFocus = this.onFocus.bind(this);
  }

  componentDidMount() {
    dump(`componentDidMount`);
  }

  componentDidUpdate() {
    dump(`componentDidUpdate`);
  }

  onFocus() {
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
      default:
        break;
    }
  }

  render() {
    const { songsData } = this.props;
    dump(`songsData: ${JSON.stringify(songsData)}`);

    function createListItem(songsData) {
      const { icon, name, ar, id } = songsData;
      const options = {};
      options.icon = icon;
      options.primary = name;
      options.secondary = ar;
      options.id = id;
      options.focusable = 'true';

      return (
        <ListItem {...options}/>
      );
    }

    return (
      <div ref={ref => {this.element = ref;}}
           onKeyDown={this.handleKeyDown}
           className="list-view"
           onFocus={this.onFocus}
           tabIndex="-1">
        <List ref={(list) => {
          this.list = list;
        }}
        >
          {songsData && songsData.map(songData => (
            createListItem(songData)
          ))}
        </List>
      </div>

    );
  }
}

const mapStateToProps = state => {
  return {
    songsData: state.songsData,
  };
};

// Map Redux actions to component props
const mapDispatchToProps = {
  fetchSongList
};

export default connect(mapStateToProps, mapDispatchToProps)(SongList);

