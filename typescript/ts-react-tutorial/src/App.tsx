import React from 'react';
import logo from './logo.svg';
import './App.css';
import Greetings from './Greetings';
import Counter from './Counter';
import MyForm from './MyForm';
import CounterWithReducer from './CounterWithReducer';
import ReducerEx from './ReducerEx';

const App: React.FC = () => {
  const onClick = (name: string) => {
    console.log(`${name} says hello`);
  };

  const onSubmit = (form: { name: string; description: string }) => {
    console.log(form);
  };

  return (
    <>
      <Greetings name="Hello" onClick={onClick} />
      <Counter />
      <CounterWithReducer />
      <MyForm onSubmit={onSubmit} />
      <ReducerEx />
    </>
  );
};

export default App;
