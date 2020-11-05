import {createSingleton} from '../hooks/useSingleton';
import { parseISO } from 'date-fns';
import { computeAnalytics } from './analytics';

const initialState = {
  rawDates: [],
  dates: [],
  averageDate: null,
  maxVotedDate: null,
};

const [getState, updateState] = createSingleton(initialState);

// TODO: mettre les bounds dans les dates
export default function useState() {

  const updateRawDates = (newRawDates) => {
    const parsedDates = ( newRawDates || []).map(({ date, ...other }) => {
      const parsedDate = parseISO(date);
      return {date: parsedDate, day: parsedDate.getDate(), ...other};
    });

    const {averageDate, maxVotedDate} = computeAnalytics(parsedDates);

    updateState({
      rawDates: newRawDates,
      dates: parsedDates,
      averageDate,
      maxVotedDate,
    });

  };

  return {getState, updateRawDates, updateState};
}
