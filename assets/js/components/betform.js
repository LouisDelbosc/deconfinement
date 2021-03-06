import React from "react";
import useDateState from "@state/useState";
import { useForm } from "react-hook-form";

const submitBet = (data, getHasVoted) => {
  if (!getHasVoted()) {
    return Promise.reject({ date: "Tu as deja vote! Tricheur!" });
  }
  return fetch(`${_baseURL}/api/bets`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((response) => {
    if (!response.ok) {
      return response.json().then((res) => Promise.reject(res.errors));
    }
    return response;
  });
};

export function BetForm({ onSuccess }) {
  const { register, handleSubmit, errors, setError } = useForm();
  const { setVotedDate, canVote } = useDateState();
  const inputColor =
    errors && errors.date
      ? "border-red-500 hover:border-red-700"
      : "border-indigo-500 hover:border-indigo-700";
  const inputClassName =
    "shadow appearance-none border-2 rounded-md w-4/6 py-2 px-3 sm:mr-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline " +
    inputColor;
  const onSubmit = (data) =>
    submitBet(data, canVote).then(
      () => {
        setVotedDate(data.date);
        onSuccess(data.date);
      },
      (err) => setError("date", { message: err.date })
    );
  return (
    <div className="h-screen">
      <div className="flex p-12 h-full items-center justify-center">
        <div>
          <h1 className="font-bold leading-tight mb-2 text-4xl text-gray-900">
            Quand est-ce qu'on sera libre ?
          </h1>
          <p className="text-gray-600 mb-2">
            Des centaines de personnes ont parié sur la date de fin du confinement. Participe, toi
            aussi, et découvre leurs votes!
          </p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input type="date" className={inputClassName} name="date" ref={register} />
            <input
              className="border-2 border-indigo-700 bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-full sm:w-24 outline-none"
              type="submit"
              value="Voter"
            />
          </form>
          {errors.date && <span className="text-red-600 text-sm ml-1">{errors.date.message}</span>}
        </div>
      </div>
      <div
        style={{ zIndex: "-1" }}
        className="absolute top-0 left-0 width-auto height-auto overflow-hidden"
      >
        <div
          style={{ top: "-10px", left: "-20px" }}
          className="relative rounded-full w-56 h-56 bg-pink-400"
        />
      </div>
      <div
        style={{ zIndex: "-1" }}
        className="absolute bottom-0 right-0 width-auto height-auto overflow-hidden"
      >
        <div
          style={{
            bottom: "-50px",
            right: "-100px",
            width: "325px",
            height: "325px",
          }}
          className="relative rounded-full bg-purple-600"
        />
      </div>
      <div
        style={{ zIndex: "-1", bottom: "20%", left: "10%" }}
        className="absolute width-auto height-auto overflow-hidden"
      >
        <div className="relative rounded-full bottom-0 bg-green-400 left-0 w-32 h-32" />
      </div>
    </div>
  );
}
