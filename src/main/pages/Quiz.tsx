import { useState } from "react";
import DrawerStats from "../components/drawer/DrawerStats";
import { MainNavbar } from "../components/Navbar";
import QuizForm from "./QuizForm";
import {
  DrawerSettingsContext,
  DrawerStatsContext,
} from "../context/DrawerContext";
import DrawerSettings from "../components/drawer/DrawerSettings";
import { AnsweredIF } from "../interfaces/AnsweredStats";

function Quiz() {
  const [openStatsDrawer, setOpenStatsDrawer] = useState<boolean>(false);
  const [openSettingsDrawer, setOpenSettingsDrawer] = useState<boolean>(false);
  const [onSound, setOnSound] = useState<boolean>(true);
  const [answerStats, setAnswerStats] = useState<AnsweredIF>({
    answered: 0,
    rightAnswered: 0,
    wrongAnswered: 0,
  });

  return (
    <DrawerSettingsContext.Provider
      value={{ openSettingsDrawer, setOpenSettingsDrawer, onSound, setOnSound }}
    >
      <DrawerStatsContext.Provider
        value={{ openStatsDrawer, setOpenStatsDrawer, answerStats, setAnswerStats }}
      >
        <div className="w-full relative">
          <MainNavbar />

          <DrawerStats />

          <DrawerSettings />

          <div className="quiz">
            <QuizForm />
          </div>
        </div>
      </DrawerStatsContext.Provider>
    </DrawerSettingsContext.Provider>
  );
}

export default Quiz;
