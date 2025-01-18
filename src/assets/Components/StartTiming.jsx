/* eslint-disable react/prop-types */


function StartTiming({startStop, reset, timerRunning}) {
  return (
    <div className="btn-start-reset">
        <button id="start_stop" className="btns" 
                 onClick={startStop}>{!timerRunning ? "Start" : "Pause"}</button>
        <button id="reset" className="btns" onClick={reset}>Reset</button>
    </div>
  )
}

export default StartTiming