import { useContext } from "react";
import { DrawerStatsContext } from "../context/DrawerContext";

export default function StatsQuiz() {
  const drawerStatsContext = useContext(DrawerStatsContext);
  const answered = drawerStatsContext?.answerStats.filter(
    (stat) => stat.isAnswered === true
  );
  const rightAnswer = drawerStatsContext?.answerStats.filter(
    (stat) => stat.isCorrect === true
  );
  const wrongAnswer = drawerStatsContext?.answerStats.filter(
    (stat) => stat.isCorrect === false && stat.isAnswered === true
  );
  return (
    <div>
      <h1 className="title">Stats</h1>

      <div className="flex flex-col gap-1 pb-4 drawer-h3">
        <div className="flex justify-between items-center">
          <h3>Answered:</h3>
          <p className="drawer-p">{answered?.length}</p>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1">
            <img src="/icons/check.svg" alt="" />
            <h3>Right answers:</h3>
          </div>
          <p className="drawer-p">{rightAnswer?.length}</p>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1">
            <img src="/icons/x.svg" alt="" />
            <h3>Wrong answers:</h3>
          </div>
          <p className="drawer-p">{wrongAnswer?.length}</p>
        </div>
      </div>
    </div>
  );
}
