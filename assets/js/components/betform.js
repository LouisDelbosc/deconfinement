import React from "react";
import useDateState from "@state/useState";
import { useForm } from "react-hook-form";

const URL = "http://localhost:4000/api/bets";

const submitBet = (data) => {
  return fetch("http://localhost:4000/api/bets", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

export function BetForm({ onSuccess }) {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => submitBet(data).then(onSuccess);
  return (
    <div className="h-screen">
      <div className="flex p-12 h-full items-center justify-center">
        <div>
          <h1 className="font-bold leading-tight mb-2 text-4xl text-gray-900">
            Quand est-ce qu'on sera libre ?
          </h1>
          <p className="text-gray-600 mb-2">
            Des centaines de personnes ont pariees sur la date de fin du confinement. Participe-toi
            aussi et decouvre ce qu'elles ont votes.
          </p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              type="date"
              className="shadow appearance-none border-2 border-indigo-500 hover:border-indigo-700 rounded-md w-4/6 py-2 px-3 mr-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="date"
              min="2020-12-01"
              max="2021-12-24"
              ref={register}
            />
            <input
              className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-full w-24"
              type="submit"
              value="Voter"
            />
          </form>
        </div>
      </div>
      <div
        style={{ zIndex: "-1" }}
        className="absolute top-0 left-0 width-auto height-auto overflow-hidden"
      >
        <div
          style={{ backgroundColor: "#ffa8ab", top: "-10px", left: "-20px" }}
          className="relative rounded-full w-56 h-56"
        />
      </div>
      <div
        style={{ zIndex: "-1" }}
        className="absolute bottom-0 right-0 width-auto height-auto overflow-hidden"
      >
        <div
          style={{
            backgroundColor: "#6b4ee7",
            bottom: "-50px",
            right: "-100px",
            width: "325px",
            height: "325px",
          }}
          className="relative rounded-full"
        />
      </div>
      <div
        style={{ zIndex: "-1", bottom: "20%", left: "10%" }}
        className="absolute width-auto height-auto overflow-hidden"
      >
        <div
          style={{ backgroundColor: "#25d776" }}
          className="relative rounded-full bottom-0 left-0 w-32 h-32"
        />
      </div>
    </div>
  );
}
16;
