import {
  TOGGLE_PLAYER,
  FETCH_SONGURL_SUCCESS,
  CHANGE_PLAYER_MODE,
  FETCH_SONGURL_BEGIN,
  FETCH_SONGURL_FAILURE,
  PLAY_NEXT_SONG,
  PLAY_PREVIOUS_SONG,
  REQUEST_RECOMMEND_LIST,
  RECEIVE_RECOMMEND_LIST,
  FETCHING_FOUND_LIST,
  FETCH_FOUND_LIST_SUCCESS,
  FETCH_FOUND_LIST_FAILURE
} from "./actionTypes";

const initialState = {
  loopMode: 'list',
  playedState: false,
  songUrl: null,
  loading: false,
  recommendData: [],
  songsData: []
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
    case REQUEST_RECOMMEND_LIST:
      return {
        ...state
      };
    case RECEIVE_RECOMMEND_LIST:
      dump(`recommend Reducer success: ${JSON.stringify(action.data)}`);
      return {
        ...state,
        recommendData: action.data
      };
    case FETCHING_FOUND_LIST:
      return {
        ...state
      };
    case FETCH_FOUND_LIST_SUCCESS:
      dump(`found Reducer success: ${JSON.stringify(action.data)}`);
      return {
        ...state,
        foundData: action.data
      };
    case FETCH_FOUND_LIST_FAILURE:
      return {
        ...state
      };
    default:
      return state
  }
}

