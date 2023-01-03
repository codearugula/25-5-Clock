import React from "react";

const Timer = ({ isSession, sessionRemaining }) => {
  return (
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
  );
};

export default Timer;
