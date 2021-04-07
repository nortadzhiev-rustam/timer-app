import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPause,
  faPlay,
  faStop,
  faHistory,
} from '@fortawesome/free-solid-svg-icons';

const Timer = ({ initialMinutes, isProgress, onPause, stop, reset, todo }) => {
  const [minutes, setMinutes] = useState(initialMinutes);
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

      if (seconds === 0) {
        if (minutes === 0) {
          var audio = new Audio('assets/audio/glass.mp3');
          audio.play();
          clearInterval(myInterval);
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  }, [isProgress, seconds, isPaused, minutes]);

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
          minutes === 0
            ? seconds === 0
              ? null
              : 'animate__animated animate__pulse animate__infinite'
            : null
        }`}
        style={{
          fontSize: 100,
          fontWeight: 'bold',
          color:
            minutes >= 1 ? '#277da1' : seconds < 10 ? '#ff006e' : '#ffbe0b',
        }}
      >
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
