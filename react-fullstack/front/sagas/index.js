import { all, call, fork } from "redux-saga/effects";
import axios from "axios";
import userSaga from "./user";
import postSaga from "./post";
import Const from '../const'

axios.defaults.baseURL = `http://localhost:${Const.port}/api`;

export default function* rootSaga() {
  yield all([fork(userSaga), fork(postSaga)]);
}
