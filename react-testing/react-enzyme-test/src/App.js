import React from 'react';
import logo from './logo.svg';
import './App.css';
import Profile from './Profile';
import Counter from './Counter';
import HookCounter from './HookCounter';

function App() {
  return (
    <>
      <Profile usename="dongbeen" name="서동빈" />
      <Counter />
      <HookCounter />
    </>
  );
}

export default App;
