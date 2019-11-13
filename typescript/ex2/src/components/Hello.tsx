import * as React from 'react';

export interface HelloProps {
  compiler: string;
  framework: string;
}

export const Hello = (props: HelloProps) => (
  <h1>
    Hello from {props.compiler} and {props.framework}
  </h1>
);

function sumArray(numbers: number[]): number {
  return numbers.reduce((acc, current) => acc + current, 0);
}

const total = sumArray([1, 2, 3, 4, 5]);
console.log(`total:${total}`);

//  interface에서 Generics 사용하기
// interface Items<T>{
//   list :T[];
// }

// const items: Items<string> = {
//   list: ['a','b','c']
// }

//Type alias Generic 사용하기
type Items<T> = {
  list: T[];
};

const items: Items<string> = {
  list: ['a', 'b', 'c'],
};

//클래스에서 Generics 사용하기
class Queue<T> {
  list: T[] = [];
  get length() {
    return this.list.length;
  }

  enqueue(item: T) {
    this.list.push(item);
  }

  dequeue() {
    return this.list.shift();
  }
}

const queue = new Queue<number>();

for (let i = 0; i < 5; i++) {
  queue.enqueue(i);
}

for (let i = 0; i < 5; i++) {
  console.log(queue.dequeue());
}
