import React, { useState } from "react";

export default function App() {
  const [count, setCount] = useState(0);
  return (
    <>
      <h1>Count: {count}</h1>
      <button onClick={() => setCount((c) => c + 1)}>Increase!</button>
    </>
  );
}
