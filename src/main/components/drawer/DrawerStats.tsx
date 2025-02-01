import { useContext } from "react";
import { DrawerStatsContext } from "../../context/DrawerContext";
import { CloseIconNavbar } from "../Navbar";
import StatsQuiz from "../StatsQuiz";

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
        <div className="border-bottom-black">
          <StatsQuiz />
        </div>
        <div className="mt-3">
          <h1 className="title">Questions</h1>

          <div className="grid grid-cols-5 gap-3 flex-wrap mt-2">
            {drawerStatsContext?.quizes.map((quiz, index) => (
              <p
                key={index}
                onClick={() => {
                  drawerStatsContext.setActiveQuestion(index);
                  drawerStatsContext.setOpenStatsDrawer(false);
                }}
                className={`${
                  quiz.isComplete ? "bg-primary-green" : "bg-primary-yellow"
                } button-hover-click select-none border-2 border-black drawer-p px-[10px] py-[7px] shadow-option-shadow font-bold flex justify-center items-center`}
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
