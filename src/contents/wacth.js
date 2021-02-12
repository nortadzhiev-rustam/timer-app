import React, { useState } from 'react';
import Progress from '../components/progress';
import Timer from '../components/timer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStop, faFlag } from '@fortawesome/free-solid-svg-icons';
import './watch.css';
const Watch = (props) => {
  const [initialTime, setInitialTime] = useState(0);
  const [paused, setPaused] = useState(false);
  const [isProgressEnable, setIsProgressEnable] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false);

  const showModal = () => {
    return (
      <div
        className='modal fade show'
        id='exampleModalCenter'
        tabIndex={-1}
        aria-labelledby='exampleModalCenterTitle'
        style={{ display: 'inline' }}
        aria-hidden={true}
      >
        <div className='modal-dialog modal-dialog-centered'>
          <div className='modal-content'>
            <div className='modal-header bg-warning text-dark'>
              <h5 className='modal-title' id='exampleModalCenterTitle'>
                Forgot Something?!
              </h5>
              <button
                type='button'
                className='btn-close'
                data-bs-dismiss='modal'
                aria-label='Close'
                onClick={() => setIsShowModal(false)}
              ></button>
            </div>
            <div className='modal-body'>
              <p>Please set Timer</p>
            </div>
            <div className='modal-footer'>
              <button
                type='button'
                className='btn btn-secondary'
                data-bs-dismiss='modal'
                onClick={() => setIsShowModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const toggleProgress = () => {
    if (initialTime !== 0) {
      setIsProgressEnable(!isProgressEnable);
    } else {
      setIsShowModal(!isShowModal);
    }
  };

  const handlePause = (isPaused) => {
    setPaused(isPaused);
  };

  const handleChange = (e) => {
    setInitialTime(e.target.value);
  };

  return (
    <div className=' d-block justify-content-center align-items-center mx-5 my-5 w-50 bg-light p-5 rounded-3 shadow-lg'>
      <input
        type='text'
        className='form-control'
        style={{ width: 350, display: 'inline-block', marginRight: 30 }}
      />
      <input
        style={{
          width: 50,
          display: 'inline-block',
          marginRight: 20,
          WebkitAppearance: 'none',
        }}
        className='form-control'
        type='number'
        max={100}
        min={0}
        value={initialTime}
        onChange={handleChange}
        onScroll={null}
      />

      {isShowModal ? showModal() : null}
      <button
        type='button'
        style={{ width: 50 }}
        className={`btn btn-lg ${
          isProgressEnable
            ? 'btn-outline-danger rounded-pill'
            : 'btn-outline-primary'
        } `}
        onClick={toggleProgress}
      >
        {isProgressEnable ? (
          <FontAwesomeIcon size='sm' icon={faStop} />
        ) : (
          <FontAwesomeIcon size='sm' icon={faFlag} />
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
