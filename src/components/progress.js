import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
const Progress = (props) => {
  const [seconds, setSeconds] = useState(0);
  //const [paused, setPaused] = useState(false);
  const { timer, isProgress, isPaused } = props;
  useEffect(() => {
    setSeconds(timer * 60);
  }, []);

  useEffect(() => {
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

  return (
    <div className='progress mt-5 mx-5'>
      <div
        className={`progress-bar progress-bar-striped ${
          seconds / 60 > 1
            ? 'bg-info'
            : seconds / 60 < 1 && seconds > 10
            ? 'bg-warning'
            : 'bg-danger'
        } ${isProgress && !isPaused ? 'progress-bar-animated' : ''}`}
        role='progress-bar'
        aria-valuenow={seconds}
        aria-valuemin={0}
        aria-valuemax={100}
        style={{ width: `${(seconds * 100) / (timer * 60)}%` }}
      ></div>
    </div>
  );
};

export default Progress;

Progress.propTypes = {
  isPaused: PropTypes.bool.isRequired,
  isProgress: PropTypes.bool.isRequired,
  timer: PropTypes.string.isRequired,
};
