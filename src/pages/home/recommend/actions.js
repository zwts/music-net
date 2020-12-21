import { getRecommendPlaylist } from "../../../service/neteaseCloudMusicApi";
import {
  REQUEST_RECOMMEND_LIST,
  RECEIVE_RECOMMEND_LIST,
} from "../../../redux/actionTypes";

export const requestRecommendList = () => ({
  type: REQUEST_RECOMMEND_LIST,
});

export const receiveRecommendList = data => ({
  type: RECEIVE_RECOMMEND_LIST,
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

const sampleRecommendList =
  {
    "data": {
      "hasTaste": false,
      "code": 200,
      "category": 0,
      "result": [{
        "id": 4926865057,
        "type": 0,
        "name": "夜间咖啡馆|西餐馆|傍晚的乐器演奏家",
        "copywriter": "编辑推荐：本单包含Bossa nova、民谣风、爵士乐、中世纪风格",
        "picUrl": "https://p1.music.126.net/Jh1iS5wFR5Xz_GNML996VA==/109951165046243126.jpg",
        "canDislike": false,
        "trackNumberUpdateTime": 1607590232764,
        "playCount": 83431,
        "trackCount": 28,
        "highQuality": false,
        "alg": "featured"
      }, {
        "id": 5097412008,
        "type": 0,
        "name": "网郁云 “那晚我悲痛欲绝”",
        "copywriter": "热门歌单推荐",
        "picUrl": "https://p1.music.126.net/2YOC31gtmRjoB-K5FSOE_w==/109951165520586580.jpg",
        "canDislike": true,
        "trackNumberUpdateTime": 1607996811286,
        "playCount": 946498,
        "trackCount": 260,
        "highQuality": false,
        "alg": "hot_server"
      }]
    }
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