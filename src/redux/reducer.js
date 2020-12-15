import {
  TOGGLE_PLAYER,
  FETCH_SONGURL_SUCCESS,
  CHANGE_PLAYER_MODE,
  FETCH_SONGURL_BEGIN,
  FETCH_SONGURL_FAILURE,
  PLAY_NEXT_SONG,
  PLAY_PREVIOUS_SONG,
  REQUEST_PLAYLIST,
  RECEIVE_PLAYLIST,
  FETCHING_PLAYLIST,
  FETCH_PLAYLIST_SUCCESS,
  FETCH_PLAYLIST_FAILURE
} from "./actionTypes";

const initialState = {
  loopMode: 'list',
  playedState: false,
  songUrl: null,
  loading: false
};

export default function playerReducer(state = initialState, action) {
  switch (action.type) {
    // Player reducer
    case TOGGLE_PLAYER: {
      return {
        ...state,
        playedState: !state.playedState
      };
    }
    case FETCH_SONGURL_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };
    case FETCH_SONGURL_SUCCESS:
      return {
        ...state,
        loading: false,
        songUrl: action.songUrl
      };
    case FETCH_SONGURL_FAILURE:
      // When fetch failed, set loading to false,
      // may show error toaster in the further
      return {
        ...state,
        loading: false,
        error: action.error,
        songUrl: null
      };
    case CHANGE_PLAYER_MODE: {
      const { mode } = action.mode;
      return {
        ...state,
        loopMode: mode
      };
    }
    case PLAY_NEXT_SONG:
      return {
        ...state
      };
    case PLAY_PREVIOUS_SONG:
      return {
        ...state
      };
    // Playlist reducer
    case REQUEST_PLAYLIST:
      return {
        ...state
      };
    case RECEIVE_PLAYLIST:
      dump(`playlist Reducer success: ${JSON.stringify(action.data)}`);
      return {
        ...state,
        itemsData: action.data
      };

    case FETCHING_PLAYLIST:
      return {
        ...state
      };
    case FETCH_PLAYLIST_SUCCESS:
      dump(`songlist Reducer success: ${JSON.stringify(action.data)}`);
      return {
        ...state,
        songsData: action.data
      };
    case FETCH_PLAYLIST_FAILURE:
      return {
        ...state
      };
    default:
      return state
  }
}

