import { createSingleton } from "../hooks/useSingleton";
import { parseISO } from "date-fns";
import { computeAnalytics } from "./analytics";
import { getHeatColor } from "./colors";

const LOCAL_STORAGE_NAME = "deconfinement-selected-date";

const localStorageDate = localStorage.getItem(LOCAL_STORAGE_NAME) || null;

const initialState = {
  rawDates: [],
  dates: [],
  votedDate: null,
  averageDate: null,
  maxVotedDate: null,
  maxVote: 0,
};

const [getState, updateState] = createSingleton({
  ...initialState,
  votedDate: localStorageDate && parseISO(localStorageDate),
});

export default function useState() {
  const setVotedDate = (dateFromForm) => {
    localStorage.setItem(LOCAL_STORAGE_NAME, dateFromForm);
    const parsedDate = parseISO(dateFromForm);
    updateState((state) => ({ ...state, votedDate: parsedDate }));
  };

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

    updateState((state) => ({
      ...state,
      rawDates: newRawDates,
      dates,
      maxVotedDate: maxVotedDate.date,
      maxVote: maxVotedDate.count,
      averageDate,
    }));
  };

  const clearState = () => {
    localStorage.removeItem(LOCAL_STORAGE_NAME);
    updateState(initialState);
  };

  return { getState, setVotedDate, updateRawDates, updateState, clearState };
}
