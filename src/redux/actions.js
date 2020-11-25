import { TOGGLE_PLAYER, CHANGE_PLAYER_MODE } from "./actionTypes";

export const togglePlayer = () => ({
  type: TOGGLE_PLAYER
});

export const changePlayerMode = playMode => ({
  type: CHANGE_PLAYER_MODE,
  mode: playMode
});
