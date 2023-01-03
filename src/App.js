import React, { useState, useEffect, useRef } from "react";
import Title from "./components/title";
import Controls from "./components/controls";
import Timer from "./components/timer";
import Playback from "./components/playback";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const playBeep = useRef(null);
  let [breakTime, setBreakTime] = useState(5);
  let [sessionLength, setSessionLength] = useState(25);
  let [sessionRemaining, setSessionRemaining] = useState();
  let [isRunning, setIsRunning] = useState(false);
  let [isSession, setIsSession] = useState(true);
  let [resetIcon, setResetIcon] = useState(false);

  useEffect(() => {
    setSessionRemaining(sessionLength * 60);
  }, [sessionLength]);

  useEffect(() => {
    if (isRunning) {
      let i = setInterval(() => {
        if (sessionRemaining === 0) {
          playBeep.current.play();
          setIsSession(!isSession);
          if (isSession) {
            setSessionRemaining(breakTime * 60);
          } else {
            setSessionRemaining(sessionLength * 60);
          }
        } else {
          setSessionRemaining(--sessionRemaining);
        }
      }, 1000);

      return () => {
        clearInterval(i);
      };
    }
  }, [isRunning, sessionRemaining, breakTime, isSession, sessionLength]);

  return (
    <div className="App">
      <div className="container container-fullPage d-flex justify-content-center align-items-center">
        <div className="small-box border border-dark border-5 rounded mx-auto p-2 d-flex flex-column align-items-center">
          <Title />
          <Controls
            setBreakTime={setBreakTime}
            breakTime={breakTime}
            isRunning={isRunning}
            setSessionLength={setSessionLength}
            sessionLength={sessionLength}
          />
          <Timer isSession={isSession} sessionRemaining={sessionRemaining} />
          <Playback
            isRunning={isRunning}
            setIsRunning={setIsRunning}
            resetIcon={resetIcon}
            playBeep={playBeep}
            setResetIcon={setResetIcon}
            setBreakTime={setBreakTime}
            setSessionLength={setSessionLength}
            setSessionRemaining={setSessionRemaining}
            sessionLength={sessionLength}
            setIsSession={setIsSession}
          />
          <audio id="beep" ref={playBeep}>
            <source
              src="https://onlineclock.net/audio/options/default.mp3"
              type="audio/mpeg"
            />
            your browser does not support the audio element
          </audio>
        </div>
      </div>
    </div>
  );
}

export default App;
