import React from "react";
import styled, { css } from "styled-components";
import { NEUTRAL } from "@state/colors";
import { parseISO, getDay, getDaysInMonth } from "date-fns";

const Title = styled.div`
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 8px;
  color: #3f3f3e;
`;

const WeekRow = styled.div`
  display: flex;
  flex-direction: row;
`;

const Day = styled.div`
  font-size: 18px;
  text-align: center;
  height: 3rem;
  width: 3rem;
  ${(props) =>
    props.isDay &&
    `
  cursor: pointer;
  background-color: ${props.color};
  &:hover {
    background-color: #F6E2C0;
    font-size: 20px;
  }`}
`;

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
  const calendarData = buildCalendarData(weekDay, getDaysInMonth(firstDay), data)
  return (
    <div style={{ margin: "8px 16px", textAlign: "center" }}>
      <Title>{title}</Title>
      {calendarData.map((week, weekIndex) => (
        <WeekRow key={`${weekIndex}-${firstDay}`}>
          {week.map((day, dayIndex) => (
            <Day
              key={`${day}-${dayIndex}-${weekIndex}-${firstDay}`}
              data-tooltip={`Votes : ${day.count}`}
              color={day.color}
              isDay={Boolean(day.display)}
            >
              {day.display ? day.display : ""}
            </Day>
          ))}
        </WeekRow>
      ))}
    </div>
  );
}
