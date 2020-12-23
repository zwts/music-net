import { getPlaylistDetail } from "../../service/neteaseCloudMusicApi";
import {
  REQUEST_PLAYLIST,
  RECEIVE_PLAYLIST,
  UPDATE_PLAYLIST_INFO
} from "../../redux/actionTypes";

export const requestPlaylist = () => ({
  type: REQUEST_PLAYLIST,
  loading: true
});

export const receivePlaylist = data => ({
  type: RECEIVE_PLAYLIST,
  data: data,
  loading: false
});

export const updatePlaylistInfo = playlistInfo => ({
  type: UPDATE_PLAYLIST_INFO,
  info: playlistInfo
});

export const fetchPlaylist = (playlistId) => {
  dump(`fetchPlaylist ---`);
  return dispatch => {
    dispatch(requestPlaylist());
    return getPlaylistDetail(playlistId).then(result => {
      const parsedList = parsePlaylist(result);
      dispatch(receivePlaylist(parsedList));
    });
  };
};

function parsePlaylist(songs) {
  const songsArray = songs.data.playlist.tracks;
  dump(`parsePlaylist(): ${JSON.stringify(songsArray)}`);
  const parsedSongsList = [];
  songsArray.forEach(song => {
    const parsedSong = {};
    parsedSong.picUrl = song.al.picUrl;
    parsedSong.name = song.name;
    parsedSong.id = song.id;
    parsedSong.ar = song.ar[0].name;
    parsedSongsList.push(parsedSong);
  });
  dump(`parsePlaylist(): ${JSON.stringify(parsedSongsList)}`);
  return parsedSongsList;
}
