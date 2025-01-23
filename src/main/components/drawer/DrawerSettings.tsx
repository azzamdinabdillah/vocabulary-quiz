import { useContext, useEffect, useState } from "react";
import { DrawerSettingsContext } from "../../context/DrawerContext";
import { CloseIconNavbar } from "../Navbar";
import Button from "../Button";

function DrawerSettings() {
  const drawerSettingsContext = useContext(DrawerSettingsContext);
  const [playMusic, setPlayMusic] = useState<boolean>(false);

  useEffect(() => {
    let music: HTMLAudioElement | null = null;

    if (playMusic) {
      music = new Audio("/sounds/background-music.mp3");
      music.play();

      const repeatMusic = () => {
        if (music) {
          music.currentTime = 0;
          music.play();
        }
      };

      music.addEventListener("ended", repeatMusic);

      return () => {
        if (music) {
          music.removeEventListener("ended", repeatMusic);
          music.pause();
          music.currentTime = 0;
        }
      };
    }
  }, [playMusic]);

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
          <h1 className="title">
            Settings
          </h1>

          <div className="gap-4 flex flex-col drawer-h3 mt-3">
            <div className="flex justify-between items-center">
              <div className="flex gap-1 items-center">
                <img src="/icons/music.svg" alt="" />
                <h3>Music:</h3>
              </div>

              <div className="relative translate-y-1">
                <input
                  type="checkbox"
                  className="input-toggle-switch-style"
                  name="music-switch"
                  checked={playMusic}
                  onChange={(e) => {
                    setPlayMusic(e.target.checked);
                  }}
                />
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex gap-1 items-center">
                <img src="/icons/sound.svg" alt="" />
                <h3>Sound:</h3>
              </div>

              <div className="relative translate-y-1">
                <input
                  type="checkbox"
                  className="input-toggle-switch-style"
                  name="sound-switch"
                  checked={drawerSettingsContext?.onSound}
                  onChange={(e) => {
                    drawerSettingsContext?.setOnSound(e.target.checked);
                  }}
                />
              </div>
            </div>
          </div>

          <div className="mt-10">
            <Button colorVariant="green">
              <a href="/dashboard">Go To Dashboard Pages</a>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default DrawerSettings;
