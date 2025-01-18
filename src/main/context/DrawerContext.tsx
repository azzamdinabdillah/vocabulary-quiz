import { createContext } from "react";

const DrawerStatsContext = createContext<
  | {
      openStatsDrawer: boolean;
      setOpenStatsDrawer: Function;
    }
  | undefined
>(undefined);
const DrawerSettingsContext = createContext<
  | {
      openSettingsDrawer: boolean;
      setOpenSettingsDrawer: Function;
    }
  | undefined
>(undefined);

export { DrawerStatsContext, DrawerSettingsContext };
