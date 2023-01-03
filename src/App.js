import React, { useState, useEffect, useRef } from "react";
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
          <div id="app-label" className="pb-1 fs-1 font-monoton">
            25 + 5 Clock
          </div>
          <div className="d-flex flex-row">
            <div className="px-2 mx-3">
              <div className="d-flex justify-content-around">
                <div id="break-label">Break Length</div>
              </div>
              <div className="line-height-med d-flex align-items-center justify-content-between">
                <i
                  id="break-increment"
                  className="fa-solid fa-circle-up container-width-med"
                  onClick={() =>
                    setBreakTime(breakTime === 60 ? 60 : ++breakTime)
                  }
                  disabled={isRunning}
                />
                <div id="break-length" className="">
                  {breakTime}
                </div>
                <i
                  id="break-decrement"
                  className="fa-solid fa-circle-down container-width-med"
                  onClick={() =>
                    setBreakTime(breakTime === 1 ? 1 : --breakTime)
                  }
                  disabled={isRunning}
                />
              </div>
            </div>
            <div className="px-2 mx-3">
              <div className="d-flex justify-content-around">
                <div id="session-label">Session Length</div>
              </div>
              <div className="line-height-med d-flex align-items-center justify-content-between">
                <i
                  id="session-increment"
                  className="fa-solid fa-circle-up container-width-med"
                  onClick={() =>
                    setSessionLength(
                      sessionLength === 60 ? 60 : ++sessionLength
                    )
                  }
                  disabled={isRunning}
                />
                <div id="session-length">{sessionLength}</div>
                <i
                  id="session-decrement"
                  className="fa-solid fa-circle-down container-width-med"
                  onClick={() =>
                    setSessionLength(sessionLength === 1 ? 1 : --sessionLength)
                  }
                  disabled={isRunning}
                />
              </div>
            </div>
          </div>
          <div className="mb-4 mt-3 d-flex fs-1 flex-column align-items-center">
            <div id="timer-label" className="font-dela">
              {isSession ? "Session" : "Break"}
            </div>
            <div id="time-left">
              {Math.floor(sessionRemaining / 60).toLocaleString("en-US", {
                minimumIntegerDigits: 2,
                useGrouping: false,
              })}
              :
              {(sessionRemaining % 60).toLocaleString("en-US", {
                minimumIntegerDigits: 2,
                useGrouping: false,
              })}
            </div>
          </div>

          <div className="w-50 pb-3 d-flex flex-row justify-content-between">
            <i
              id="start_stop"
              className={
                isRunning
                  ? "fs-1 fa-regular fa-circle-pause"
                  : "fs-1 fa-regular fa-circle-play"
              }
              onClick={() => {
                setIsRunning(!isRunning);
              }}
            />
            <i
              id="reset"
              className={
                resetIcon
                  ? "fs-1 fa-solid fa-rotate-left rotate"
                  : "fs-1 fa-solid fa-rotate-left"
              }
              onClick={() => {
                setResetIcon(true);
                setTimeout(setResetIcon, 500);
                playBeep.current.load();
                setBreakTime(5);
                setSessionLength(25);
                setSessionRemaining(sessionLength * 60);
                setIsRunning(false);
                setIsSession(true);
              }}
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
    </div>
  );
}

export default App;
