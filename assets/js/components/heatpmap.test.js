import { buildCalendarData } from "./heatmap.js";
import { NEUTRAL } from "@state/colors";

test("buildCalendarData for november 2020", () => {
  const weekDay = 6; // Sunday
  const daysInMonth = 30;
  const expectedSimplifiedResult = [
    [0, 0, 0, 0, 0, 0, 1],
    [2, 3, 4, 5, 6, 7, 8],
    [9, 10, 11, 12, 13, 14, 15],
    [16, 17, 18, 19, 20, 21, 22],
    [23, 24, 25, 26, 27, 28, 29],
    [30, 0, 0, 0, 0, 0, 0],
  ];
  const results = buildCalendarData(weekDay, daysInMonth, []);
  expect(results.map((week) => week.map((day) => day.display))).toEqual(expectedSimplifiedResult);
});

test("buildCalendarData for november 2020 should have day data", () => {
  const weekDay = 6; // Sunday
  const daysInMonth = 30;
  const data = [
    { date: new Date(2020, 10, 15), count: 2, day: 15, color: "color day 15" },
    { date: new Date(2020, 10, 3), count: 1, day: 3, color: "color day 3" },
    { date: new Date(2020, 10, 28), count: 3, day: 28, color: "color day 28" },
  ];
  const results = buildCalendarData(weekDay, daysInMonth, data);
  expect(results[0][0]).toEqual({ display: 0, count: 0, color: NEUTRAL });
  expect(results[0][6]).toEqual({ display: 1, count: 0, color: NEUTRAL });
  expect(results[1][1]).toEqual({ display: 3, count: 1, color: "color day 3" });
  expect(results[2][6]).toEqual({ display: 15, count: 2, color: "color day 15" });
  expect(results[4][4]).toEqual({ display: 27, count: 0, color: NEUTRAL });
  expect(results[4][5]).toEqual({ display: 28, count: 3, color: "color day 28" });
});

test("buildCalendarData for feburary 2020 with less weeks", () => {
  const weekDay = 0; // Monday
  const daysInMonth = 28;
  const expectedSimplifiedResult = [
    [1, 2, 3, 4, 5, 6, 7],
    [8, 9, 10, 11, 12, 13, 14],
    [15, 16, 17, 18, 19, 20, 21],
    [22, 23, 24, 25, 26, 27, 28],
  ];
  const results = buildCalendarData(weekDay, daysInMonth, []);
  expect(results.map((week) => week.map((day) => day.display))).toEqual(expectedSimplifiedResult);
});
