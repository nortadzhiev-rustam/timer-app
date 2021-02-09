import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPause, faPlay } from '@fortawesome/free-solid-svg-icons';
const Timer = ({ initialMinutes, isProgress, onPause }) => {
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
  }, [isProgress, seconds, isPaused]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <span style={{ fontSize: 100, fontWeight: 'bold' }}>
        {minutes < 10 ? `0${minutes}` : `${minutes}`} :{' '}
        {seconds < 10 ? `0${seconds}` : `${seconds}`}
      </span>
      <button
        className={`btn btn-lg ${
          isPaused ? 'btn-outline-success' : 'btn-outline-warning'
        } d-block w-25`}
        onClick={() => {
          setIsPaused(!isPaused);
          onPause(!isPaused);
        }}
      >
        {isPaused ? (
          <FontAwesomeIcon size='lg' icon={faPlay} />
        ) : (
          <FontAwesomeIcon size='lg' icon={faPause} />
        )}
      </button>
    </div>
  );
};

export default Timer;
