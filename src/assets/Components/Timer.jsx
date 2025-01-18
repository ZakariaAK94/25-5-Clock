/* eslint-disable react/prop-types */
import { useRef } from "react";

export default function Timer({displayState, interval}) 
{
  const timerRef = useRef(null);

  const formatTime = (time) => {
    const minutes = Math.floor(time / interval);
    const seconds = time % interval;
    
    if (timerRef.current) 
    {      
        minutes === 0 ? timerRef.current.classList.add("red") 
                      :  timerRef.current.classList.remove("red");      
    }

    return `${minutes < 10 ? "0" + minutes.toString() : minutes}:${seconds < 10 ? "0"+ seconds.toString() : seconds}`;
  };
  return (
    <div className="timer" ref={timerRef}>
      <h6 id="timer-label">{displayState.timeType}</h6>
      <div className="timing">
        <span id="time-left">{formatTime(displayState.time)}</span>
      </div>  
    </div>
  )
}