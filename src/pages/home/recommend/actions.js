import { getRecommendPlaylist } from "../../../service/neteaseCloudMusicApi";
import {
  REQUEST_RECOMMEND_LIST,
  RECEIVE_RECOMMEND_LIST
} from "../../../redux/actionTypes";

// Actions for recommend
export const requestRecommendList = () => ({
  type: REQUEST_RECOMMEND_LIST,
  loading: true
});

export const receiveRecommendList = data => ({
  type: RECEIVE_RECOMMEND_LIST,
  loading: false,
  data: data
});

export const fetchRecommendList = (limit) => {
  dump(`fetchRecommendList`);
  return dispatch => {
    dispatch(requestRecommendList());
    return getRecommendPlaylist(limit).then(result => {
      const parsedList = parseRecommendList(result);
      dispatch(receiveRecommendList(parsedList));
    });
  };
};

function parseRecommendList(recommendList) {
  dump(`parseRecommendList: ${JSON.stringify(recommendList)}`);
  const parsedList = [];
  recommendList.data.result.forEach(item => {
    const parsedItem = {};
    parsedItem.picUrl = item.picUrl;
    parsedItem.name = item.name;
    parsedItem.playCount = item.playCount;
    parsedItem.id = item.id;
    parsedList.push(parsedItem);
  });
  dump(`parsedList: ${JSON.stringify(parsedList)}`);
  return parsedList;
}
