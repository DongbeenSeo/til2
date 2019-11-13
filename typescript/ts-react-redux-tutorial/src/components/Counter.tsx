import React from 'react';
import useCounter from '../hooks/useCounter';

type CounterProps = {
  count: number;
  onIncrease: () => void;
  onDecrease: () => void;
  onIncreaseBy: (diff: number) => void;
};

// Container Component로 구현

// function Counter({
//   count,
//   onIncrease,
//   onDecrease,
//   onIncreaseBy,
// }: CounterProps) {
//   return (
//     <div>
//       <h1>{count}</h1>
//       <button onClick={onIncrease}>+1</button>
//       <button onClick={onDecrease}>-1</button>
//       <button onClick={() => onIncreaseBy(5)}>+5</button>
//     </div>
//   );
// }

// Container Component에서 리덕스와 연동하는 작업을
// Hook으로 만든 useCounter를 사용

function Counter() {
  const { count, onIncrease, onDecrease, onIncreaseBy } = useCounter();

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={onIncrease}>+1</button>
      <button onClick={onDecrease}>-1</button>
      <button onClick={() => onIncreaseBy(5)}>+5</button>
    </div>
  );
}

export default Counter;
