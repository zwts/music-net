import { UPDATE_FAVORITE_SONG } from "../../../redux/actionTypes";
// const FAVORITE_SONG_LIMIT = 10;

export const updateFavoriteSong = (favSongs) => ({
  type: UPDATE_FAVORITE_SONG,
  favoriteSongs: favSongs
});

export const toggleFavoriteSong = (song, favSongs) => {
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

    dispatch(updateFavoriteSong(favSongs));
  }
};
