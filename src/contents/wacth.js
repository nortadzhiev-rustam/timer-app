import React, { useState } from 'react';
import Progress from '../components/progress';
import Timer from '../components/timer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlag } from '@fortawesome/free-solid-svg-icons';
import './watch.css';

const Watch = (props) => {
  const [initialTime, setInitialTime] = useState(0);
  const [paused, setPaused] = useState(false);
  const [isProgressEnable, setIsProgressEnable] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false);
  const [todo, setTodo] = useState('');
  const [isReset, setIsReset] = useState(false);

  const showModal = () => {
    return (
      <div className='modal fade show ' id='exampleModalCenter'>
        <div className='modal-dialog modal-dialog-centered rounded animate__animated animate__zoomIn'>
          <div className='modal-content'>
            <div className='modal-header bg-secondary text-dark'>
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
                className='btn btn-danger'
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
    <div className=' d-flex flex-column justify-content-between align-items-center m-5 w-50 bg-light py-5 rounded-3 shadow-lg'>
      {isShowModal ? showModal() : null}
      {isProgressEnable ? null : (
        <div class='input-group mb-3 px-5'>
          <input
            type='text'
            className='form-control '
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
            aria-describedby='button-addon2'
          />
          <span class='input-group-text'>
            <input
              style={{
                width: 50,
                border: 'none',
                borderWidth: 0,
                outline: 'none',
                textAlign: 'center',
              }}

              className='input-group-text'
              type='number'
              max={100}
              min={0}
              value={initialTime}
              onChange={handleChange}
              onScroll={null}
            />
          </span>
          <button
          style={{width: 70}}
            class='btn btn-outline-primary'
            type='button'
            id='button-addon2'
            type='button'
            onClick={toggleProgress}
          >
            <FontAwesomeIcon size='lg' icon={faFlag} />
          </button>
        </div>
      )}
      {isProgressEnable ? (
        <div className='d-block w-75'>
          <Progress
            timer={initialTime}
            isProgress={isProgressEnable}
            isPaused={paused}
            isReset={isReset}
          />
          <Timer
            initialMinutes={initialTime}
            isProgress={isProgressEnable}
            onPause={(isPaused) => handlePause(isPaused)}
            stop={() => setIsProgressEnable(!isProgressEnable)}
            reset={() => {
              setInitialTime(0);
              setIsReset(!isReset);
            }}
            todo={todo}
          />
        </div>
      ) : null}
    </div>
  );
};

export default Watch;
