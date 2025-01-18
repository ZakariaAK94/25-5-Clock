import { useRef, useState, useEffect} from "react"
import TimeSetter from "./assets/Components/TimeSetter";
import Timer from "./assets/Components/Timer";
import StartTiming from "./assets/Components/StartTiming";
import AlarmSound from "./assets/AlarmSound.mp3";


const defaultBreakTime = 5 * 60;
const defaultSessionTime = 25 * 60;
const utils = {
   min : 60,
  max : 60 * 60,
 interval : 60,
};

function App() 
{
  const [breakTime, setBreakTime] = useState(defaultBreakTime);
  const [sessionTime, setSessionTime] = useState(defaultSessionTime);
  const [displayState, setDisplayState] = useState(
    {
      time: sessionTime,
      timeType: "Session",
      timerRunning: false,
    }
  );

  const audioRef = useRef(null);

  useEffect(()=>{

    let timerID;
    if(!displayState.timerRunning) return;
    if(displayState.timerRunning)  
      { timerID = window.setInterval(decrementDisplay, 1000);}

    return () => window.clearInterval(timerID);

  },[displayState.timerRunning]);

  useEffect(()=>{

  if(displayState.time === 0)
  {
    if(audioRef.current)
    {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(error => console.log(error));
    }
    console.log(displayState.timeType);
    setDisplayState(prev =>({
      ...prev,
      time: prev.timeType === "Session" ? breakTime : sessionTime,
      timeType: prev.timeType === "Session" ? "Break" : "Session",      
    }));
  }

 },[displayState, breakTime, sessionTime]);
  
 const reset = ()=>{
  setBreakTime(defaultBreakTime);
  setSessionTime(defaultSessionTime);
  setDisplayState({
    time: defaultSessionTime,
    timeType: "Session",
    timerRunning: false,
  });

    if(audioRef.current)
    {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }  
  
 }

const startStop = () => 
{
   setDisplayState((prev)=>({
    ...prev,
    timerRunning: !prev.timerRunning,
   }))
   
};

const decrementDisplay = () =>{
  setDisplayState(prev =>({
    ...prev,
    time: prev.time -1,
  }))
};

const changeBreakTime = (time)=>{
  if(displayState.timerRunning) return;
  setBreakTime(time);
};

const changeSessionTime = (time) =>{
  if(displayState.timerRunning) return;
  setSessionTime(time);
  setDisplayState({
    time: time,
    timeType: "Session",
    timerRunning: false,
  });
};

  return (
    <>
    <div className="container">
      <h1>25 + 5 Clock</h1>
      <div className="section1">
        <TimeSetter type="Break" 
                    utils={utils}
                    time={breakTime}
                    setTime={changeBreakTime}  />
        <TimeSetter type="Session" 
                    utils={utils}
                    time={sessionTime }
                    setTime={changeSessionTime } />    
      </div>
      <Timer displayState={displayState} interval ={utils.interval}
                />
      <StartTiming startStop={startStop}
                   reset={reset}
                   timerRunning = {displayState.timerRunning} />
      <audio id="beep" src={AlarmSound} ref={audioRef}/>
    </div>
     
    </>
  )
}

export default App
