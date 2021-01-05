import { getSearchResult } from '../../../service/neteaseCloudMusicApi';
import {
  FETCHING_FOUND_LIST,
  FETCH_FOUND_LIST_SUCCESS,
  FETCH_FOUND_LIST_FAILURE
} from '../../../redux/actionTypes';

export const fetchingFoundList = () => ({
  type: FETCHING_FOUND_LIST,
  loading: true
});

export const fetchFoundListSuccess = data => ({
  type: FETCH_FOUND_LIST_SUCCESS,
  loading: false,
  data: data
});

export const fetchFoundListFailure = error => ({
  type: FETCH_FOUND_LIST_FAILURE,
  loading: false
});

export const fetchFoundList = (art, limit) => {
  return dispatch => {
    dispatch(fetchingFoundList());
    return getSearchResult(art, limit).then(res => {
      const parsedList = parseFoundList(res);
      dispatch(fetchFoundListSuccess(parsedList));
    }).catch(error => dispatch(fetchFoundListFailure(error)));
  };
};

function parseFoundList(found) {
  const songsArray = found.data.result.songs;
  const parsedFoundList = [];
  songsArray.forEach(song => {
    const parsedSong = {};
    parsedSong.picUrl = song.al.picUrl;
    parsedSong.name = song.name;
    parsedSong.id = song.id;
    parsedSong.ar = song.ar[0].name;
    parsedFoundList.push(parsedSong);
  });
  dump(`parseFoundList: ${JSON.stringify(parsedFoundList)}`);
  return parsedFoundList;
}

