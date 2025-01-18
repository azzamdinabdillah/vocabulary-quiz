import { useState } from "react";
import DrawerStats from "../components/drawer/DrawerStats";
import { MainNavbar } from "../components/Navbar";
import QuizForm from "./QuizForm";
import {
  DrawerSettingsContext,
  DrawerStatsContext,
} from "../context/DrawerContext";
import DrawerSettings from "../components/drawer/DrawerSettings";

function Quiz() {
  const [openStatsDrawer, setOpenStatsDrawer] = useState<boolean>(false);
  const [openSettingsDrawer, setOpenSettingsDrawer] = useState<boolean>(false);

  return (
    <DrawerSettingsContext.Provider
      value={{ openSettingsDrawer, setOpenSettingsDrawer }}
    >
      <DrawerStatsContext.Provider
        value={{ openStatsDrawer, setOpenStatsDrawer }}
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
