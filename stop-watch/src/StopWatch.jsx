import React, {useState, useEffect, useRef} from 'react'

const StopWatch = () => {

    const [isRunning, setIsRunning] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);
    const startTimeRef = useRef(0);
    const intervalIdRef = useRef(null);
    

    useEffect(() => {

        if(isRunning){
            intervalIdRef.current = setInterval(() => {
                setElapsedTime(Date.now() - startTimeRef.current)
            } , 10)
        }

        return () => {
            clearInterval(intervalIdRef.current);
        }

    }, [isRunning])


    function start(){

        setIsRunning(true)
        startTimeRef.current = Date.now() - elapsedTime;


    }

    function stop(){

        setIsRunning(false)


    }

    function reset(){

        setElapsedTime(0);
        setIsRunning(false);


    }

    function formatTime(){

        let minutes = Math.floor(elapsedTime / (1000 * 60) % 60)
        let seconds = Math.floor(elapsedTime / (1000) % 60)
        let milSeconds = Math.floor((elapsedTime % 1000) / 10)

        if(minutes < 10){
            minutes = `0` + minutes
        }
        if(seconds < 10){
            seconds = `0` + seconds
        }
        if(milSeconds < 10){
            milSeconds = `0` + milSeconds
        }


        return `${minutes}:${seconds}:${milSeconds}`
    }



  return (
    <div className='clock'>
        <div className="display">
            <span>{formatTime()}</span>
        </div>
        <div className="btns">
            <button onClick={start} className='btn start-btn'>Start</button>
            <button onClick={stop} className='btn stop-btn'>Stop</button>
            <button onClick={reset} className='btn reset-btn'>Reset</button>
        </div>
      
    </div>
  )
}

export default StopWatch
