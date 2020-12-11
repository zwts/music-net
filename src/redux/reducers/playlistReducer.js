import {
  FETCHING_PLAYLIST,
  FETCH_PLAYLIST_SUCCESS,
  FETCH_PLAYLIST_FAILURE
} from "../actionTypes";


export default function playlistReducer(state = {}, action) {
  switch (action.type) {
    case FETCHING_PLAYLIST:
      return {};
    case FETCH_PLAYLIST_SUCCESS:
      dump(`playlistReducer() success: ${JSON.stringify(action.data)}`);
      return { itemsData: action.data };
    case FETCH_PLAYLIST_FAILURE:
      return {};
    default:
      return {};
  }
}
