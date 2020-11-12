import React from "react";
import useDateState from "@state/useState";
import CupSvg from '@static/images/cup.svg';
import BirdSvg from '@static/images/bird.svg';
import TeamworkSvg from '@static/images/teamwork.svg';
import { format, isSameDay } from "date-fns";

export function Analytics() {
  const { getState } = useDateState();
  const { dates, averageDate, votedDate, maxVotedDate, maxVote } = getState();
  const countSameDatesAsYou = dates.find((date) => isSameDay(date.date, votedDate))?.count;
  return (
    <div className="flex flex-row flex-wrap w-full">
      <CountSameDatesAsYou className="bg-purple-600" countSameDatesAsYou={countSameDatesAsYou} votedDate={votedDate} />
      <MaxVotedDate className="bg-pink-400" maxVotedDate={maxVotedDate} />
      <EstimatedDate className="bg-green-400" averageDate={averageDate} />
    </div>
  );
}

const blockCls = (cls) => `flex flex-col justify-between
 h-screen/2 w-full lg:w-1/3 px-8 py-4 ${cls}`;

function CountSameDatesAsYou({ className, countSameDatesAsYou, votedDate }) {
  return (
    <div className={blockCls(className)}>
      <div className="flex flex-col items-center">
        <img className="w-16 h-16 mb-2" src={BirdSvg} alt="libre" />
        <h2 className="medal medal--gold">
          {(countSameDatesAsYou || 1) - 1}
        </h2>
      </div>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ut libero ipsum. Maecenas diam
        nulla, tincidunt id ante sed, aliquam venenatis purus. Cras mattis enim orci, nec vulputate
        eros viverra non. Quisque id lacus rhoncus enim feugiat.
      </p>
    </div>
  );
}

function MaxVotedDate({ className, maxVotedDate }) {
  const date = maxVotedDate && format(maxVotedDate, "dd/MM/yyyy")
  return (
      <div className={blockCls(className)}>
      <div className="flex flex-col items-center">
        <img className="w-16 h-16 mb-2" src={CupSvg} alt="champion" />
        <h2 className="medal medal--gold">{date}</h2>
      </div>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ut libero ipsum. Maecenas diam
        nulla, tincidunt id ante sed, aliquam venenatis purus. Cras mattis enim orci, nec vulputate
        eros viverra non. Quisque id lacus rhoncus enim feugiat.
      </p>
    </div>
  );
}

function EstimatedDate({ className, averageDate }) {
  const date = averageDate && format(averageDate, "dd/MM/yyyy")
  return (
      <div className={blockCls(className)}>
      <div className="flex flex-col items-center">
        <img className="w-16 h-16 mb-2" src={TeamworkSvg} alt="intelligence collective" />
        <h2 className="medal medal--gold">{date}</h2>
      </div>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ut libero ipsum. Maecenas diam
        nulla, tincidunt id ante sed, aliquam venenatis purus. Cras mattis enim orci, nec vulputate
        eros viverra non. Quisque id lacus rhoncus enim feugiat.
      </p>
    </div>
  )
}
