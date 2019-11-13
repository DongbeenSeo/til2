import React, { useState, ChangeEvent, FormEvent } from 'react';
import useAddTodo from '../hooks/useAddTodo';

function TodoInsert() {
  const [value, setValue] = useState('');
  const addTodo = useAddTodo();

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    // TODO: 커스텀 Hook을 사영해서 새 항목 등록
    addTodo(value);
    setValue('');
  };
  return (
    <form onSubmit={onSubmit}>
      <input
        value={value}
        onChange={onChange}
        placeholder="할 일을 입력하세요."
      />
      <button type="submit">등록</button>
    </form>
  );
}

export default TodoInsert;
