
import './App.css';
import {  useEffect,useState } from 'react';
function App() {
  const [stopWatch,setStopWatch]=useState(false);
  const [timeNumber,setTimeNumber]=useState(0);
  const [timeHistory,setTimeHistory]=useState(null)


  useEffect(()=>{
    let interval =null;
    if(stopWatch){
      interval = setInterval(()=>{
        setTimeNumber(previousTime => previousTime+10)
      },10)
    }
    else{
      clearInterval(interval)
    } 
    return ()=> clearInterval(interval)
  },[stopWatch])
  // ==================
  // stop function 
  // ====================
const onStopWatchStoped=()=>{
  setStopWatch(false)
  const currentTime = {
    hour:("0"+ Math.floor((timeNumber / 600000000) % 60)).slice(-2),
    minute:("0"+ Math.floor((timeNumber / 60000) % 60)).slice(-2),
    secound:("0"+ Math.floor((timeNumber / 1000) % 60)).slice(-2),
    MilliSecound:("0"+ ((timeNumber /10)%100)).slice(-2)
  }
  if(timeHistory){
    setTimeHistory([currentTime, ...timeHistory])
  }else{
    setTimeHistory([currentTime])
  }
  setTimeNumber(0)
}
const onResetWatch=()=>{
  setStopWatch(false)
  setTimeNumber(0)
  setTimeHistory(null)
}
// ==========================
// JSX code 
// ============================
  return (
    <div className="App">
      <div className='stop-watch'>
      <div className="watch-view" >
          <span className="number-text">{("0"+ Math.floor((timeNumber / 600000000) % 60)).slice(-2)}:</span>
          <span className="number-text">{("0"+ Math.floor((timeNumber / 60000) % 60)).slice(-2)}:</span>
          <span className="number-text">{("0"+ Math.floor((timeNumber / 1000) % 60)).slice(-2)}:</span>
          <span className="number-text">{("0"+ ((timeNumber /10)%100)).slice(-2)}</span>
      </div>
      <div className="btn-container">
        <button onClick={()=>setStopWatch(true)} className="btn">Start</button>
        <button onClick={()=>setStopWatch(false)} className="btn">Resume</button>
        <button disabled={!stopWatch} onClick={onStopWatchStoped} className="btn">Stop</button>
        <button onClick={onResetWatch} className="btn">Reset</button>
      </div>
      {
        timeHistory?.map((history,index)=> <div className="history-container" history={history} key={index}>
        <div className="history">
          <span>{history?.hour}</span>
          <h6>Hours</h6>
        </div>
        <div className="history">
          <span>{history?.minute}</span>
          <h6>Minutes</h6>
        </div>
        <div className="history">
          <span>{history?.secound}</span>
          <h6>Seconds</h6>
        </div>
        <div className="history">
          <span>{history?.MilliSecound}</span>
          <h6>Milli Secound</h6>
        </div>
      </div>)
      }
      </div> 


    </div>
  );
}

export default App;
