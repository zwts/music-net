import { 
  TOGGLE_PLAYER, 
  FETCH_SONGURL_SUCCESS, 
  CHANGE_PLAYER_MODE, 
  FETCH_SONGURL_BEGIN, 
  FETCH_SONGURL_FAILURE,
  PLAY_NEXT_SONG,
  PLAY_PREVIOUS_SONG
} from "../actionTypes";

// loopMode: list, single, random
// playState: true or false
const initialState = {
  loopMode: 'list',
  playedState: false,
  songUrl: null,
  loading: false
};

export default function playerReducer(state = initialState, action) {
  switch (action.type) {
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
    case TOGGLE_PLAYER: 
      return {
        ...state,
        playedState: !state.playedState
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
      }
    default:
      return state
  }
}
