import {
  all,
  delay,
  fork,
  put,
  takeLatest,
  takeEvery,
  call,
} from "redux-saga/effects";
import {
  ADD_POST_SUCCESS,
  ADD_POST_FAILURE,
  ADD_POST_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAILURE,
  ADD_COMMENT_REQUEST,
  LOAD_MAIN_POSTS_REQUEST,
  LOAD_MAIN_POSTS_FAILURE,
  LOAD_MAIN_POSTS_SUCCESS,
} from "../reducers/post";
import axios from "axios";

function addPostAPI(postData) {
  return axios.post("/post", postData, {
    withCredentials: true,
  });
}

function* addPost(action) {
  try {
    const result = yield call(addPostAPI, action.data);
    yield put({
      type: ADD_POST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ADD_POST_FAILURE,
      error: err,
    });
  }
}

function* watchAddPost() {
  yield takeEvery(ADD_POST_REQUEST, addPost);
}

function loadMainPostsAPI(postData) {
  return axios.get("/posts");
}

function* loadMainPosts(action) {
  try {
    const result = yield call(loadMainPostsAPI);
    yield put({
      type: LOAD_MAIN_POSTS_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_MAIN_POSTS_FAILURE,
      error: err,
    });
  }
}

function* watchLoadMainPosts() {
  yield takeEvery(LOAD_MAIN_POSTS_REQUEST, loadMainPosts);
}

function addCommentAPI() {}

//REQUEST에 대한 action
function* addComment(action) {
  try {
    yield delay(2000);
    yield put({
      type: ADD_COMMENT_SUCCESS,
      data: {
        postId: action.data.postId,
      },
    });
  } catch (err) {
    yield put({
      type: ADD_COMMENT_FAILURE,
      error: err,
    });
  }
}

function* watchAddComment() {
  yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}

export default function* postSaga() {
  yield all([
    fork(watchAddPost),
    fork(watchLoadMainPosts),
    fork(watchAddComment),
  ]);
}
