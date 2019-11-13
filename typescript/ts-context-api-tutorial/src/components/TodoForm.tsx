import React, { useState } from 'react';
import { useTodosDispatch } from '../contexts/TodosContext';

function TodoForm() {
  const [value, setValue] = useState('');
  const dispatch = useTodosDispatch();

  const onSubmit = (e: React.FormEvent) => {
    // TODO: 새 항목 생성하기
    e.preventDefault();
    dispatch({
      type: 'CREATE',
      text: value,
    });
    setValue('');
  };
  return (
    <form onSubmit={onSubmit}>
      <input
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder="무엇을 하실 건가요?"
      />
      <button>등록</button>
    </form>
  );
}

export default TodoForm;
