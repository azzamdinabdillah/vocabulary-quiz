import { ReactNode, useContext } from "react";
import {
  DrawerSettingsContext,
  DrawerStatsContext,
} from "../context/DrawerContext";

function Navbar({ children }: { children: ReactNode }) {
  return (
    <div className="py-4 px-[14px] flex justify-between items-center bg-white border-b-4 border-solid border-[#151515] navbar">
      {children}
    </div>
  );
}

function MainNavbar() {
  const drawerStatsContext = useContext(DrawerStatsContext);
  const drawerSettingsContext = useContext(DrawerSettingsContext);

  return (
    <Navbar>
      <img
        src="/icons/menu.svg"
        alt=""
        onClick={() => drawerSettingsContext?.setOpenSettingsDrawer(true)}
      />
      <button
        onClick={() => drawerStatsContext?.setOpenStatsDrawer(true)}
        className="flex button-hover-click gap-[2px] items-center px-5 py-1 border-solid border-4 border-[#594A16] rounded-lg bg-[#F2CA3C] color-[#594A16] text-base font-bold shadow-option-shadow"
      >
        <img src="/icons/stats-button.svg" alt="" />
        Stats
      </button>
    </Navbar>
  );
}

function CloseIconNavbar() {
  const drawerStatsContext = useContext(DrawerStatsContext);
  const drawerSettingsContext = useContext(DrawerSettingsContext);

  return (
    <Navbar>
      <img
        className="cursor-pointer"
        src="/icons/close.svg"
        alt=""
        onClick={() =>
          drawerStatsContext?.setOpenStatsDrawer(false) ||
          drawerSettingsContext?.setOpenSettingsDrawer(false)
        }
      />
    </Navbar>
  );
}

export { MainNavbar, CloseIconNavbar };
