import { all, fork, takeLatest, call, put, take } from "redux-saga/effects";
import { LOG_IN, LOG_IN_SUCCESS, LOG_IN_FAIL } from "../reducers/user";

const HELLO_SAGA = "HELLO_SAGA";

function loginAPI() {
  //서버에 api 요청을 보내는 부분
}

function* login() {
  try {
    yield call(loginAPI);
    // login api 요청
    yield put({
      type: LOG_IN_SUCCESS
    });
    // 로그인 성공시, put = dispatch
  } catch (err) {
    console.error(err);
    yield put({
      type: LOG_IN_FAIL
    });
    // 로그인 실패시
  }
}

function* watchLogin() {
  /**
   * saga에서 login action이 실행되는지 wait
   */
  // yield takeLatest(LOG_IN, login);
  while (true) {
    yield take(LOG_IN);
    yield put({
      type: LOG_IN_SUCCESS
    });
  }
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

function* watchSignUp() {}

export default function* userSaga() {
  yield all([watchLogin()]);
}
