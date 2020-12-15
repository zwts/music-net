import { getRecommendPlaylist } from "../service/neteaseCloudMusicApi";
import {
  REQUEST_PLAYLIST,
  RECEIVE_PLAYLIST,
} from "./actionTypes";


export const requestPlaylist = () => ({
  type: REQUEST_PLAYLIST,
});

export const reqceivePlaylist = data => ({
  type: RECEIVE_PLAYLIST,
  data: data
});

export const fetchPlaylist = (limit) => {
  dump(`fetchPlaylist()`);
  return dispatch => {
    dispatch(requestPlaylist());
    return getRecommendPlaylist(limit).then(result => {
      const parsedList = parsePlaylist(result);
      dispatch(reqceivePlaylist(parsedList));
    });
  };
};


const samplePlaylist =
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


function parsePlaylist(playlist) {
  dump(`parsePlaylist(): ${JSON.stringify(playlist)}`);
  const parsedPlaylist = [];
  playlist.data.result.forEach(item => {
    const parsedItem = {};
    parsedItem.picUrl = item.picUrl;
    parsedItem.name = item.name;
    parsedItem.playCount = item.playCount;
    parsedItem.id = item.id;
    parsedPlaylist.push(parsedItem);
  });
  dump(`parsedPlaylist: ${JSON.stringify(parsedPlaylist)}`);
  return parsedPlaylist;
}

function parseSongsList(songsList) {
  const songsArray = songsList.data.result.songs;
  const parsedSongsList = [];
  songsArray.forEach(song => {
    const parsedSong = {};
    parsedSong.name = song.name;
    parsedSong.id = song.id;
    parsedSong.ar = song.ar[0].name;
    parsedSongsList.push(parsedSong);
  });
  dump(`parseSongsList(): ${JSON.stringify(parsedSongsList)}`);
  return parsedSongsList;
}
