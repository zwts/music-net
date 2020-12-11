import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import playerReducer from "./reducers/playerReducer";
import playlistReducer from "./reducers/playlistReducer";
import reducer from './reducers';

// const store = createStore(playerReducer, applyMiddleware(thunk));
const store = createStore(playlistReducer, applyMiddleware(thunk));
// const store = createStore(reducer, applyMiddleware(thunk));

export default store;

