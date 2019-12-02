### let, const 변수와 블록 스코프

ES2015에서 도입된 `let`, `const`에는 이전의 변수와는 다른 몇 가지 특징이 있다. 먼저 `let`과 `const`는 같은 이름을 갖는 변수의 재선언을 허용하지 않는다.

```js
let foo = 1;
let foo = 2; // Duplicate declaration "foo"
const foo = 3; // Duplicate declaration "foo"

function func(param) {
  let param = 1; // Duplicate declaration "param"
}
```

ES2015이전에는 변수의 재선언이 허용되었지만 가독성을 해치고 유지보수를 어렵게 만든다는 이유 때문에, 제약이 강화된 `let`과 `const`가 도입되었다.

또 한가지 주목해야 할 특징은, `let`과 `const`가 바로 블록스코프를 갖는다는 것이다.

```js
// 블록 안에서 선언된 변수는 외부에서 접근할 수 없습니다.
if (true) {
  let i = 0;
}
console.log(i); // ReferenceError: i is not defined
```

### var 변수와 함수 스코프

ES2015에서 `let`,`const`가 도입되기 전까지는, 모든 변수는 `var`키워드를 통해 선언되었습니다.

```js
var foo = 1;
foo = 2;
```

`var`는 `let`과 유사하게, 값을 다시 대입할 수 있는 변수이다. 그리고 `var`는 함수의 매개변수와 유사하게, **함수 스코프**를 갖는다.
즉, **함수가 아닌 블록에서 정의된 `var`변수는 해당 블록 바깥에서도 유효할 수 있다**

```js
// 아무런 에러도 발생하지 않습니다.
var foo = 1;
var foo = 1;

//함수 스코프
function func() {
  for (var i = 0; i < 10; i++) {
    // ...
  }
  console.log(i); // 10
}

func();
```

### 값을 비교하는 여러 가지 방법

javascript에서는 두 값이 같은지를 비교하기 위해 아래 세 가지 방법을 사용할 수 있습니다.

- `==`, `!=`
- `===`,`!==`
- `Object.is`

여기서 `a != b`는 `!(a == b)`와 항상 같다. `a !== b` 또한 `!(a === b)`와 항상 같다.

### 추상적 동일성(Abstract Equality)

`==` 연산자는 두 피연산자의 타입이 다를 때는 타입을 변환한 후 비교한다. 두 피연산자의 타입이 같다면 `===` 연산자와 같은 방식으로 동작한다.

```js
"1" == 1; // true
true == 1; // true
false == 0; // true
"" == false; // true
```

편해보이지만, 타입을 변환하는 과정에서 의도치 않은 방식으로 동작할 수 있기 때문에, 주의해서 사용해야 한다.

```js
"  \n\t  " == 0; // true
```

다만, **null check를 할 때 만큼은 `==` 연산자가 유용하게 사용된다.** `==` 연산자는 아래와 같은 성질을 갖고 있다.

- `null`과 `undefined` 두 값을 동일 한 것으로 취급. 즉, 결과값이 `true`가 된다.
- `null`과 `undefined`를 이 두 값을 제외한 다른 값과 비교했을 때는 항상 결과값이 `false`가 된다.

```js
null == undefined; // true

null == 0; // false
null == ""; // false
undefined == false; // false
undefined == NaN; // false
```

### 엄격한 동일성 (Strict Equality)

`===`, `!==` 연산자는 두 피연산자의 타입이 다른 경우 무조건 `false`를 반환합니다. 따라서 `==`, `!=` 연산자와는 달리, 서로 다른 타입의 피연산자에 대해서도 안심하고 사용할 수 있습니다.

```js
"1" === 1; // false
true === 1; // false
false === 0; // false
```

다만, number 타입에 대한 비교를 할 때에는 다음과 같이 특이한 동작을 합니다

```js
// `===` 연산에서, `NaN`은 number 타입의 **모든** 값과 다릅니다. 이는 자기 자신에 대해서도 마찬가지입니다.
NaN === NaN; // false

// `0`과 `-0`은 서로 다른 값이지만, `===` 연산은 이 둘을 같은 것으로 취급합니다.
0 === -0; // true
```
