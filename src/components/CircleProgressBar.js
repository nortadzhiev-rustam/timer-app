import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPause,
  faPlay,
  faStop,
  faHistory,
} from '@fortawesome/free-solid-svg-icons';

const CircleProgressBar = (props) => {
  const {
    timer,
    isProgress,
    isReset,
    initialHours,
    initialMinutes,
    onPause,
    stop,
    reset,
  } = props;
  const [seconds, setSeconds] = React.useState(0);
  const [minutes, setMinutes] = React.useState(initialMinutes);
  const [hours, setHours] = React.useState(initialHours);
  const [runningSeconds, setRunningSeconds] = React.useState(0);
  const [isPaused, setIsPaused] = React.useState(false);

  React.useEffect(() => {
    if (!isReset) {
      setSeconds(timer * 60);
    } else {
      setSeconds(0);
    }
  }, [isReset, timer]);

  React.useEffect(() => {
    const interval = setInterval(() => {
      if (seconds !== 0) {
        if (!isPaused) {
          setSeconds(seconds - 1);
        } else {
          clearInterval(interval);
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isPaused, seconds]);

  React.useEffect(() => {
    let myInterval = setInterval(() => {
      if (runningSeconds > 0) {
        if (isPaused === false) {
          setRunningSeconds(runningSeconds - 1);
        } else {
          clearInterval(myInterval);
        }
      }

      if (runningSeconds === 0 && minutes === 0 && hours === 0) {
        let audio = new Audio('assets/audio/glass.mp3');
        audio.play();
        clearInterval(myInterval);
      } else if (runningSeconds === 0 && minutes === 0 && hours !== 0) {
        setHours(hours - 1);
        setMinutes(59);
        setRunningSeconds(59);
      } else if ((hours === 0 && minutes !== 0, runningSeconds === 0)) {
        setMinutes(minutes - 1);
        setRunningSeconds(59);
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  }, [isProgress, runningSeconds, isPaused, minutes, hours]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width:'80%'
      }}
    >



      <CircularProgressbar
        styles={buildStyles({
          
          strokeLinecap: 'butt',
          trailColor: '#ccc',
          textColor: '#fb5607',
          rotation: 1 / 2 + 1 / 8
        })}
        value={(seconds * 100) / (timer * 60)}
        text={`${
          hours > 0 ? `${hours < 10 ? `0${hours}` : `${hours}`}:` : `${''}`
        }${minutes < 10 ? `0${minutes}` : `${minutes}`}:${
          runningSeconds < 10 ? `0${runningSeconds}` : `${runningSeconds}`
        }`}
        strokeWidth={15}
        circleRatio={0.75}
        
        
      />
      <div className='d-inline-flex mt-3'>
        <button
          style={{ width: '50%', marginRight: 10 }}
          className={`btn btn-lg align-items-center justify-content-center ${
            isPaused ? 'btn-outline-success' : 'btn-outline-warning'
          } d-block rounded-circle`}
          onClick={() => {
            setIsPaused(!isPaused);
            onPause(!isPaused);
          }}
        >
          {isPaused ? (
            <FontAwesomeIcon size='sm' icon={faPlay} />
          ) : (
            <FontAwesomeIcon size='sm' icon={faPause} />
          )}
        </button>
        <button
          style={{ width: '50%', marginRight: 10 }}
          className='btn btn-lg btn-outline-danger rounded-circle align-items-center justify-content-center '
          onClick={() => stop()}
        >
          <FontAwesomeIcon size='sm' icon={faStop} />
        </button>
        <button
          style={{ width: '50%', marginRight: 10 }}
          className='btn btn-lg btn-outline-primary rounded-circle align-items-center justify-content-center'
          onClick={() => {
            setIsPaused(true);
            reset();
            setMinutes(0);
            setRunningSeconds(0);
          }}
        >
          <FontAwesomeIcon size='sm' icon={faHistory} />
        </button>
      </div>
    </div>
  );
};

export default CircleProgressBar;
