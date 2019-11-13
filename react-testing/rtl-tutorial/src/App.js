import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Profile from "./Profile";
import Counter from "./Counter";

function App() {
  return (
    <div className="App">
      <Profile usename="dongbeen" name="서동빈" />
      <Counter />
    </div>
  );
}

export default App;
