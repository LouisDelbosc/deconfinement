import React from "react";
import useDateState from "@state/useState";
import { format } from "date-fns";

export function Analytics() {
  const { getState } = useDateState();
  const { averageDate, maxVotedDate, maxVote } = getState();
  return (
    <>
      {averageDate && <div>La date estime est {format(averageDate, "dd/MM/yyyy")}</div>}
      {maxVotedDate && (
        <div>
          Le jour le plus vote est {format(maxVotedDate, "dd/MM/yyyy")} avec {maxVote} votes.
        </div>
      )}
    </>
  );
}
