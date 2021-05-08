import { Option } from "../data/quiz.types";

export function checkAnswer(selectedOption: Option, currentScore: number) {
  return selectedOption.isRight ? currentScore + 10 : currentScore - 5;
}
