import { getSearchResult } from "../service/neteaseCloudMusicApi";
import {
  FETCHING_PLAYLIST,
  FETCH_PLAYLIST_SUCCESS,
  FETCH_PLAYLIST_FAILURE,
} from "./actionTypes";


export const fetchingPlaylist = () => ({
  type: FETCHING_PLAYLIST,
});

export const fetchPlaylistSuccess = data => ({
  type: FETCH_PLAYLIST_SUCCESS,
  data: data
});

export const fetchPlaylistFailure = error => ({
  type: FETCH_PLAYLIST_FAILURE,
  error
});

export const fetchPlaylist = (art, limit) => {
  return dispatch => {
    dispatch(fetchingPlaylist());
    return getSearchResult(art, limit).then(res => {
      const parsedList = parseSongsList(res);
      dispatch(fetchPlaylistSuccess(parsedList));
    }).catch(error => dispatch(fetchPlaylistFailure(error)));
  };
};

function parseSongsList(songsList) {
  const songsArray = songsList.data.result.songs;
  const parsedSongsList = [];
  songsArray.forEach(song => {
    const parsedSong = {};
    parsedSong.name = song.name;
    parsedSong.id = song.id;
    parsedSong.ar = song.ar[0].name;
    parsedSongsList.push(parsedSong);
  });
  dump(`parseSongsList(): ${JSON.stringify(parsedSongsList)}`);
  return parsedSongsList;
}
