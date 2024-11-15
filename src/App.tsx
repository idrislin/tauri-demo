import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import { register } from "@tauri-apps/plugin-global-shortcut";
import "./App.css";
import { getCurrentWindow } from "@tauri-apps/api/window";

function App() {
  const [fullScreen, setFullScreen] = useState(false);
  const [alwaysOnTop, setAlwaysOnTop] = useState(false);

  useEffect(() => {
    register("f1", (ev) => {
      if (ev.state === "Released") {
        console.log("F1 pressed");
        setFullScreen((prev) => !prev);
      }
    });
  }, []);

  useEffect(() => {
    const window = getCurrentWindow();
    if (fullScreen) window.setFullscreen(true);
    else window.setFullscreen(false);
  }, [fullScreen]);

  return (
    <main className="container">
      <div data-tauri-drag-region className="titlebar">
        <div
          className="titlebar-button"
          onClick={async () => {
            await getCurrentWindow().setAlwaysOnTop(!alwaysOnTop);
            setAlwaysOnTop((prev) => !prev);
          }}
        >
          <svg
            focusable="false"
            width={16}
            height={16}
            aria-hidden="true"
            viewBox="0 0 24 24"
          >
            {alwaysOnTop ? (
              <path d="M14 4v5c0 1.12.37 2.16 1 3H9c.65-.86 1-1.9 1-3V4zm3-2H7c-.55 0-1 .45-1 1s.45 1 1 1h1v5c0 1.66-1.34 3-3 3v2h5.97v7l1 1 1-1v-7H19v-2c-1.66 0-3-1.34-3-3V4h1c.55 0 1-.45 1-1s-.45-1-1-1" />
            ) : (
              <path
                fillRule="evenodd"
                d="M16 9V4h1c.55 0 1-.45 1-1s-.45-1-1-1H7c-.55 0-1 .45-1 1s.45 1 1 1h1v5c0 1.66-1.34 3-3 3v2h5.97v7l1 1 1-1v-7H19v-2c-1.66 0-3-1.34-3-3"
              />
            )}
          </svg>
        </div>
        <div
          className="titlebar-button"
          onClick={() => {
            getCurrentWindow().minimize();
          }}
        >
          <img
            src="https://api.iconify.design/mdi:window-minimize.svg"
            alt="minimize"
          />
        </div>
        <div
          className="titlebar-button"
          onClick={() => {
            getCurrentWindow().maximize();
          }}
        >
          <img
            src="https://api.iconify.design/mdi:window-maximize.svg"
            alt="maximize"
          />
        </div>
        <div
          className="titlebar-button"
          onClick={() => {
            getCurrentWindow().close();
          }}
        >
          <img src="https://api.iconify.design/mdi:close.svg" alt="close" />
        </div>
      </div>
      <h1>Welcome to Tauri + React</h1>

      <div className="row">
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo vite" alt="Vite logo" />
        </a>
        <a href="https://tauri.app" target="_blank">
          <img src="/tauri.svg" className="logo tauri" alt="Tauri logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <p>Click on the Tauri, Vite, and React logos to learn more.</p>
    </main>
  );
}

export default App;
