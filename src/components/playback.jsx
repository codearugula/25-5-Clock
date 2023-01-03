import React from "react";

const Playback = ({
  isRunning,
  setIsRunning,
  resetIcon,
  playBeep,
  setResetIcon,
  setBreakTime,
  setSessionLength,
  setSessionRemaining,
  sessionLength,
  setIsSession,
}) => {
  return (
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
          playBeep.current.load();
          setResetIcon(true);
          setTimeout(setResetIcon, 500);
          setBreakTime(5);
          setSessionLength(25);
          setSessionRemaining(sessionLength * 60);
          setIsRunning(false);
          setIsSession(true);
        }}
      />
    </div>
  );
};

export default Playback;
