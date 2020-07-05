import { all, call, fork } from "redux-saga/effects";
import axios from "axios";
import userSaga from "./user";
import postSaga from "./post";

axios.defaults.baseURL = "http://localhost:3065/api";

export default function* rootSaga() {
  yield all([fork(userSaga), fork(postSaga)]);
}
