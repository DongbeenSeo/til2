import { all, delay, fork, put, takeLatest } from "redux-saga/effects";
import {
  ADD_POST_SUCCESS,
  ADD_POST_FAILURE,
  ADD_POST_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAILURE,
  ADD_COMMENT_REQUEST
} from "../reducers/post";

function addPostAPI() {}

function* addPost() {
  try {
    yield delay(2000);
    yield put({
      type: ADD_POST_SUCCESS
    });
  } catch (err) {
    yield put({
      type: ADD_POST_FAILURE,
      error: err
    });
  }
}

function* watchAddPost() {
  yield takeLatest(ADD_POST_REQUEST, addPost);
}

function addCommentAPI() {}

function* addComment(action) {
  try {
    yield delay(2000);
    yield put({
      type: ADD_COMMENT_SUCCESS,
      data: {
        postId: action.adta.postId
      }
    });
  } catch (err) {
    yield put({
      type: ADD_COMMENT_FAILURE,
      error: err
    });
  }
}

function* watchAddComment() {
  yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}

export default function* postSaga() {
  yield all([fork(watchAddPost), fork(watchAddComment)]);
}
