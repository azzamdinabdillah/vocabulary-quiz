import { useContext } from "react";
import { DrawerSettingsContext } from "../../context/DrawerContext";
import { CloseIconNavbar } from "../Navbar";

function DrawerSettings() {
  const drawerSettingsContext = useContext(DrawerSettingsContext);
  return (
    <>
      <div
        className={`drawer-parent-style ${
          drawerSettingsContext?.openSettingsDrawer
            ? "translate-x-[0%]"
            : "translate-x-full"
        }`}
      >
        <CloseIconNavbar />
        <div className="quiz">
          <h1 className="text-primary-black text-[32px] font-extrabold">
            Settings
          </h1>

          <div className="gap-4 flex flex-col drawer-h3 mt-3">
            <div className="flex justify-between items-center">
              <div className="flex gap-1 items-center">
                <img src="/icons/music.svg" alt="" />
                <h3>Music:</h3>
              </div>

              <div className="relative translate-y-1">
                <input type="checkbox" className="input-toggle-switch-style" />
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex gap-1 items-center">
                <img src="/icons/sound.svg" alt="" />
                <h3>Sound:</h3>
              </div>

              <div className="relative translate-y-1">
                <input type="checkbox" className="input-toggle-switch-style" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DrawerSettings;
