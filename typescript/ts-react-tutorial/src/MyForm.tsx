import React, { useState, useRef } from 'react';

type Todo = { id: number; text: string; done: boolean };

type MyFormProps = {
  onSubmit: (form: { name: string; description: string }) => void;
};

function MyForm({ onSubmit }: MyFormProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [form, setForm] = useState({
    name: '',
    description: '',
  });

  const [todos, setTodos] = useState([] as Todo[]);

  const { name, description } = form;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(form);
    setForm({
      name: '',
      description: '',
    });
    /*
    null checking 필수,특정 값이 유효한지 아닌지 체크
    타입스크립트에서 만약 어떤 타입이 undefined이거나 null일 수 있는 상황에는
    해당 값이 유효한지 체킹하는 작업을 해주어야 자동완성이 이루어지고,
    오류도 사라진다.
    */ 
    if (!inputRef.current) {
      return;
    }
    inputRef.current.focus();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="name"
        value={name}
        onChange={onChange}
        placeholder="name"
        ref={inputRef}
      />
      <input
        name="description"
        value={description}
        onChange={onChange}
        placeholder="description"
      />
      <button type="submit">등록</button>
    </form>
  );
}

export default MyForm;
