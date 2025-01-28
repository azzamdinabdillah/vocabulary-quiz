import { createContext, Dispatch, SetStateAction } from "react";
import { AnsweredIF } from "../interfaces/AnsweredStats";
import { VocabularyIF } from "../interfaces/Vocabulary";

interface DrawerSettingsIF {
  openSettingsDrawer: boolean;
  setOpenSettingsDrawer: Dispatch<SetStateAction<boolean>>;
  onSound: boolean;
  setOnSound: Dispatch<SetStateAction<boolean>>;
}

interface DrawerStatsIF {
  openStatsDrawer: boolean;
  setOpenStatsDrawer: Dispatch<SetStateAction<boolean>>;
  answerStats: AnsweredIF;
  setAnswerStats: Dispatch<SetStateAction<AnsweredIF>>;
  quizes: VocabularyIF[],
  setQuizes: Dispatch<SetStateAction<VocabularyIF[]>>;
  activeQuestion: number,
  setActiveQuestion: Dispatch<SetStateAction<number>>;
}

const DrawerStatsContext = createContext<DrawerStatsIF | undefined>(undefined);
const DrawerSettingsContext = createContext<DrawerSettingsIF | undefined>(
  undefined
);

export { DrawerStatsContext, DrawerSettingsContext };
