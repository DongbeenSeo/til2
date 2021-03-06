import axios from "axios";
import {
  all,
  fork,
  takeLatest,
  call,
  put,
  takeEvery,
  delay,
} from "redux-saga/effects";
import {
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
  SIGN_UP_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  LOG_OUT_SUCCESS,
  LOG_OUT_FAILURE,
  LOG_OUT_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAILURE,
  LOAD_USER_REQUEST,
  FOLLOW_USER_REQUEST,
  UNFOLLOW_USER_SUCCESS,
  FOLLOW_USER_FAILURE,
  FOLLOW_USER_SUCCESS,
  UNFOLLOW_USER_FAILURE,
  UNFOLLOW_USER_REQUEST,
  LOAD_FOLLOWERS_SUCCESS,
  LOAD_FOLLOWERS_FAILURE,
  LOAD_FOLLOWERS_REQUEST,
  LOAD_FOLLOWINGS_REQUEST,
  LOAD_FOLLOWINGS_SUCCESS,
  LOAD_FOLLOWINGS_FAILURE,
  REMOVE_FOLLOWER_SUCCESS,
  REMOVE_FOLLOWER_FAILURE,
  REMOVE_FOLLOWER_REQUEST,
  EDIT_NICKNAME_SUCCESS,
  EDIT_NICKNAME_FAILURE,
  EDIT_NICKNAME_REQUEST,
} from "../reducers/user";

//log in
function loginAPI(loginData) {
  //서버에 api 요청을 보내는 부분
  return axios.post("/user/login", loginData, {
    withCredentials: true,
  });
}

function* login(action) {
  try {
    // login api 요청
    // yield delay(2000);
    const result = yield call(loginAPI, action.data);
    yield put({
      type: LOG_IN_SUCCESS,
      data: result.data,
    });
    // 로그인 성공시, put = dispatch
  } catch (err) {
    console.error(err);
    yield put({
      type: LOG_IN_FAILURE,
      error: err,
    });
    // 로그인 실패시
  }
}

function* watchLogin() {
  /**
   * saga에서 login action이 실행되는지 wait
   */
  // yield takeLatest(LOG_IN, login);
  // while (true) {
  //   yield take(LOG_IN);
  //   yield put({
  //     type: LOG_IN_SUCCESS
  //   });
  // }
  yield takeEvery(LOG_IN_REQUEST, login);
  // put: dispatch역할, redux saga의 dispatch
  // yield
}

// function* watchHello() {
//   console.log("before saga");
//   // take: 해당 액션이 dispatch되면 제너레이터를 next하는 이펙트
//   // generator 함수는 yield가 실행되면 객체를 반환하고 더이상 실행되지 않는다.
//   // 따라서 generator 함수는 지속적으로 사용하기 위해서 무한 실행되는 반복분을 사용해야 한다.
//   while (true) {
//     yield take(HELLO_SAGA);
//     console.log("hello saga");
//   }
// }

//sign up
function signUpAPI(signUpData) {
  return axios.post("/user/", signUpData);
}

function* signUp(action) {
  try {
    // yield delay(2000);
    // throw new Error('sign up error!!');
    yield call(signUpAPI, action.data);
    yield put({
      type: SIGN_UP_SUCCESS,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: SIGN_UP_FAILURE,
      error: err,
    });
  }
}

function* watchSignUp() {
  yield takeEvery(SIGN_UP_REQUEST, signUp);
}

function LogOutAPI() {
  return axios.post(
    "/user/logout",
    {},
    {
      withCredentials: true,
    }
  );
}

// logout
function* LogOut(action) {
  try {
    yield call(LogOutAPI);
    yield put({
      type: LOG_OUT_SUCCESS,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOG_OUT_FAILURE,
      error: err,
    });
  }
}

function* watchLogOut() {
  yield takeEvery(LOG_OUT_REQUEST, LogOut);
}

//load user data

function loadUserAPI(userId) {
  return axios.get(userId ? `/user/${userId}` : "/user/", {
    withCredentials: true,
    // 클라이언트에서 요청 보낼때는 브라우저가 쿠키를 같이 동봉
  }); // 서버사이드 렌더링일때는, 브라우저와 관계가 없다.
} // 때문에 직접 쿠키를 넣어줘야 한다.

function* loadUser(action) {
  try {
    const result = yield call(loadUserAPI, action.data);
    yield put({
      type: LOAD_USER_SUCCESS,
      data: result.data,
      me: !action.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_USER_FAILURE,
      error: err,
    });
  }
}

function* watchLoadUser() {
  yield takeEvery(LOAD_USER_REQUEST, loadUser);
}

function followAPI(userId) {
  return axios.post(`/user/${userId}/follow`, {}, { withCredentials: true });
}

function* follow(action) {
  try {
    const result = yield call(followAPI, action.data);
    yield put({
      type: FOLLOW_USER_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: FOLLOW_USER_FAILURE,
      error: err,
    });
  }
}

function* watchFollow() {
  yield takeEvery(FOLLOW_USER_REQUEST, follow);
}

function unfollowAPI(postId) {
  return axios.delete(`/user/${postId}/follow`, { withCredentials: true });
}

function* unfollow(action) {
  try {
    const result = yield call(unfollowAPI, action.data);
    yield put({
      type: UNFOLLOW_USER_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: UNFOLLOW_USER_FAILURE,
      error: err,
    });
  }
}

function* watchUnFollow() {
  yield takeEvery(UNFOLLOW_USER_REQUEST, unfollow);
}

// watchLoadFollowers

function loadFollowersAPI(userId, offset = 0, limit = 3) {
  return axios.get(
    `/user/${userId || 0}/followers?offset=${offset}&limit=${limit}`,
    { withCredentials: true }
  );
}

function* loadFollowers(action) {
  try {
    const result = yield call(loadFollowersAPI, action.data, action.offset);
    yield put({
      type: LOAD_FOLLOWERS_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_FOLLOWERS_FAILURE,
      error: err,
    });
  }
}

function* watchLoadFollowers() {
  yield takeEvery(LOAD_FOLLOWERS_REQUEST, loadFollowers);
}

// watchLoadFollowings

function loadFollowingsAPI(userId, offset = 0, limit = 3) {
  return axios.get(
    `/user/${userId || 0}/followings?offset=${offset}&limit=${limit}`,
    {
      withCredentials: true,
    }
  );
}

function* loadFollowings(action) {
  try {
    const result = yield call(loadFollowingsAPI, action.data, action.offset);
    yield put({
      type: LOAD_FOLLOWINGS_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_FOLLOWINGS_FAILURE,
      error: err,
    });
  }
}

function* watchLoadFollowings() {
  yield takeEvery(LOAD_FOLLOWINGS_REQUEST, loadFollowings);
}

// watchRemoveFollower
function removeFollowerAPI(userId) {
  return axios.delete(`/user/${userId || 0}/follower`, {
    withCredentials: true,
  });
}

function* removeFollower(action) {
  try {
    const result = yield call(removeFollowerAPI, action.data);
    yield put({
      type: REMOVE_FOLLOWER_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: REMOVE_FOLLOWER_FAILURE,
      error: err,
    });
  }
}

function* watchRemoveFollower() {
  yield takeEvery(REMOVE_FOLLOWER_REQUEST, removeFollower);
}

// watchRemoveFollower
function editNicknameAPI(nickname) {
  return axios.patch(
    `/user/nickname`,
    { nickname },
    {
      withCredentials: true,
    }
  );
}

function* editNickname(action) {
  try {
    const result = yield call(editNicknameAPI, action.data);
    yield put({
      type: EDIT_NICKNAME_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: EDIT_NICKNAME_FAILURE,
      error: err,
    });
  }
}

function* watchEditNickname() {
  yield takeEvery(EDIT_NICKNAME_REQUEST, editNickname);
}

export default function* userSaga() {
  yield all([
    fork(watchLogin),
    fork(watchLogOut),
    fork(watchLoadUser),
    fork(watchSignUp),
    fork(watchFollow),
    fork(watchUnFollow),
    fork(watchLoadFollowers),
    fork(watchLoadFollowings),
    fork(watchRemoveFollower),
    fork(watchEditNickname),
  ]);
}
