import React from "react";
import styled, { css } from "styled-components";
import { parseISO, getDay, getDaysInMonth } from "date-fns";

const Title = styled.div`
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 8px;
  color: #3F3F3E;
`

const WeekRow = styled.div`
  display: flex;
  flex-direction: row;
`;

const Day = styled.div`
  font-size: 18px;
  text-align: center;
  height: 3rem;
  width: 3rem;
  ${(props) => props.isDay && `
  cursor: pointer;
  background-color: ${props.color};
  &:hover {
    background-color: #F6E2C0;
    font-size: 20px;
  }`
  }
`;

const chunk = (arr, size) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
    arr.slice(i * size, i * size + size)
  );

const dayNumber = (weekday, index) => Math.max(index - weekday + 1, 0);

export function HeatMapMonth({ firstDay, data, title, getBound }) {
  const weekDay = (7 + getDay(firstDay) - 1) % 7;
  const daysNumber = getDaysInMonth(firstDay);
  const rowNumber = Math.ceil((daysNumber + weekDay) / 7)
  const days = [...Array(rowNumber * 7)].reduce((acc, val, index) => {
    const numberOfTheDay = dayNumber(weekDay, index)
    return index - weekDay >= daysNumber ?
           [...acc, {display: 0, count: 0}] :
           [...acc, {
             display: numberOfTheDay,
             count: (data.find(({day}) => day === numberOfTheDay) || {count: 0}).count
           }];
  }, []);
  const days2 = chunk(days, 7)
  return (
    <div style={{ margin: '8px 16px', textAlign: 'center' }}>
      <Title>{title}</Title>
      {days2.map((week, weekIndex) => (
        <WeekRow key={`${weekIndex}-${firstDay}`}>
          {week.map((day, dayIndex) => (
            <Day
              key={`${day}-${dayIndex}-${weekIndex}-${firstDay}`}
              data-tooltip={`Votes : ${day.count}`}
              color={getBound(day.count)}
              isDay={Boolean(day.display)}
            >
              {day.display ? day.display : ''}
            </Day>
          ))}
        </WeekRow>
      ))}
    </div>
  );
}
