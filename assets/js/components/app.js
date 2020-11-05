import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { HeatMapMonth } from "./heatmap";
import { parseISO, isSameMonth } from "date-fns";
import { buildBounds } from "./heatmapcolors";

import useDateState from '@state/useState';
import { useRefresh } from '@hooks/useRefresh';

const fNovember = parseISO("2020-11-01");
const fDecember = parseISO("2020-12-01");
const fJanuary = parseISO("2021-01-01");
const fFebruary = parseISO("2021-01-01");
const fMarch = parseISO("2021-02-01");
const fApril = parseISO("2021-03-01");

function splitDateCountByMonth(dates) {
  return dates
    ? {
        novemberData: dates.filter(({ date }) => isSameMonth(date, fNovember)),
        decemberData: dates.filter(({ date }) => isSameMonth(date, fDecember)),
        januaryData: dates.filter(({ date }) => isSameMonth(date, fJanuary)),
      }
    : {
        novemberData: [],
        decemberData: [],
        januaryData: [],
      };
}

const refresh = () => {};

export default function App() {
  const {getState, updateRawDates} = useDateState();
  const {dates} = getState()
  const [refreshToken, refresh] = useRefresh();
  const {register, handleSubmit} = useForm();
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("http://localhost:4000/api/bets")
      const json = await res.json();
      updateRawDates(json)
    }
    fetchData()
  }, [refreshToken])
  const onSubmit = (data) =>
    fetch("http://localhost:4000/api/bets", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(() => refresh())

  const { novemberData, decemberData, januaryData } = splitDateCountByMonth(dates);
  const getBound = buildBounds(Math.max(...dates.map(({ count }) => count)));
  return (
    <>
      <h1>Quand est-ce qu'on sera de nouveau libre ?</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="date" name="date" ref={register} />
        <input type="submit" />
      </form>
      <div style={{ display: "flex", flexFlow: "row wrap" }}>
        <HeatMapMonth
          title="Novembre"
          firstDay={fNovember}
          data={novemberData}
          getBound={getBound}
        />
        <HeatMapMonth
          title="Decembre"
          firstDay={fDecember}
          data={decemberData}
          getBound={getBound}
        />
        <HeatMapMonth title="Janvier" firstDay={fJanuary} data={januaryData} getBound={getBound} />
        <HeatMapMonth title="Fevrier" firstDay={fFebruary} data={[]} getBound={getBound} />
        <HeatMapMonth title="Mars" firstDay={fMarch} data={[]} getBound={getBound} />
        <HeatMapMonth title="Avril" firstDay={fApril} data={[]} getBound={getBound} />
      </div>
    </>
  );
}
