import { quiz } from "./data/quiz";
import { checkAnswer } from "./utils/helpers";
import Header from "./components/header";
import { useReducer, useState } from "react";
import { Option } from "./data/quiz.types";

type State = {
  currentScore: number;
  questionCounter: number;
  isGameOn: boolean;
};
const initialState: State = {
  currentScore: 0,
  questionCounter: 0,
  isGameOn: false
};
type Action =
  | { type: "CHECK_ANSWER"; payload: Option }
  | { type: "RESET" }
  | { type: "START_GAME" }
  | { type: "INCREMENT_QUESTION" };
function reducer(state: State, action: Action) {
  switch (action.type) {
    case "INCREMENT_QUESTION":
      return { ...state, questionCounter: state.questionCounter + 1 };
    case "CHECK_ANSWER":
      return {
        ...state,
        currentScore: checkAnswer(action.payload, state.currentScore)
      };
    case "START_GAME":
      return { ...state, isGameOn: true };
    case "RESET":
      return { ...initialState };
    default:
      return state;
  }
}

export default function Quiz() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { currentScore, questionCounter, isGameOn } = state;
  const currentQuestion = quiz.questions[questionCounter];
  const handleClick = (option: Option) => {
    dispatch({ type: "CHECK_ANSWER", payload: option });
    dispatch({ type: "INCREMENT_QUESTION" });
  };
  return (
    <>
      <Header username="Prithvi" score={currentScore} />
      {isGameOn ? (
        <div style={{ border: "3px solid black", padding: "10px" }}>
          {currentQuestion ? (
            <>
              <h4>{currentQuestion.question}?</h4>
              <div style={{ display: "flex", flexDirection: "column" }}>
                {currentQuestion.options.map((option) => (
                  <button
                    onClick={() => handleClick(option)}
                    style={{ marginBottom: "10px" }}
                  >
                    {option.option}
                  </button>
                ))}
              </div>
            </>
          ) : (
            <h4>Game Over: Score {currentScore}</h4>
          )}
        </div>
      ) : (
        <button onClick={() => dispatch({ type: "START_GAME" })}>
          Start Game
        </button>
      )}
      <button onClick={() => dispatch({ type: "RESET" })}>Reset Game</button>
    </>
  );
}
