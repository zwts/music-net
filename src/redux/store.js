import { createStore } from "redux";
import playerReducer from "./reducers/playerReducer";

export default createStore(playerReducer);
