import React from "react";
import styled from "styled-components";
import { parseISO, getDay, getDaysInMonth } from "date-fns";

const WeekRow = styled.div`
  display: flex;
  flex-direction: row;
`;
const Day = styled.div`
  font-size: 18px;
  text-align: center;
  height: 3rem;
  width: 3rem;
`;

const chunk = (arr, size) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
    arr.slice(i * size, i * size + size)
  );

const dayNumber = (weekday, index) => Math.max(index - weekday + 1, 0);

export function HeatMapMonth({ firstDay, data }) {
  const weekDay = (7 + getDay(firstDay) - 1) % 7;
  const daysNumber = getDaysInMonth(firstDay);
  const days = [...Array(42)].reduce((acc, val, index) => {
    const numberOfTheDay = dayNumber(weekDay, index)
    return index - weekDay >= daysNumber ?
           [...acc, {display: 0, count: 0}] :
           [...acc, {
             display: numberOfTheDay,
             count: (data.find(({day}) => day === numberOfTheDay) || {}).count
           }];
  }, []);
  const days2 = chunk(days, 7);
  return (
    <div>
      {days2.map((week, weekIndex) => (
        <WeekRow key={`${weekIndex}-${firstDay}`}>
          {week.map((day, dayIndex) => (
            <Day key={`${day}-${dayIndex}-${weekIndex}-${firstDay}`} title={day.count}>
              {day.display ? day.display : ''}
            </Day>
          ))}
        </WeekRow>
      ))}
    </div>
  );
}
