import { useContext } from "react";
import { DrawerStatsContext } from "../../context/DrawerContext";
import { CloseIconNavbar } from "../Navbar";

function DrawerStats() {
  const drawerStatsContext = useContext(DrawerStatsContext);
  return (
    <div
      className={`drawer-parent-style ${
        drawerStatsContext?.openStatsDrawer
          ? "translate-x-[0%]"
          : "translate-x-full"
      }`}
    >
      <CloseIconNavbar />
      <div className="quiz">
        <h1 className="title">Stats</h1>

        <div className="flex flex-col gap-1 border-bottom-black pb-4 drawer-h3">
          <div className="flex justify-between items-center">
            <h3>Answered:</h3>
            <p className="drawer-p">
              {drawerStatsContext?.answerStats.answered}
            </p>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center gap-1">
              <img src="/icons/check.svg" alt="" />
              <h3>Right answers:</h3>
            </div>
            <p className="drawer-p">
              {drawerStatsContext?.answerStats.rightAnswered}
            </p>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-1">
              <img src="/icons/x.svg" alt="" />
              <h3>Wrong answers:</h3>
            </div>
            <p className="drawer-p">
              {drawerStatsContext?.answerStats.wrongAnswered}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DrawerStats;
