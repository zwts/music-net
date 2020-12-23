import axios from 'axios';
const HOST = 'http://172.31.26.50:3000';

/**
 * Get the the search result by keywords.
 *
 * @param keywords  Search keywords, it could be singer, songname etc...
 */
export function getSearchResult(keywords, limit) {
  const API = '/cloudsearch';
  const url = HOST + API + '?keywords= ' + keywords + '&limit=' + limit;
  return axios.get(url);
}

/**
 * Get the the song url.
 *
 * @param songId  The id of song.
 * wuding id: 5257138
 */
export function getSongUrl(songId) {
  const API = '/song/url';
  const url = HOST + API + '?id= ' + songId;

  return axios.get(url);
}

/**
 * Get the the recommend play list.
 *
 * @param limit  The number of playlists taken out, default is 30.
 */
export function getRecommendPlaylist(limit) {
  const API = '/personalized';
  const url = HOST + API + '?limit=' + limit;

  return axios.get(url);
}

/**
 * Get the a list of featured play list.
 *
 * @param order  Option value is 'new' and 'hot'
 * @param limit  The number of playlists taken out, default is 50.
 */

export function getFeaturedPlayList(limit, order) {
  const API = '/top/playlist';
  const url = HOST + API + '?limit=' + limit + '&order=' + order;

  return axios.get(url);
}


/**
 * Get the Playlist detail
 *
 * @param playlistId id number of a playlist
 */
export function getPlaylistDetail(playlistId) {
  const API = '/playlist/detail';
  const url = HOST + API + '?id=' + playlistId;

  return axios.get(url);
}
