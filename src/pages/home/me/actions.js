import { UPDATE_FAVORITE_SONGS, UPDATE_RECENTLY_SONGS } from "../../../redux/actionTypes";
// const FAVORITE_SONG_LIMIT = 10;
const RECENTLY_SONGS_LIMIT = 5;

export const updateFavoriteSongs = (favSongs) => ({
  type: UPDATE_FAVORITE_SONGS,
  favoriteSongs: favSongs
});

export const updateRecentlySongs = (recSongs) => ({
  type: UPDATE_RECENTLY_SONGS,
  recentlySongs: recSongs
});

export const toggleFavoriteSong = (song, favSongs) => {
  // TODO: remove favSongs params, get it from store.
  return (dispatch) => {
    dump(`toggleFavoriteSong id ${song.id}`);
    const id = song.id.toString();

    if (favSongs.has(id)) {
      dump(`toggleFavoriteSong delete ${id}`);
      favSongs.delete(id);
    } else {
      //Todo should limited fav
      // if (favSongs.size < FAVORITE_SONG_LIMIT) {
      dump(`toggleFavoriteSong set ${id}`);
      favSongs.set(id, song);
      // }
    }

    dispatch(updateFavoriteSongs(favSongs));
  }
};

export const addRecentlySong = (song) => {
  function alreadyInList(id, arr) {
    let matched = false;
    arr.forEach((item) => {
      if(item.id === id) {
        matched = true;
      }
    });
    return matched;
  }

  // usage of getState:
  // https://stackoverflow.com/questions/35667249/accessing-redux-state-in-an-action-creator/35674575
  return (dispatch, getState) => {
    let recSongs = [...getState().me.recentlySongs];

    if(!alreadyInList(song.id, recSongs)) {
      let len = recSongs.unshift(song);

      if (len > RECENTLY_SONGS_LIMIT) {
        recSongs.pop();
      }
    } else {
      // TODO: to put the new played to the top, even already in recently list.
    }

    dispatch(updateRecentlySongs(recSongs));
  }
};
