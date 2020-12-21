import {
  TOGGLE_PLAYER,
  FETCH_SONGURL_SUCCESS,
  CHANGE_PLAYER_MODE,
  FETCH_SONGURL_BEGIN,
  FETCH_SONGURL_FAILURE,
  PLAY_NEXT_SONG,
  PLAY_PREVIOUS_SONG,
  UPDATE_PLAYER_SONG_ID
} from "../../redux/actionTypes";
import { getSongUrl } from "../../service/neteaseCloudMusicApi";

export const togglePlayer = () => ({
  type: TOGGLE_PLAYER
});

export const fetchSongUrlBegin = () => ({
  type: FETCH_SONGURL_BEGIN
});

export const fetchSongUrlSuccess = songUrl => ({
  type: FETCH_SONGURL_SUCCESS,
  songUrl
});

export const fetchSongUrlFailure = error => ({
  type: FETCH_SONGURL_FAILURE,
  error
});

export const playNextSong = () => ({
  type: PLAY_NEXT_SONG,
});

export const playPreviousSong = () => ({
  type: PLAY_PREVIOUS_SONG,
});

export const changePlayerMode = playMode => ({
  type: CHANGE_PLAYER_MODE,
  mode: playMode
});

export const updatePlayerSongId = id => ({
  type: UPDATE_PLAYER_SONG_ID,
  songId: id
});

export function fetchSongUrl(id) {
  return dispatch => {
    dispatch(fetchSongUrlBegin());
    return  getSongUrl(id).then(res => {
      dispatch(fetchSongUrlSuccess(res.data.data[0].url));
      return res.data.data[0].url;
    })
      .catch(error => dispatch(fetchSongUrlFailure(error)));
  };
}


