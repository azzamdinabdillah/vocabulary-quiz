import { ReactNode, useContext } from "react";
import { CloseIconNavbar } from "../Navbar";
import {
  DrawerSettingsContext,
  DrawerStatsContext,
} from "../../context/DrawerContext";

function Drawer({ children }: { children: ReactNode }) {
  const drawerStatsContext = useContext(DrawerStatsContext);
  const drawerSettingsContext = useContext(DrawerSettingsContext);

  return (
    <div
      className={`absolute z-10 w-full vh-100 bg-[#fff9e4] top-0 bottom-0 translate-x-full transition-transform ease-in-out duration-300 ${
        drawerSettingsContext?.openSettingsDrawer ||
        drawerStatsContext?.openStatsDrawer
          ? "translate-x-[0%]"
          : "translate-x-full"
      }`}
    >
      <CloseIconNavbar />

      {children}
    </div>
  );
}

export default Drawer;
