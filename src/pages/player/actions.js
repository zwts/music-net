import {
  TOGGLE_PLAYER,
  CHANGE_PLAYER_MODE,
  FETCH_SONGURL_BEGIN,
  FETCH_SONGURL_SUCCESS,
  FETCH_SONGURL_FAILURE,
  PLAY_NEXT_SONG,
  PLAY_PREVIOUS_SONG,
  UPDATE_PLAYER
} from "../../redux/actionTypes";
import { getSongUrl } from "../../service/neteaseCloudMusicApi";

export const togglePlayer = () => ({
  type: TOGGLE_PLAYER
});

export const fetchSongUrlBegin = () => ({
  type: FETCH_SONGURL_BEGIN,
  loading: true
});

export const fetchSongUrlSuccess = songUrl => ({
  type: FETCH_SONGURL_SUCCESS,
  loading: false,
  songUrl: songUrl
});

export const fetchSongUrlFailure = error => ({
  type: FETCH_SONGURL_FAILURE,
  error: error
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

export const updatePlayer = (id, song, songs) => ({
  type: UPDATE_PLAYER,
  songId: id,
  song: song,
  songs: songs
});

export function fetchSongUrl(id) {
  return dispatch => {
    dispatch(fetchSongUrlBegin());
    return  getSongUrl(id).then(res => {
      dispatch(fetchSongUrlSuccess(res.data.data[0].url));
    })
      .catch(error => dispatch(fetchSongUrlFailure(error)));
  };
}


