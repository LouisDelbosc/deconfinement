import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { HeatMapMonth } from "./heatmap";
import { parseISO, isSameMonth } from "date-fns";

import useDateState from "@state/useState";
import { useRefresh } from "@hooks/useRefresh";

const fNovember = parseISO("2020-11-01");
const fDecember = parseISO("2020-12-01");
const fJanuary = parseISO("2021-01-01");
const fFebruary = parseISO("2021-02-01");
const fMarch = parseISO("2021-03-01");
const fApril = parseISO("2021-04-01");

const URL = "http://localhost:4000/api/bets";

const submitBet = (data, cb) => {
  fetch("http://localhost:4000/api/bets", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

export default function App() {
  const { getState, updateRawDates } = useDateState();
  const { dates } = getState();
  const [refreshToken, refresh] = useRefresh();
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => submitBet(data).then(refresh);
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("http://localhost:4000/api/bets");
      const json = await res.json();
      updateRawDates(json);
    };
    fetchData();
  }, [refreshToken]);

  const heatmapData = [
    ["Novembre", fNovember, dates.filter(({ date }) => isSameMonth(fNovember, date))],
    ["Decembre", fDecember, dates.filter(({ date }) => isSameMonth(fDecember, date))],
    ["Janvier", fJanuary, dates.filter(({ date }) => isSameMonth(fJanuary, date))],
    ["Fevrier", fFebruary, dates.filter(({ date }) => isSameMonth(fFebruary, date))],
    ["Mars", fMarch, dates.filter(({ date }) => isSameMonth(fMarch, date))],
    ["Avril", fApril, dates.filter(({ date }) => isSameMonth(fApril, date))],
  ];
  return (
    <>
      <h1>Quand est-ce qu'on sera de nouveau libre ?</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="date" name="date" ref={register} />
        <input type="submit" />
      </form>
      <div style={{ display: "flex", flexFlow: "row wrap" }}>
        {heatmapData.map(([label, firstDay, monthData]) => (
          <HeatMapMonth key={label} title={label} firstDay={firstDay} data={monthData} />
        ))}
      </div>
    </>
  );
}
