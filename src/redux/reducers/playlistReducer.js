import {
  REQUEST_PLAYLIST,
  RECEIVE_PLAYLIST,
} from "../actionTypes";


export default function playlistReducer(state = {}, action) {
  switch (action.type) {
    case REQUEST_PLAYLIST:
      return {};
    case RECEIVE_PLAYLIST:
      dump(`playlistReducer() success: ${JSON.stringify(action.data)}`);
      return { itemsData: action.data };
    default:
      return {};
  }
}
