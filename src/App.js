/** @format */

import React, { useState } from "react";
import Board from "./Board";
import Winner from "./Winner";
import "./App.css";

function App() {
  const [restart, setRestart] = useState(false);

  const handleRestart = () => {
    setRestart(false);
  };

  return (
    <div className="App">
      <h1>Cell Out!</h1>
      {restart ? <Winner onRestart={handleRestart} /> : <Board />}
    </div>
  );
}

export default App;
