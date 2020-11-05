import { createSingleton } from "../hooks/useSingleton";
import { parseISO } from "date-fns";
import { computeAnalytics } from "./analytics";
import { getHeatColor } from "./colors";

const initialState = {
  rawDates: [],
  dates: [],
  averageDate: null,
  maxVotedDate: null,
  maxVote: 0,
};

const [getState, updateState] = createSingleton(initialState);

export default function useState() {
  const updateRawDates = (newRawDates) => {
    const parsedDates = (newRawDates || []).map(({ date, ...other }) => {
      const parsedDate = parseISO(date);
      return { date: parsedDate, day: parsedDate.getDate(), ...other };
    });

    const { averageDate, maxVotedDate } = computeAnalytics(parsedDates);

    const dates = parsedDates.map((date) => ({
      ...date,
      color: getHeatColor(date.count, maxVotedDate.count),
    }));

    updateState({
      rawDates: newRawDates,
      dates,
      maxVotedDate: maxVotedDate.date,
      maxVote: maxVotedDate.count,
      averageDate,
    });
  };

  return { getState, updateRawDates, updateState };
}
