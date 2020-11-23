import {compareAsc} from 'date-fns';

const maxVoteDateInitialValue = { date: null, count: 0 };
export function maxVotedDateReducer(acc, dateObject) {
  return dateObject.count > acc.count ? dateObject : acc;
}

export function mediansDate(parsedDates, totalCount) {
  const sortedDate = parsedDates.sort((o1, o2) => compareAsc(o1.date, o2.date));
  const [ date, _ ] = sortedDate.reduce(([medianDate, medianCount], { date, count}) => {
    if (medianCount === 0) return [medianDate, medianCount];
    if (medianCount <= count) return [date, 0];
    return [date, medianCount - count];
  }, [null, totalCount/2]);
  return date;
}

export function computeAnalytics(parsedDates) {
  const [maxVotedDateAcc, totalCount] = parsedDates.reduce(
    ([maxVotedDateAcc, sum], parsedDate) => {
      const newMaxVotedDateAcc = maxVotedDateReducer(maxVotedDateAcc, parsedDate);
      const newSum = sum + parsedDate.count;
      return [newMaxVotedDateAcc, newSum];
    },
    [maxVoteDateInitialValue, 0]
  );

  return {
    medianDate: mediansDate(parsedDates, totalCount),
    maxVotedDate: maxVotedDateAcc,
  };
}
