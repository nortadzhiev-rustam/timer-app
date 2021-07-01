import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPause,
  faPlay,
  faStop,
  faHistory,
} from '@fortawesome/free-solid-svg-icons';

const Timer = ({
  initialHours,
  initialMinutes,
  isProgress,
  onPause,
  stop,
  reset,
  todo,
}) => {
  const [minutes, setMinutes] = useState(initialMinutes);
  const [hours, setHours] = useState(initialHours);
  const [seconds, setSeconds] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  useEffect(() => {
    let myInterval = setInterval(() => {
      if (seconds > 0) {
        if (isPaused === false) {
          setSeconds(seconds - 1);
        } else {
          clearInterval(myInterval);
        }
      }

      if (seconds === 0 && minutes === 0 && hours === 0) {
        let audio = new Audio('assets/audio/glass.mp3');
        audio.play();
        clearInterval(myInterval);
      } else if (seconds === 0 && minutes === 0 && hours !== 0) {
        setHours(hours - 1);
        setMinutes(59);
        setSeconds(59);
      } else if ((hours === 0 && minutes !== 0, seconds === 0)) {
        setMinutes(minutes - 1);
        setSeconds(59);
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  }, [isProgress, seconds, isPaused, minutes, hours]);

  useEffect(() => {}, []);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <span
        className={` ${
          hours === 0
            ? minutes === 0
              ? seconds === 0
                ? null
                : 'animate__animated animate__pulse animate__infinite'
              : null
            : null
        }`}
        style={{
          fontSize: 100,
          fontWeight: 'bold',
          color:
            hours > 0
              ? '#277da1'
              : minutes >= 1
              ? '#277da1'
              : seconds < 10
              ? '#ff006e'
              : '#ffbe0b',
        }}
      >
        {hours > 0 ? `${hours < 10 ? `0${hours}` : `${hours}`} : ` : null}
        {minutes < 10 ? `0${minutes}` : `${minutes}`} :{' '}
        {seconds < 10 ? `0${seconds}` : `${seconds}`}
      </span>
      <span className='fs-2 mb-2'>{todo}</span>
      <h1 className='mb-4'>Time to focus!</h1>

      <div className='d-flex flex-row'>
        <button
          style={{ width: 50, marginRight: 10 }}
          className={`btn btn-lg align-items-center justify-content-center ${
            isPaused ? 'btn-outline-success' : 'btn-outline-warning'
          } d-block rounded-pill`}
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
          style={{ width: 50, marginRight: 10 }}
          className='btn btn-lg btn-outline-danger rounded-circle align-items-center justify-content-center '
          onClick={() => stop()}
        >
          <FontAwesomeIcon size='sm' icon={faStop} />
        </button>
        <button
          style={{ width: 50, marginRight: 10 }}
          className='btn btn-lg btn-outline-primary rounded-circle align-items-center justify-content-center'
          onClick={() => {
            setIsPaused(true);
            reset();
            setMinutes(0);
            setSeconds(0);
          }}
        >
          <FontAwesomeIcon size='sm' icon={faHistory} />
        </button>
      </div>
    </div>
  );
};

export default Timer;
