import React from 'react';
import './App.css';
import Counter from './components/Counter';
import TodoInsert from './components/TodoInsert';
import TodoList from './components/TodoList';

const App: React.FC = () => {
  return (
    <>
      <Counter />
      <TodoInsert />
      <TodoList />
    </>
  );
};

export default App;