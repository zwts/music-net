import {
  FETCH_SONGURL_SUCCESS,
  FETCH_SONGURL_BEGIN,
  FETCH_SONGURL_FAILURE,
  UPDATE_PLAYER,
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
    songId: '', // current play song id
    song: null,
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
    case FETCH_SONGURL_BEGIN:
      dump('FETCH_SONGURL_BEGIN');
      return {
        ...state,
        player: {
          ...state.player,
          loading: action.loading,
        }
      };
    case FETCH_SONGURL_SUCCESS:
      dump('FETCH_SONGURL_SUCCESS');
      return {
        ...state,
        player: {
          ...state.player,
          loading: action.loading,
          songUrl: action.songUrl
        }
      };
    case FETCH_SONGURL_FAILURE:
      // When fetch failed, set loading to false,
      // may show error toaster in the further
      dump('FETCH_SONGURL_FAILURE');
      return {
        ...state,
        player: {
          ...state.player,
          loading: false,
          songUrl: null,
          error: action.error
        }
      };
    case UPDATE_PLAYER:
      return {
        ...state,
        player: {
          ...state.player,
          songId: action.songId,
          song: action.song,
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

