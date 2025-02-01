import { useContext } from "react";
import { DrawerStatsContext } from "../context/DrawerContext";
import Button from "./Button";

export default function ButtonNextPrevQuestion() {
  const drawerStatsContext = useContext(DrawerStatsContext);
  return (
    <div className=" absolute bottom-8 left-1/2 -translate-x-1/2 right-0 w-full px-8">
      <div className="button flex gap-5 w-full">
        <Button
          className={`${
            (drawerStatsContext?.activeQuestion ?? 0) > 0 ? "" : "opacity-70"
          }`}
          onClick={() => {
            if ((drawerStatsContext?.activeQuestion ?? 0) > 0) {
              drawerStatsContext?.setActiveQuestion(
                (prevState) => prevState - 1
              );
            }
          }}
          colorVariant="green"
          sizeVariant="regular"
        >
          Prev
        </Button>
        <Button
          className={`${
            (drawerStatsContext?.activeQuestion ?? 0) >= 0 &&
            (drawerStatsContext?.activeQuestion ?? 0) <
              (drawerStatsContext?.quizes.length ?? 0) - 1
              ? ""
              : "opacity-70"
          }`}
          onClick={() => {
            if (
              (drawerStatsContext?.activeQuestion ?? 0) >= 0 &&
              (drawerStatsContext?.activeQuestion ?? 0) <
                (drawerStatsContext?.quizes.length ?? 0) - 1
            ) {
              drawerStatsContext?.setActiveQuestion(
                (prevState) => prevState + 1
              );
            }
          }}
          colorVariant="blue"
          sizeVariant="regular"
        >
          Next
        </Button>
      </div>
    </div>
  );
}
