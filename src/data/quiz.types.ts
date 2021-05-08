export type Option = {
  option: string;
  isRight?: boolean;
};
export type Question = {
  question: string;
  options: Option[];
};
export type Quizz = {
  quizName: string;
  questions: Question[];
};
