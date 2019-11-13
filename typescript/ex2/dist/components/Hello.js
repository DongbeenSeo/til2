"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
exports.Hello = (props) => (React.createElement("h1", null,
    "Hello from ",
    props.compiler,
    " and ",
    props.framework));
function sumArray(numbers) {
    return numbers.reduce((acc, current) => acc + current, 0);
}
const total = sumArray([1, 2, 3, 4, 5]);
console.log(`total:${total}`);
const items = {
    list: ['a', 'b', 'c'],
};
//클래스에서 Generics 사용하기
class Queue {
    constructor() {
        this.list = [];
    }
    get length() {
        return this.list.length;
    }
    enqueue(item) {
        this.list.push(item);
    }
    dequeue() {
        return this.list.shift();
    }
}
const queue = new Queue();
for (let i = 0; i < 5; i++) {
    queue.enqueue(i);
}
for (let i = 0; i < 5; i++) {
    console.log(queue.dequeue());
}
//# sourceMappingURL=Hello.js.map