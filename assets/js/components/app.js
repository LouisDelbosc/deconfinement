import React, { useState, useEffect } from "react";
import { HeatMapMonth } from "./heatmap";
import { Analytics } from "./analytics";
import { parseISO, isSameMonth } from "date-fns";
import { BetForm } from "./betform.js";

import useDateState from "@state/useState";
import { useRefresh } from "@hooks/useRefresh";

const fDecember = parseISO("2020-12-01");
const fJanuary = parseISO("2021-01-01");
const fFebruary = parseISO("2021-02-01");
const fMarch = parseISO("2021-03-01");
const fApril = parseISO("2021-04-01");

export function App() {
  const { getState, updateRawDates } = useDateState();
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
      <h1 className="text-3xl font-semibold mb-4 text-gray-900">
        Quand est-ce qu'on sera de nouveau libre ?
      </h1>
      <Analytics />
      <div className="flex flex-row flex-wrap justify-center">
        {heatmapData.map(([label, firstDay, monthData]) => (
          <HeatMapMonth key={label} title={label} firstDay={firstDay} data={monthData} />
        ))}
      </div>
    </div>
  );
}
