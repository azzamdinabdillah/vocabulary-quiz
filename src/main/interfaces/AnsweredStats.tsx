export interface AnsweredIF {
  answered: number;
  rightAnswered: number;
  wrongAnswered: number;
}

export interface AnswerStatsIF {
  id: string;
  isSelected: string;
  isAnswered: boolean;
  answer: string;
  isCorrect: boolean;
  optionSelectedIndex: number;
}
