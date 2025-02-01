import { useState } from "react";
import DrawerStats from "../components/drawer/DrawerStats";
import { MainNavbar } from "../components/Navbar";
import QuizForm from "./QuizForm";
import {
  DrawerSettingsContext,
  DrawerStatsContext,
} from "../context/DrawerContext";
import DrawerSettings from "../components/drawer/DrawerSettings";
import { QuizIF } from "../interfaces/Vocabulary";
import { AnswerStatsIF } from "../interfaces/AnsweredStats";
import ButtonNextPrevQuestion from "../components/ButtonNextPrevQuestion";

function Quiz() {
  const [openStatsDrawer, setOpenStatsDrawer] = useState<boolean>(false);
  const [openSettingsDrawer, setOpenSettingsDrawer] = useState<boolean>(false);
  const [onSound, setOnSound] = useState<boolean>(true);
  const [answerStats, setAnswerStats] = useState<AnswerStatsIF[]>([
    {
      id: "0",
      isSelected: "kursi",
      isAnswered: false,
      answer: "kursi",
      isCorrect: false,
      optionSelectedIndex: -1,
    },
  ]);
  const [activeQuestion, setActiveQuestion] = useState<number>(0);
  const [quizes, setQuizes] = useState<QuizIF[]>([]);

  return (
    <DrawerSettingsContext.Provider
      value={{ openSettingsDrawer, setOpenSettingsDrawer, onSound, setOnSound }}
    >
      <DrawerStatsContext.Provider
        value={{
          openStatsDrawer,
          setOpenStatsDrawer,
          answerStats,
          setAnswerStats,
          quizes,
          setQuizes,
          activeQuestion,
          setActiveQuestion,
        }}
      >
        <div className="w-full relative main-quiz-page">
          <MainNavbar />

          <DrawerStats />

          <DrawerSettings />

          <div className="quiz">
            <QuizForm />
          </div>

          <ButtonNextPrevQuestion />
        </div>
      </DrawerStatsContext.Provider>
    </DrawerSettingsContext.Provider>
  );
}

export default Quiz;
