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

ex) 로그인 액션(action) -> 로그인 액션 dispatch(dispatch) -> 로그인액션 dispatch시 isLogin state를 변경(reducer) ->
