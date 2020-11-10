import React from "react";
import useDateState from "@state/useState";
import styled, { css } from "styled-components";
import TextField from "@material-ui/core/TextField";
import { useForm } from "react-hook-form";

const Body = styled.div`
  height: 100vh;
`;

const Block = styled.div`
  position: absolute;
  ${(props) =>
    props.position === "top-left"
      ? "top: 0%; left: 0%;"
      : props.position === "bottom-right"
      ? "bottom: 0%; right: 0%;"
      : ""}
  width: auto;
  height: auto;
  overflow: hidden;
  z-index: -1;
`;

const PinkCircle = styled.div`
  position: relative;
  border-radius: 100%;
  width: 250px;
  height: 250px;
  background-color: #ffa8ab;
  left: -20px;
  top: -10px;
`;

const GreenCircle = styled.div`
  position: relative;
  border-radius: 100%;
  background-color: #25d776;
  width: 150px;
  height: 150px;
  bottom: 0%;
  left: 0%;
`;

const PurpleCircle = styled.div`
  background-color: #6b4ee7;
  position: relative;
  border-radius: 100%;
  bottom: -50px;
  right: -100px;
  width: 350px;
  height: 350px;
`;

const Form = styled.form`
  display: flex;
  align-itemps: stretch;
`;

const Container = styled.div`
  padding: 32px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

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
    <Body>
      <Container>
        <div>
          <h1 style={{ color: "#3F3844", fontWeight: "600" }}>Quand est-ce qu'on sera libre ?</h1>
          <p style={{ color: "#718096" }}>
            Des centaines de personnes ont pariees sur la date de fin du confinement. Participe-toi
            aussi et decouvre ce qu'elles ont votes.
          </p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input type="date" name="date" ref={register} />
            <input type="submit" value="Voter" />
          </form>
        </div>
      </Container>
      <Block position="top-left">
        <PinkCircle />
      </Block>
      <Block position="bottom-right">
        <PurpleCircle />
      </Block>
      <Block style={{ bottom: "20%", left: "10%" }}>
        <GreenCircle />
      </Block>
    </Body>
  );
}
