# Front-end

## Next.js

함수 컴포넌트에서 props로 넘겨주는 함수들은 useCallback으로 감싸줘야 한다.
-> 이유는 함수컴포넌트가 통째로 재실행되면서 메소드나 함수들이 새로 생성되고
함수들이 다시 생성된다는 것은 그 함수를 받은 자식 컴포넌트들 까지도 리렌더링이 되기 때문.
함수도 객체이기 때문에 새로 생성되면 다른 객체가 된다.

\_document.js

- html,head,body

\_app.js

- root

pages

- 실제 컴포넌트

\_error.js

-> document.js, \_app.js, \_error.js는 기본 next에 내장된 컴포넌트들로 커스터마이징해야할 때 따로 추가

## Redux

action: state를 바꾸는 행동
dispatch: action을 실행
reducer: action의 결과로 state를 어떻게 바꿀지 정의

ex) 로그인 액션(action) -> 로그인 액션 dispatch(dispatch) -> 로그인액션 dispatch시 isLogin state를 변경(reducer)

reducer의 return값은 항상 불변성을 유지, react에서는 이전 state와 현재 state의 차이를 판단하는데 객체는 참조가 항상 같기 때문에,
새로운 객체를 생성하지 않으면 redux의 state가 변경되었는지 알 수 없다.

react Class Component -> connect
react Function Component -> hooks(useDispatch, useEffect)

### 1. redux devtools error

ReferenceError: window is not defined 발생시

```js
+ const composeEnhancers = typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
+ const store = createStore(reducer, /* preloadedState, */ composeEnhancers(
- const store = createStore(reducer, /* preloadedState, */ compose(
    applyMiddleware(...middleware)
  ));
```

### 2. redux saga

redux에서 action을 dispatch하면 동기식으로 작동하기 때문에

- 서버쪽에 data가 전달되고,
- 서버가 로그인 성공이라는 response를 보내주고
- response를 받아서 로그인

기능을 비동기식으로 실행하기 위해 redux-saga middleware를 사용

```js
function* generator(){
  ...
}

// 무한의 개념 or 비동기 처리를 하는 데에 자주 사용하는 함수
```

### 3. Server-side rendering

로그인상태를 예를 들어 SPA에서 화면이 리로딩될때 로그인 상태를 받아오기 전까지
미로그인 상태를 가려주기 위해 back-end 에서 처리하는 기술

# Back-end

## Library

- express
  - javascript를 실행시키는 node위에 프레임워크인 `express`를 통해 서버구축
- axios
  - http요청에 가장 많이 사용
- bcrypt
  - 비밀번호 암호화
- cookie-parser / express-session
  - 로그인에 쿠키와 세션을 사용하기 위한
- dotenv
  - 환경변수 세팅, 비밀번호를 관리
- cors
  - 도메인이 다른 back-end, front-end 서버 사이의 제약을 해결
- helmet / hpp
  - node와 express의 보안을 담당
- morgan
  - 서버 로깅 (요청과 응답 등)
- multer
  - 이미지 업로드
- passport / passport-local
  - 로그인 관리
- sequelize / sequelize-cli
  - ORM(Object-Relational Mapping), SQL과 javascript를 연결
- nodemon
  - code hot-loading
