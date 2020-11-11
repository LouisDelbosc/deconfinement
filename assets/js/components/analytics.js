import React from "react";
import useDateState from "@state/useState";
import { format, isSameDay } from "date-fns";

export function Analytics() {
  const { getState } = useDateState();
  const { dates, averageDate, votedDate, maxVotedDate, maxVote } = getState();
  const countSameDatesAsYou = dates.find((date) => isSameDay(date.date, votedDate))?.count;
  return (
    <>
      {countSameDatesAsYou && <div>{countSameDatesAsYou - 1} ont voté comme toi !</div>}
      {averageDate && <div>La date estimée est {format(averageDate, "dd/MM/yyyy")}</div>}
      {maxVotedDate && (
        <div>
          Le jour le plus voté est {format(maxVotedDate, "dd/MM/yyyy")} avec {maxVote} votes.
        </div>
      )}
    </>
  );
}
