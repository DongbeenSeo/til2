## React Hooks

Reference https://velog.io/@velopert/react-hooks

> React Hooks는 리액트 v16.8에 새로 도입된 기능, 함수형 컴포넌트에서도 상태 관리를 할 수 있는 useState,
> 렌더링 직후 작업을 설정하는 useEffect 등의 기능들을 제공하여 기존의 함수형 컴포넌트에서 할 수 없던 다양한 작업을 할 수 있게 해준다.

### 1. useState

useState는 가장 기본적인 Hook으로서, 함수형 컴포넌트에서도 가변적인 상태를 지니고 있을 수 있게 해준다.
함수형컴포넌트에서 상태를 관리해야 되는 일이 발생한다면 useState를 사용

```jsx
const [value, setValue] = useState(0); // 배열의 비구조화 할당 문법

// ex 비구조화 할당
const arr = ["dog", "cat", "sheep"];
const [first, second] = arr;

console.log(first, second);
```

useState 파라미터에는 상태의 기본값을 세팅, 함수의 반환값으로는 배열을 반환,
배열의 첫번째 원소는 상태 값`(value)`이고, 두번째 원소는 상태를 설정하는 함수`(setValue)`
useState에 파라미터를 넣어서 호출하게 되면 전달받은 파라미터로 값이 바뀌게 되고 컴포넌트는 정상적으로 리렌더링이 된다.
useState 함수는 하나의 상태값만 관리를 할 수 있기 때문에 관리해야 할 상태가 여러 개라면 useState를 어러번 사용해야 한다.

### 2. useEffect

useEffect는 리액트 컴포넌트가 렌더링 될 때마다 특정 작업을 수행하도록 설정 할 수 있는 Hook
클래스형 컴포넌트의 componentDidMount와 componentDidUpdate를 합친 형태

- 2.1. 마운트 될 때만 실행하고 싶을 때
  useEffect에서 설정한 함수가 컴포넌트에서 화면에 가장 처음 렌더링 될 때만 실행되고 업데이트 할 경우에는 실행 할 필요가 없는 경우엔 함수의 두번째 파라미터로 비어 있는 배열을 넣어주면 된다.

- 2.2. 특정 값이 업데이트 될 때만 실행하고 싶을 때
  useEffect의 두번째 파라미터로 전달되는 배열 안에 검사하고 싶은 값을 넣어주면 된다.
  배열 안에는 useState를 통해 관리하고 있는 상태를 넣어줘도 되고, props로 전달받은 값을 넣어줘도 된다.

```jsx
useEffect(() => {
  console.log(name);
}, [name]);
```

useEffect는 기본적으로 렌더링 되고난 직후마다 실행되며, 두번째 파라미터 배열에 무엇을 넣느냐에 따라 실행되는 조건이 달라진다.
만약 컴포넌트가 언마운트되기 전이나, 업데이트 되기 직전에 어떤 작업을 수행하고 싶다면
useEffect에서 뒷정리`(cleanUp)`함수를 반환해주어야 한다.

```jsx
useEffect(() => {
  console.log("effect");
  console.log(name);
  return () => {
    console.log("cleanup");
    console.log(name);
  };
});
```

### 3. useReducer

useReducer는 useState보다 컴포넌트에서 더 다양한 상황에 따라 다양한 상태를 다른 값으로 업데이트해주고 싶을 때 사용하는 Hook
리듀서는 현재 상태와, 업데이트를 위해 필요한 정보를 담은 액션값을 전달 받아 새로운 상태를 반환하는 함수.
리듀서 함수에서 새로운 상태를 만들 때는 꼭 불변성을 지켜주어야 한다.

```jsx
function reducer(state,action){
  return { ... }  // 불변성을 지키면서 업데이트한 새로운 상태를 반환
}
```

- Redux에서는 액션 객체에 어떤 액션인지 알려주는 type필드가 곡 있어야 하지만, useReducer에서 사용하는 액션 객체는 꼭 type을 지니고 있을 필요가 없다.
  심지어 객체가 아니라 문자열이나, 숫자여도 상관 없다.
- useReducer의 첫번째 파라미터는 리듀서 함수, 두번째 파라미터는 해당 리듀서의 기본 값을 넣어준다. useReducer를 사용 했을 때에는 state값과 dispatch함수를 받아오는데, state는 현재 가르키고 있는 상태고, dispatch는 액션을 발생시키는 함수이다.
  `dispatch(action)`와 같은 형태로 함수 안에 파라미터로 액션 값을 넣어주면 리듀서 함수가 호출

- useReducer를 사용했을 때 가장 큰 장점은 컴포넌트 업데이트 로직을 컴포넌트 바깥으로 빼낼 수 있다.

### 4. useMemo

useMemo를 사용하면 함수형 컴포넌트 내부에서 발생하는 연산을 최적화 할 수 있다.
