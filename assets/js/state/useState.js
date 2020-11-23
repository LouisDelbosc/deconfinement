import { createSingleton } from "../hooks/useSingleton";
import { format, parseISO, isSameDay } from "date-fns";
import { computeAnalytics } from "./analytics";
import { getHeatColor } from "./colors";

export const LOCAL_STORAGE_NAME = "deconfinement-selected-date-2";

const localStorageDateDefault = JSON.parse(localStorage.getItem(LOCAL_STORAGE_NAME)) || {selectedDate: null, votedAt: null};

const initialState = {
  rawDates: [],
  dates: [],
  votedDate: null,
  medianDate: null,
  maxVotedDate: null,
  maxVote: 0,
};

const [getState, updateState] = createSingleton({
  ...initialState,
  votedDate: localStorageDateDefault && localStorageDateDefault.selectedDate && parseISO(localStorageDateDefault.selectedDate),
});

export default function useState() {
  const setVotedDate = (dateFromForm) => {
    localStorage.setItem(LOCAL_STORAGE_NAME, JSON.stringify({
      selectedDate: dateFromForm,
      votedAt: format(new Date(), "yyyy-MM-dd"),
    }));
    const parsedDate = parseISO(dateFromForm);
    updateState((state) => ({ ...state, votedDate: parsedDate }));
  };

  const canVote = () => {
    const { selectedDate, votedAt } = JSON.parse(localStorage.getItem(LOCAL_STORAGE_NAME)) || {selectedDate: null, votedAt: null};
    return !votedAt || isSameDay(parseISO(votedAt), new Date());
  };

  const updateRawDates = (newRawDates) => {
    const parsedDates = (newRawDates || []).map(({ date, ...other }) => {
      const parsedDate = parseISO(date);
      return { date: parsedDate, day: parsedDate.getDate(), ...other };
    });

    const { medianDate, maxVotedDate } = computeAnalytics(parsedDates);

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
      medianDate,
    }));
  };

  const clearState = () => {
    localStorage.removeItem(LOCAL_STORAGE_NAME);
    updateState(initialState);
  };

  return { getState, setVotedDate, updateRawDates, updateState, clearState, canVote };
}
