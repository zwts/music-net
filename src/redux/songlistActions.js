import { getSearchResult } from "../service/neteaseCloudMusicApi";
import {
  FETCHING_PLAYLIST,
  FETCH_PLAYLIST_SUCCESS,
  FETCH_PLAYLIST_FAILURE,
} from "./actionTypes";


export const fetchingPlaylist = () => ({
  type: FETCHING_PLAYLIST,
});

export const fetchSongListSuccess = data => ({
  type: FETCH_PLAYLIST_SUCCESS,
  data: data
});

export const fetchSongListFailure = error => ({
  type: FETCH_PLAYLIST_FAILURE,
  error
});

export const fetchSongList = (art, limit) => {
  return dispatch => {
    dispatch(fetchingPlaylist());
    return getSearchResult(art, limit).then(res => {
      const parsedList = parseSongsList(res);
      dispatch(fetchSongListSuccess(parsedList));
    }).catch(error => dispatch(fetchSongListFailure(error)));
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

