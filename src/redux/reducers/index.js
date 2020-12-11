import { combineReducers } from "redux";
import playerReducer from "./playerReducer";
import playlistReducer from "./playlistReducer";

const rootReducer = combineReducers({
  playerReducer,
  playlistReducer
});

export default rootReducer;
