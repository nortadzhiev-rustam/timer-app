import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
const Progress = (props) => {
  const [seconds, setSeconds] = useState(0);
  //const [paused, setPaused] = useState(false);
  const { timer, isProgress, isPaused, isReset } = props;
  useEffect(() => {
    if (!isReset) {
      setSeconds(timer * 60);
    } else {
      setSeconds(0);
    }
  }, [isReset]);

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
    <div
      className={`progress ${
        // seconds / 60 < 1
        //   ? seconds > 0
        //     ? 'animate__animated animate__heartBeat animate__infinite'
        //     : null
        //   : null
        ''
      } mt-5`}
    >
      <div
        className={`progress-bar progress-bar-striped ${
          seconds / 60 >= 1
            ? 'bg-info'
            : seconds >= 10
            ? 'bg-warning'
            : 'bg-danger'
        } ${isProgress && !isPaused ? 'progress-bar-animated' : ''}`}
        role='progress-bar'
        aria-valuenow={seconds}
        aria-valuemin={0}
        aria-valuemax={100}
        style={{ width: isReset ? 0 : `${(seconds * 100) / (timer * 60)}%` }}
      ></div>
    </div>
  );
};

export default Progress;

Progress.propTypes = {
  isPaused: PropTypes.bool.isRequired,
  isProgress: PropTypes.bool.isRequired,
  timer: PropTypes.number.isRequired,
};
