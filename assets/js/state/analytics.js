const averageDateInitialValue = [0, 0];
export function averageDateReducer([sum, totalCount], {date, count}) {
  return [sum + date.getTime() * count, totalCount + count];
}

const maxVoteDateInitialValue = {date: null, count: 0};
export function maxVotedDateReducer(acc, dateObject) {
  return dateObject.count > acc.count ? dateObject: acc;
}

export function computeAnalytics(parsedDates) {
  const [[totalTimestamp, totalCount], maxVotedDateAcc] = parsedDates.reduce(
    ([averageDateAcc, maxVotedDateAcc], parsedDate) => {
      const newAverageDateAcc = averageDateReducer(averageDateAcc, parsedDate);
      const newMaxVotedDateAcc = maxVotedDateReducer(maxVotedDateAcc, parsedDate);
      return [newAverageDateAcc, newMaxVotedDateAcc];
    }, [averageDateInitialValue, maxVoteDateInitialValue]);

  return {
    averageDate: new Date(totalTimestamp / totalCount),
    maxVotedDate: maxVotedDateAcc,
  };
}
