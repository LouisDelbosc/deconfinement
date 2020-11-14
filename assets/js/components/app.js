import React, { useEffect } from "react";
import { HeatMapMonth } from "./heatmap";
import { Analytics } from "./analytics";
import { parseISO, isSameMonth } from "date-fns";
import ArrowBackSvg from "@static/images/arrow-back.svg";

import useDateState from "@state/useState";

const fDecember = parseISO("2020-12-01");
const fJanuary = parseISO("2021-01-01");
const fFebruary = parseISO("2021-02-01");
const fMarch = parseISO("2021-03-01");
const fApril = parseISO("2021-04-01");

export function App() {
  const { getState, updateRawDates, clearState } = useDateState();
  const { dates } = getState();
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`${_baseURL}/api/bets`);
      const json = await res.json();
      updateRawDates(json);
    };
    fetchData();
  }, []);

  const heatmapData = [
    ["Decembre", fDecember, dates.filter(({ date }) => isSameMonth(fDecember, date))],
    ["Janvier", fJanuary, dates.filter(({ date }) => isSameMonth(fJanuary, date))],
    ["Fevrier", fFebruary, dates.filter(({ date }) => isSameMonth(fFebruary, date))],
    ["Mars", fMarch, dates.filter(({ date }) => isSameMonth(fMarch, date))],
    ["Avril", fApril, dates.filter(({ date }) => isSameMonth(fApril, date))],
  ];
  return (
    <div className="flex justify-center flex-col items-center">
      <button
        className="fixed z-10 px-4 py-2 top-0 m-2 right-0 bg-red-500 rounded-full"
        onClick={() => (console.log('onclick'), clearState())}
      >
        <img className="w-8 h-8" src={ArrowBackSvg} alt="retour au vote" />
      </button>
      <Analytics />
      <div className="flex flex-row flex-wrap justify-around p-8">
        {heatmapData.map(([label, firstDay, monthData]) => (
          <HeatMapMonth key={label} title={label} firstDay={firstDay} data={monthData} />
        ))}
      </div>
    </div>
  );
}
