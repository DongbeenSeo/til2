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
  });
}

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

export default function* userSaga() {
  yield all([
    fork(watchLogin),
    fork(watchLogOut),
    fork(watchLoadUser),
    fork(watchSignUp),
  ]);
}
