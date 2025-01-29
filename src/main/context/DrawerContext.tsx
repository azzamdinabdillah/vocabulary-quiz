import { createContext, Dispatch, SetStateAction } from "react";
import { QuizIF } from "../interfaces/Vocabulary";
import { AnswerStatsIF } from "../interfaces/AnsweredStats";

interface DrawerSettingsIF {
  openSettingsDrawer: boolean;
  setOpenSettingsDrawer: Dispatch<SetStateAction<boolean>>;
  onSound: boolean;
  setOnSound: Dispatch<SetStateAction<boolean>>;
}

interface DrawerStatsIF {
  openStatsDrawer: boolean;
  setOpenStatsDrawer: Dispatch<SetStateAction<boolean>>;
  answerStats: AnswerStatsIF[];
  setAnswerStats: Dispatch<SetStateAction<AnswerStatsIF[]>>;
  quizes: QuizIF[],
  setQuizes: Dispatch<SetStateAction<QuizIF[]>>;
  activeQuestion: number,
  setActiveQuestion: Dispatch<SetStateAction<number>>;
}

const DrawerStatsContext = createContext<DrawerStatsIF | undefined>(undefined);
const DrawerSettingsContext = createContext<DrawerSettingsIF | undefined>(
  undefined
);

export { DrawerStatsContext, DrawerSettingsContext };
