import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { HeatMapMonth } from "./heatmap";
import { parseISO, isSameMonth } from "date-fns";

const fNovember = parseISO("2020-11-01");
const fDecember = parseISO("2020-12-01");
const fJanuary = parseISO("2021-01-01");

function useFetchDate() {
  const [dates, setDates] = useState([])
  useEffect(async () => {
    const response = await fetch("http://localhost:4000/api/bets")
    const json = await response.json()
    setDates(json)
  }, [])
  return dates.map(({date, ...other}) => {
    const parsedDate = parseISO(date)
    return {date: parsedDate, day: parsedDate.getDate(), ...other}
  })
}

function splitDateCountByMonth(dates) {
  return dates ? {
    novemberData: dates.filter(({ date }) => isSameMonth(date, fNovember)),
    decemberData: dates.filter(({ date }) => isSameMonth(date, fDecember)),
    januaryData: dates.filter(({ date }) => isSameMonth(date, fJanuary)),
  } : {
    novemberData: [],
    decemberData: [],
    januaryData: [],
  }
}

export default function App() {
  const dates = useFetchDate()
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) =>
    fetch("http://localhost:4000/api/bets", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => console.log(res));

  const {novemberData, decemberData, januaryData} = splitDateCountByMonth(dates);
  return (
    <>
      <h1>Quand est-ce va etre deconfine ?</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="date" name="date" ref={register} />
        <input type="submit" />
      </form>
      {JSON.stringify(dates)}
      <HeatMapMonth firstDay={fNovember} data={novemberData} />
      <HeatMapMonth firstDay={fDecember} data={decemberData} />
      <HeatMapMonth firstDay={fJanuary} data={januaryData} />
    </>
  );
}
