import { combineReducers } from "redux";
import user from "./user";
import post from "./post";

const reducers = combineReducers({
  user,
  post,
});

export default reducers;
