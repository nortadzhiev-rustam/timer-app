import React, { useState } from 'react';
import Progress from '../components/progress';
import Timer from '../components/timer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStop, faPlayCircle } from '@fortawesome/free-solid-svg-icons';

const Watch = (props) => {
  const [initialTime, setInitialTime] = useState(0);
  const [paused, setPaused] = useState(false);
  const [isProgressEnable, setIsProgressEnable] = useState(false);

  const toggleProgress = () => {
    if (initialTime !== 0) {
      setIsProgressEnable(!isProgressEnable);
    } else {
      alert('Please set timer');
    }
  };

  const handlePause = (isPaused) => {
    setPaused(isPaused);
  };

  const handleChange = (e) => {
    setInitialTime(e.target.value);
  };

  return (
    <div style={{ flex: 1, marginTop: 100, width: '100%', padding: 50 }}>
      {!isProgressEnable ? (
        <input
          style={{ width: 100, display: 'inline-block', marginRight: 20 }}
          className='form-control'
          type='number'
          max={100}
          min={0}
          value={initialTime}
          onChange={handleChange}
          onScroll={null}
        />
      ) : null}
      <button
        type='button'
        className={`btn btn-lg ${
          isProgressEnable ? 'btn-outline-danger' : 'btn-outline-info'
        }`}
        onClick={toggleProgress}
      >
        {isProgressEnable ? (
          <FontAwesomeIcon icon={faStop} />
        ) : (
          <FontAwesomeIcon icon={faPlayCircle} />
        )}
      </button>
      {isProgressEnable ? (
        <>
          <Progress
            timer={initialTime}
            isProgress={isProgressEnable}
            isPaused={paused}
          />
          <Timer
            initialMinutes={initialTime}
            isProgress={isProgressEnable}
            onPause={(isPaused) => handlePause(isPaused)}
          />
        </>
      ) : null}
    </div>
  );
};

export default Watch;
