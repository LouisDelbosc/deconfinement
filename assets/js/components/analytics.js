import React from "react";
import useDateState from "@state/useState";
import CupSvg from "@static/images/cup.svg";
import BirdSvg from "@static/images/bird.svg";
import TeamworkSvg from "@static/images/teamwork.svg";
import { format, isSameDay } from "date-fns";

export function Analytics() {
  const { getState } = useDateState();
  const { dates, averageDate, votedDate, maxVotedDate, maxVote } = getState();
  const countSameDatesAsYou = dates.find((date) => isSameDay(date.date, votedDate))?.count;
  return (
    <div className="flex flex-row flex-wrap w-full">
      <CountSameDatesAsYou
        className="bg-purple-600"
        countSameDatesAsYou={countSameDatesAsYou}
        votedDate={votedDate}
      />
      <MaxVotedDate className="bg-pink-400" maxVotedDate={maxVotedDate} maxVote={maxVote} />
      <EstimatedDate className="bg-green-400" averageDate={averageDate} />
    </div>
  );
}

const blockCls = (cls) => `flex flex-col justify-start
 h-68 w-full lg:w-1/3 lg:h-72 px-8 py-4 ${cls}`;

function CountSameDatesAsYou({ className, countSameDatesAsYou, votedDate }) {
  const date = votedDate && format(votedDate, "dd/MM/yyyy");
  const numberOfVotes = (countSameDatesAsYou || 1) - 1;
  return (
    <div className={blockCls(className)}>
      <div className="flex flex-col items-center mb-8 lg:mb-12">
        <img className="w-16 h-16 mb-2" src={BirdSvg} alt="libre" />
        <h2 className="medal medal--gold">{numberOfVotes}</h2>
      </div>
      <p className="text-lg text-orange-100">
        C'est le nombre de personnes qui, comme toi, pensent que l'on sera de nouveau libre à partir
        du {date}. Avec de la chance (ou pas), tu as vu juste ;)
      </p>
    </div>
  );
}

function MaxVotedDate({ className, maxVotedDate, maxVote }) {
  const date = maxVotedDate && format(maxVotedDate, "dd/MM/yyyy");
  return (
    <div className={blockCls(className)}>
      <div className="flex flex-col items-center mb-8 lg:mb-12">
        <img className="w-16 h-16 mb-2" src={CupSvg} alt="champion" />
        <h2 className="medal medal--gold">{date}</h2>
      </div>
      <p className="text-lg text-orange-100">
        C'est la date qui a reçu le plus de votes. {maxVote} personnes pensent que ça se terminera à
        cette date. Seul l'avenir nous le dira.
      </p>
    </div>
  );
}

function EstimatedDate({ className, averageDate }) {
  const date = averageDate && format(averageDate, "dd/MM/yyyy");
  return (
    <div className={blockCls(className)}>
      <div className="flex flex-col items-center mb-8 lg:mb-12">
        <img className="w-16 h-16 mb-2" src={TeamworkSvg} alt="intelligence collective" />
        <h2 className="medal medal--gold">{date}</h2>
      </div>
      <p className="text-lg text-orange-100">
        Il s'agit de la date moyenne calculée par l'intelligence collective de tout les votants.
        C'est un peu long à expliquer sur ce petit paragraphe donc voici le{" "}
        <a className="text-blue-500" href="https://fr.wikipedia.org/wiki/Intelligence_collective">
          lien wikipedia
        </a>{" "}
        ;)
      </p>
    </div>
  );
}
