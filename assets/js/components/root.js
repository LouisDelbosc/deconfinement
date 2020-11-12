import React, { useState } from "react";
import { BetForm } from "./betform";
import { App } from "./app";

export default function Root() {
  const [hasAnswer, setHasAnswer] = useState(false);
  return !hasAnswer ? <App /> : <BetForm onSuccess={() => setHasAnswer(true)} />;
}
