import {
  TOGGLE_PLAYER,
  FETCH_SONGURL_SUCCESS,
  CHANGE_PLAYER_MODE,
  FETCH_SONGURL_BEGIN,
  FETCH_SONGURL_FAILURE,
  PLAY_NEXT_SONG,
  PLAY_PREVIOUS_SONG,
  UPDATE_PLAYER_SONGS,
  REQUEST_PLAYLIST,
  RECEIVE_PLAYLIST,
  UPDATE_PLAYLIST_INFO,
  REQUEST_RECOMMEND_LIST,
  RECEIVE_RECOMMEND_LIST,
  FETCHING_FOUND_LIST,
  FETCH_FOUND_LIST_SUCCESS,
  FETCH_FOUND_LIST_FAILURE
} from './actionTypes';

const initialState = {
  player: {
    loading: false, // padding state for fetch song url from server
    error: null, // error value when fetch song url from server failed
    played: false, // player state, play or not
    loopMode: 'list', // current play mode
    songId: '', // current play song id
    songs: [], // compute next or previous song
    songUrl: null, // current play song url
  },
  playlist: {
    loading: false, // padding state for loading playlist from server
    playlistInfo: null, // Playlist informations like name picURL etc.
    playlistData: [] // state value, when playlist change.
  },
  recommend: {
    loading: false,
    recommendData: []
  },
  foundData: []
};

export default function playerReducer(state = initialState, action) {
  switch (action.type) {
    // Player reducer
    case TOGGLE_PLAYER: {
      return {
        ...state,
        player: {
          ...state.player,
          played: !state.player.played
        }
      };
    }
    case FETCH_SONGURL_BEGIN:
      dump('FETCH_SONGURL_BEGIN');
      return {
        ...state,
        player: {
          ...state.player,
          loading: true
        }
      };
    case FETCH_SONGURL_SUCCESS:
      dump('FETCH_SONGURL_SUCCESS');
      return {
        ...state,
        player: {
          ...state.player,
          loading: false,
          songUrl: action.songUrl
        }
      };
    case FETCH_SONGURL_FAILURE:
      // When fetch failed, set loading to false,
      // may show error toaster in the further
      dump('loading fail');
      return {
        ...state,
        player: {
          ...state.player,
          loading: false,
          songUrl: null,
          error: action.error
        }
      };
    case CHANGE_PLAYER_MODE: {
      const { mode } = action.mode;
      return {
        ...state,
        player: {
          ...state.player,
          loopMode: mode
        }
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
    case UPDATE_PLAYER_SONGS:
      return {
        ...state,
        player: {
          ...state.player,
          songId: action.songId,
          songs: action.songs
        }
      };

    // Playlist reducer
    case REQUEST_PLAYLIST:
      dump('reducer REQUEST_PLAYLIST');
      return {
        ...state,
        playlist: {
          ...state.playlist,
          loading: action.loading
        }
      };

    case RECEIVE_PLAYLIST:
      dump(`reducer RECEIVE_PLAYLIST: ${JSON.stringify(action.data)}`);
      return {
        ...state,
        playlist: {
          ...state.playlist,
          loading: action.loading,
          playlistData: action.data
        }
      };
    case UPDATE_PLAYLIST_INFO:
      return {
        ...state,
        playlist: {
          ...state.playlist,
          info: action.info
        }
      };

    // Recommend reducer
    case REQUEST_RECOMMEND_LIST:
      return {
        ...state,
        recommend: {
          ...state.recommend,
          loading: action.loading,
        }
      };
    case RECEIVE_RECOMMEND_LIST:
      dump(`recommend Reducer success: ${JSON.stringify(action.data)}`);
      return {
        ...state,
        recommend: {
          ...state.recommend,
          loading: action.loading,
          recommendData: action.data
        }
      };

    //Found Reducer
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

