import React from "react";

const Controls = ({
  setBreakTime,
  breakTime,
  isRunning,
  setSessionLength,
  sessionLength,
}) => {
  return (
    <div className="d-flex flex-row">
      <div className="px-2 mx-3">
        <div className="d-flex justify-content-around">
          <div id="break-label">Break Length</div>
        </div>
        <div className="line-height-med d-flex align-items-center justify-content-between">
          <i
            id="break-increment"
            className="fa-solid fa-circle-up container-width-med"
            onClick={() => setBreakTime(breakTime === 60 ? 60 : ++breakTime)}
            disabled={isRunning}
          />
          <div id="break-length" className="">
            {breakTime}
          </div>
          <i
            id="break-decrement"
            className="fa-solid fa-circle-down container-width-med"
            onClick={() => setBreakTime(breakTime === 1 ? 1 : --breakTime)}
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
              setSessionLength(sessionLength === 60 ? 60 : ++sessionLength)
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
  );
};

export default Controls;
