import { TOGGLE_PLAYER, CHANGE_PLAYER_MODE } from "../actionTypes";


// loopMode: list, single, random
// playState: true or false
const initialState = {
  loopMode: 'list',
  playedState: false
};

export default function playerReducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_PLAYER: {
      return {
        ...state,
        playedState: !state.playedState
      };
    }

    case CHANGE_PLAYER_MODE: {
      const { mode } = action.mode;
      return {
        ...state,
        loopMode: mode
      };
    }

    default:
      return state
  }
}
