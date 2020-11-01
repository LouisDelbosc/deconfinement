import React, { useState } from "react";
import {useForm} from "react-hook-form"

export default function App() {
  const [count, setCount] = useState(0);
  const {register, handleSubmit} = useForm()
  const onSubmit = data => fetch("http://localhost:4000/api/bets", {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
  }).then((res) => res.json())
    .then(res => console.log(res))
  return (
    <>
      <h1>Quand est-ce va etre deconfine ?</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="date" name="date" ref={register} />
        <input type="submit" />
      </form>
    </>
  );
}
