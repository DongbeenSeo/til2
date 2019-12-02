## Pure Component와 Component의 차이

> ref
> https://velog.io/@lesh/PureComponent%EC%99%80-componentShouldUpdate-9cjz3nh0v1

`React.PureComponent`는 사실 `React.Component`와 비교해서 딱 한가지가 다르다. 그것은 바로 `shouldComponentUpdate`를 어떻게 쓰는가 하는 부분이다.

### React.Component

```jsx
import React, { Component } from "react";

class BlahBlah extends Component {
  state = {
    count: 0
  };
  counter() {
    this.setState({
      count: this.state.count // 주목! 값이 변경되지는 않으나, setState는 써줌!!
    });
  }
  componentDidUpdate() {
    console.log(this.state.count); // 컴포넌트가 업데이트되면 값을 출력시킨다.
  }
  render() {
    return (
      <div>
        {this.state.count}
        <button onClick={this.counter.bind(this)}>counterButton</button>
      </div>
    );
  }
}

export default BlahBlah;
```

`React.Component`는 결론적으로 `shouldComponentUpdate`를 따로 설정해주지 않은 경우, `setState`가 실행되면 state,props의 변경 여부를 신경쓰지 않고 무조건적으로 컴포넌트를 업데이트시켜 `true`를 반환한다.

그렇기 때 문에 위의 코드에서는 count의 값은 변경되지 않았지만, `setState`가 실행되었기 때문에 `componentDidUpdate`가 실행되었다

### React.PureComponent

```jsx
import React, { PureComponent } from "react";

class BlahBlah extends PureComponent {
  state = {
    count: 0
  };
  counter() {
    this.setState({
      count: this.state.count // 주목! 값이 변경되지는 않으나, setState는 써줌!!
    });
  }
  componentDidUpdate() {
    console.log(this.state.count); // 컴포넌트가 업데이트되면 값을 출력시킨다.
  }
  render() {
    return (
      <div>
        {this.state.count}
        <button onClick={this.counter.bind(this)}>counterButton</button>
      </div>
    );
  }
}

export default BlahBlah;
```

`Component`를 `PureComponent`로 변경한 후에는 값이 변경되지 않았으므로, `componentDidUpdate`가 실행되지 않았다.

### 얕은 비교(shallow compare)

`PureComponent` 는 `shouldComponentUpdate`에서 얕은 비교를 통해 업데이트 여부를 결정한다.

얕은 비교란?

- 변수와 문자열에서는 값을 비교한다.
- Object에서는 reference(Object가 위치한 memory값)을 비교한다.

`PureComponent`는 위의 조건으로 현재 state,props와 바뀔 state,props를 비교하여 업데이트 여부를 결정하게 되는 것이다.

### 얕은 복사 & 깊은 복사

> ref) https://helloworldjavascript.net/pages/240-object-in-depth.html

`Object.assign` 정적 메소드는 인수로 받은 객체들의 모든 열거 가능한 속성을 대상 객체에 복사합니다.

```js
const obj = {};
Object.assign(obj, {a: 1}, {b: 2});

console.log(obj); // { a: 1, b: 2 }

----------------------------------------------------------
const obj = {
  a: 1,
  b: 2
};

// 빈 객체를 대상으로 `Object.assign`을 사용하면, 객체를 간단히 복제할 수 있습니다.
const obj2 = Object.assign({}, obj);
console.log(obj2); // { a: 1, b: 2 }
```

여기서 주의해야 할 점은 객체가 중첩되어 있다면, 내부에 잇는 개체는 복제되지 않는다. `Object.assign`을 통해 속성과 값이 복사될 대, 실제로 복사되는 것은 중접된 객체가 아니라 그에 대한 참조이기 때문이다.

```js
const obj = {
  innerObj: {
    a: 1,
    b: 2
  }
};

const obj2 = Object.assign({}, obj);

// `innerObj`는 복제되지 않았습니다.
obj.innerObj === obj2.innerObj;
obj.innerObj.a = 3;
obj2.innerObj.a; // 3
```

프로그래밍 분야에서 중첩된 자료구조까지 모두 복사하는 것을 가지고 깊은 복사라고 한다. javascript에는 깊은 복사를 위한 기능이 내장되어 있지 않기 대문에, 직접 구현을 해서 사용해야 한다. 그런데 깊은 복사를 할 때 고려해야 할 것들이 많아서(순환참조, 프로토타입, 열거 불가능한 속성, getter/setter 등) 직접 구현하기는 어렵고, 관련 라이브러리를 사용하는 것을 추천.

비슷한 객체의 복제가 빈번하게 이루어져야 하는 경우에는 [immutable.js](https://immutable-js.github.io/immutable-js/)와 같은 라이브러리의 사용도 고려해야한다.

### 불변성(Immutability)

불변성이란 원시타입의 값 자체의 내용을 변경할 수 없는 성절을 말한다.
`'Javascript의 원시 값은 불변(Immutable)이다.'`라고 한다.

예를 들면, 문자열을 변형하는 메소드는 모두 기존 문자열의 내용을 바꾸는 것이 아니라 새 문자열을 반환한다. 다른 원시 타입의 메소드들도 마찬가지이다.

```js
const str = "JavaScript string is immutable!";

str.replace("!", "?"); // 'JavaScript string is immutable?'
str.slice(0, 10); // 'JavaScript'
str.toUpperCase(); // 'JAVASCRIPT STRING IS IMMUTABLE!'

console.log(str); // JavaScript string is immutable!
```

변수에 저장된 원시 타입의 값을 바구려면, 오직 변수에 다른 값을 대입하는 방법밖에 없다.

원시 타입을 인수로 해서 함수를 호출 할 때에는, 원본이 변경될지도 모른다는 걱정을 할 필요가 없다. 값이 불변일 뿐더러, 애초에 함수 호출 시에는 값이 복사되어서 전달되기 대문에 원본을 변경할 수 있는 방법이 아예 없다.

```js
let str = "JavaScript string is immutable!";

function func(s) {
  // 여기서 무슨 짓을 해도, `str`에 새 값을 대입하지 않는 한 원본을 변경할 수 있는 방법은 없습니다.
}

func(str);
```

객체의 경우를 생각해보면, 객체 자체의 내용을 변경할 수 있는 방법이 얼마든지 많이 있다. 따라서 객체는 가변(mutable)이다.

가변인 값은 어디서 어떻게 변경될지 알 수 없다. 변경되지 말아여 할 객체가 있다면, 정말로 변경되지 않도록 신경서서 코드를 작성해야 한다.
그러나 객체가 변경되지 않았는지를 확인하는 일은 쉽지 않아서, 때때로 **객체의 가변성 때문에 프로그래밍이 어려워지기도 한다.**

객체의 가변성 때문에 어려움을 겪고 있다면, `Object.freeze`의 사용을 고려하거나 [immutable.js](https://immutable-js.github.io/immutable-js/) 같은 라이브러리의 사용을 고려해야한다.
이런 라이브러리들은 객체를 마치 불변인 것처럼 다룰수 있는 방법을 제공한다.

다시 말해, 이 객체들은 메소드를 통해 내용이 조금이라도 변경되면 아예 새로운 객체를 반환한다. 즉, 내용이 달라지면 참조 역시 달라지게 되어 객체의 내용이 변경되었는지를 확인하는 작업이 쉬워진다.

```js
import { List } from "immutable";

// Immutable.js에서 제공하는 `List`는 배열과 유사하지만, 불변인 것처럼 다룰 수 있는 자료구조입니다.
const list = List.of(1, 2, 3);
const newList = list.push(4); // 새 List 인스턴스를 반환합니다.

// 내용이 달라지면, 참조도 달라집니다.
list === newList; // false
```
