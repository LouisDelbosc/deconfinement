import React, { useEffect } from "react";
import { HeatMapMonth } from "./heatmap";
import { Analytics } from "./analytics";
import { parseISO, isSameMonth } from "date-fns";
import ArrowBackSvg from "@static/images/arrow-back.svg";
import Slider from "./slider";

import useDateState from "@state/useState";

const fDecember = parseISO("2020-12-01");
const fJanuary = parseISO("2021-01-01");
const fFebruary = parseISO("2021-02-01");
const fMarch = parseISO("2021-03-01");
const fApril = parseISO("2021-04-01");
const fMay = parseISO("2021-05-01");
const fJune = parseISO("2021-06-01");
const fJuly = parseISO("2021-07-01");
const fAugust = parseISO("2021-08-01");
const fSeptember = parseISO("2021-09-01");
const fOctober = parseISO("2021-10-01");
const fNovember = parseISO("2021-11-01");
const fDecember21 = parseISO("2021-12-01");

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
    ["Mai", fMay, dates.filter(({ date }) => isSameMonth(fMay, date))],
    ["Juin", fJune, dates.filter(({ date }) => isSameMonth(fJune, date))],
    ["Juillet", fJuly, dates.filter(({ date }) => isSameMonth(fJuly, date))],
    ["Aout", fAugust, dates.filter(({ date }) => isSameMonth(fAugust, date))],
    ["Septembre", fSeptember, dates.filter(({ date }) => isSameMonth(fSeptember, date))],
    ["Octobre", fOctober, dates.filter(({ date }) => isSameMonth(fOctober, date))],
    ["Novembre", fNovember, dates.filter(({ date }) => isSameMonth(fNovember, date))],
    ["Decembre 2021", fDecember21, dates.filter(({ date }) => isSameMonth(fDecember21, date))],
  ];
  return (
    <div className="flex justify-center flex-col items-center">
      <Analytics />
      <div className="h-full w-full">
        <Slider
          options={{
            freeScroll: true,
            pageDots: false,
          }}
        >
          {heatmapData.map(([label, firstDay, monthData]) => (
            <HeatMapMonth
              className="m-2"
              key={label}
              title={label}
              firstDay={firstDay}
              data={monthData}
            />
          ))}
        </Slider>
      </div>
      <button
        className="shadow z-10 px-6 py-4 top-0 mb-4 right-0 bg-red-500 rounded-full"
        onClick={clearState}
      >
        <span className="text-xl font-semibold">Voter de nouveau</span>
      </button>
    </div>
  );
}
