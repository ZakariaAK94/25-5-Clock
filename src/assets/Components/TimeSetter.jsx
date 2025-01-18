/* eslint-disable react/prop-types */
// import React from 'react'

function TimeSetter({type, time,utils, setTime, }) 
{
  const {interval, min, max} = utils;
  const currentElement = (type === "Break" ? "break" : "session");
  return (
    <div className='session-section'>        
        <h3 id={currentElement+"-label"}>{type} Length</h3>
        <div className="orderElement">
        <button id={currentElement+"-decrement"} 
              onClick={()=>(time>min ? setTime(time-interval) : null)}>
           <span className="arrow-down"></span>
        </button>
        <h6 id={currentElement+"-length"}>{time/interval}</h6>
        <button id={currentElement + "-increment"}       
                 onClick={()=>(time<max ? setTime(time+interval) : null)}>
            <span className
            ="arrow-up"></span>
        </button>
        </div>        
    </div>
  )
}

export default TimeSetter