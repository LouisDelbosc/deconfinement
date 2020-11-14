import React, { useEffect } from "react";
import { BetForm } from "./betform";
import useDateState from "@state/useState";
import { App } from "./app";

export default function Root() {
  const { setVotedDate, getState } = useDateState();
  const state = getState()
  const hasVotedDate = Boolean(state.votedDate);
  const handleSuccess = (date) => setVotedDate(date);
  console.log('hasVotedDate', hasVotedDate)
  console.log('state', {state})
  return hasVotedDate ? <App /> : <BetForm onSuccess={handleSuccess} />;
}
