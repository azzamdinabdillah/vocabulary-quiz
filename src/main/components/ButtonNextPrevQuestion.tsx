import { useContext } from "react";
import { DrawerStatsContext } from "../context/DrawerContext";
import Button from "./Button";

export default function ButtonNextPrevQuestion() {
  const drawerStatsContext = useContext(DrawerStatsContext);
  return (
    <div className="button flex px-8 gap-5 absolute bottom-8 left-1/2 -translate-x-1/2 right-0 w-full">
      <Button
        onClick={() => {
          if ((drawerStatsContext?.activeQuestion ?? 0) > 0) {
            drawerStatsContext?.setActiveQuestion((prevState) => prevState - 1);
          }
        }}
        colorVariant="green"
        sizeVariant="regular"
      >
        Prev
      </Button>
      <Button
        onClick={() => {
          if (
            (drawerStatsContext?.activeQuestion ?? 0) >= 0 &&
            (drawerStatsContext?.activeQuestion ?? 0) <
              (drawerStatsContext?.quizes.length ?? 0) - 1
          ) {
            drawerStatsContext?.setActiveQuestion((prevState) => prevState + 1);
          }
        }}
        colorVariant="blue"
        sizeVariant="regular"
      >
        Next
      </Button>
    </div>
  );
}
