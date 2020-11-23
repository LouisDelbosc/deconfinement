import { computeAnalytics } from "./analytics";
import { isSameDay } from "date-fns";

test("computeAnalytics should return correct maxVotedDate", () => {
  const parsedDates = [
    { date: new Date(2020, 10, 1), count: 2 }, // November 1st 2020
    { date: new Date(2020, 10, 3), count: 1 }, // November 3rd 2020
    { date: new Date(2020, 10, 4), count: 4 }, // November 4th 2020
  ];
  const { maxVotedDate } = computeAnalytics(parsedDates);
  const { date, count } = maxVotedDate;

  expect(isSameDay(date, new Date(2020, 10, 4))).toBe(true);
  expect(count).toBe(4);
});

test("computeAnalytics should return correct medianDate", () => {
  const parsedDates = [
    { date: new Date(2020, 9, 25), count: 1 }, // October 9th 2020
    { date: new Date(2020, 10, 5), count: 1 }, // November 5th 2020
    { date: new Date(2021, 11, 25), count: 2 }, // December 25th 2021
    { date: new Date(2021, 11, 22), count: 1 }, // December 22nd 2021
    { date: new Date(2020, 10, 1), count: 3 }, // November 1st 2020
    { date: new Date(2020, 10, 3), count: 1 }, // November 3rd 2020
  ];
  const { medianDate } = computeAnalytics(parsedDates);
  expect(isSameDay(medianDate, new Date(2020, 10, 3))).toBe(true);
})
