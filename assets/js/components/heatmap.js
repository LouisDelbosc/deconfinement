import React from "react";
import { NEUTRAL } from "@state/colors";
import { parseISO, getDay, getDaysInMonth } from "date-fns";

export function buildCalendarData(weekDay, daysInMonth, data) {
  const rowNumber = Math.ceil((daysInMonth + weekDay) / 7);
  const days = [...Array(rowNumber * 7)].reduce((acc, val, index) => {
    const dayNumber = Math.max(index - weekDay + 1, 0);

    if (index - weekDay >= daysInMonth) return [...acc, { display: 0, count: 0, color: NEUTRAL }];
    const day = data.find(({ day }) => day === dayNumber);
    return day
      ? [...acc, { display: dayNumber, count: day.count, color: day.color }]
      : [...acc, { display: dayNumber, count: 0, color: NEUTRAL }];
  }, []);
  return chunk(days, 7);
}

const chunk = (arr, size) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
    arr.slice(i * size, i * size + size)
  );

export function HeatMapMonth({ firstDay, data, title }) {
  const weekDay = (7 + getDay(firstDay) - 1) % 7;
  const calendarData = buildCalendarData(weekDay, getDaysInMonth(firstDay), data);
  return (
    <div style={{ margin: "8px 16px", textAlign: "center" }}>
      <h1 className="text-3xl font-semibold mb-4 text-gray-700">{title}</h1>
      {calendarData.map((week, weekIndex) => (
        <div className="flex flex-row" key={`${weekIndex}-${firstDay}`}>
          {week.map((day, dayIndex) => (
            <Day
              key={`${day}-${dayIndex}-${weekIndex}-${firstDay}`}
              data-tooltip={`Votes : ${day.count}`}
              style={{ lineHeight: "3rem", ...(day.display ? { backgroundColor: day.color } : {}) }}
              className="text-xl text-center cursor-default hover:text-2xl hover:bg-orange-200 w-12 h-12"
            >
              {day.display ? day.display : ""}
            </Day>
          ))}
        </div>
      ))}
    </div>
  );
}
