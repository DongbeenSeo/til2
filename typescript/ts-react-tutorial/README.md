# TIL(Today I Learned) - 2019/11/06

## TypeScript

### TypeScript Basic

- 환경 준비

```bash
$ mkdir 디렉토리
$ cd 디렉토리
$ npm init -y //package.json 생성

$ npm install -g typescript // 타입스크립트 글로벌 설치
$ tsc --init

$ npx tsc --init // 글로벌 설치 없이 타입스크립트 설정파일 생성
```

> - target: 컴파일된 코드가 어떤 환경에서 실행될 지 정의, 예를 들어 화살표 함수를 사용하고 target을 `es5`로 한다면 일반 `function`키워드를 사용하는 함수로 변환을 해줍니다. 하지만 이를 `es6`로 설정한다면 화살표 함수를 그대로 유지해줍니다.
> - module: 컴파일된 코드가 어떤 모듈 시스템을 사용할지 정의합니다. 예를 들어 이 값을 `common`으로 하면 `export default Sample`을 하게 됐을 때 컴파일 된 코드에서는 `exports.default = helloWorld`로 변환해주지만 이 값을 `es2015`로 하면 `export fault Sample` 을 그대로 유지 하게 됩니다.
> - strict: 모든 타입 체킹 옵션을 활성화한다는 것을 의미
> - esModuleInterop: `commonjs`모듈 형태로 이루어진 파일을 `es2015`모듈 형태로 불러올 수 있게 해줍니다.
> - outDir: 컴파일된 파일들이 저장되는 경로를 지정 할 수 있다.

-

### React Hook & TypeScript

- useState를 사용 할 때에는 useState<string>과 같이 Generics를 사용합니다.
- useState의 Generics는 상황에 따라 생략 할 수도 있는데, 상태가 null인 상황이 발생 할 수 있거나, 배열 또는 까다로운 객체를 다루는 경우 Generics를 명시해야 합니다.
- useReducer를 사용 할 때에는 액션에 대한 타입스크립트 타입들을 모두 준비해서 `|` 문자를 사용하여 결합시켜야 합니다.
- 타입스크립트 환경에서 useReducer를 쓰면 자동완성이 잘되고 타입체킹도 잘 됩니다.
- useRef를 사용 할 땐 Generics로 타입을 정합니다.
- useRef를 사용하여 DOM에 대한 정보를 담을 땐, 초깃값을 null로 설정해야 하고 값을 사용하기 위해서 null체킹도 해주어야 합니다.
