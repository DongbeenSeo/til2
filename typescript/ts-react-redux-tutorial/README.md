# TIL(Today I Learned) - 2019/11/07

## TypeScript with Redux

> `redux`의 경우 TypeScript지원, 하지만 `react-redux`의 경우는 지원하지 않기 때문에 `@types`를 붙인 패키지를 설치 해주어야 한다
> `@types`는 TypeScript 미지원 라이브러리에 TypeScript지원을 받을 수 있게 해주는 써드파티 라이브러리

### Action Type 선언

- `as const`는 `const assertions`이라는 TypeScript 문법,
  이 문법을 사용하면 우리가 추후 액션 생성함수를 통해 액션 객체를 만들게 됐을 때
  type의 TypeScript 타입이 `string`이 되지 않고 실제값을 가르키게 된다

```typescript
const str = 'hello world';
const strAsConst = 'hello world' as const;

const obj = {
  str, // str: string
};

const obj2 = {
  strAsConst, // str: 'hello world'
};
```

- ReturnType : 함수에서 반환하는 타입을 가져올 수 있게 해주는 유틸 타입

### Reducer

- `RootReducer`를 만들 때에는 일반 Javascript환경과는 달리 `RootState`라는 타입을 만들어서 내보내주어야 한다.
  이 타입은 나중에 컨테이너 컴포넌트를 만들게 될 때 스토어에서 관리하고 있는 상태를 조회하기 위해서 `useSelector`를 사용 할 때 필요로 한다.

```typescript
import { combineReducers } from 'redux';
import counter from './counter';

const rootReducer = combineReducers({
  counter,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
```

### ContainerComponent

- 컨테이너 컴포넌트를 작성 할 때 state의 타입을 `useSelector`에서 `RootState`로 지정해서 사용한다.

### Presentaitional / Container 컴포넌트 분리를 하지 않는다면

> Hooks를 사용하여 컴포넌트를 분리하지 않아도 똑같은() 작업을 할 수 있다.

- 컴포넌트를 사용 할 때 props로 필요한 값을 받아와서 사용하게 하지 말고, `useSelector`와 `useDispatch`로 이루어진 커스텀 `Hook`을 만들어서 사용 할 수 있다.

  Container 컴포넌트에서 리덕스와 연동하는 작업이 Hook으로 구현.

- Hooks가 존재하기 전에는, 컨테이너 컴포넌트를 만들 때 `connect()` 함수를 통하여 HOC패턴을 통하여
  컴포넌트와 리덕스를 연동해주었기 때문에 props로 필요한 값들을 전달해주는 것이 필수 였었지만, 이제는 그렇지 않다.
  이렇게 Hooks를 통하여 로직을 분리하는것도 정말 괜찮은 패턴이니 새로 작성하는 컴포넌트부터 이렇게 커스텀 Hooks를 작성하는 방식으로 시도를 하는 것도 정말 좋은 방법이라고 생각합니다.

### typesafe-actions로 리덕스 모듈 리팩토링

- 액션과 리듀서를 준비하는 작업을 편하게 할 수 있는 라이브러리

- 리덕스 모듈이 너무 커질 것 같으면 여러 파일로 분리해서 작성하자,
  단 한 디렉터리에서 정리해서 관리

```
modules/        <- redux관련 root 파일
  todos/
    actions.ts
    index.ts
    reducer.ts
    types.td
  counter.ts
```
