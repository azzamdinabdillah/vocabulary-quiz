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
        <div>
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
        <div className="mt-3">
          <h1 className="title">Questions</h1>

          <div className="grid grid-cols-5 gap-3 flex-wrap mt-2">
            {drawerStatsContext?.quizes.map((_, index) => (
              <p
                onClick={() => {
                  drawerStatsContext.setActiveQuestion(index);
                  drawerStatsContext.setOpenStatsDrawer(false);
                }}
                className="bg-primary-green button-hover-click select-none border-2 border-black drawer-p px-[10px] py-[7px] shadow-option-shadow font-bold flex justify-center items-center"
              >
                {index + 1}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DrawerStats;
