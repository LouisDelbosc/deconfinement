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

test("computeAnalytics should return correct averageDate", () => {
  const parsedDates = [
    { date: new Date(2020, 10, 1), count: 3 }, // November 1st 2020
    { date: new Date(2020, 10, 3), count: 1 }, // November 3rd 2020
    { date: new Date(2020, 10, 5), count: 1 }, // November 5th 2020
  ];
  const { averageDate } = computeAnalytics(parsedDates);
  expect(isSameDay(averageDate, new Date(2020, 10, 2))).toBe(true);
});
