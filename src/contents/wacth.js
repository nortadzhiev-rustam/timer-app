import React, { useEffect, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlag } from '@fortawesome/free-solid-svg-icons';
import './watch.css';
import CircleProgressBar from '../components/CircleProgressBar';

const Watch = (props) => {
  const [initialTime, setInitialTime] = useState(0);
  const [paused, setPaused] = useState(false);
  const [isProgressEnable, setIsProgressEnable] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false);
  const [todo, setTodo] = useState('');
  const [isReset, setIsReset] = useState(false);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);

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
  useEffect(() => {
    let hour = initialTime / 60;

    let rhours = Math.floor(hour);
    let rminutes = (hour - rhours) * 60;
    setHours(Math.floor(rhours));
    setMinutes(Math.round(rminutes));
  }, [initialTime]);
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
    setInitialTime(Number.parseInt(e.target.value));
  };

  return (
    <div className='col-12  col-xs-8 col-sm-8 col-md-10 col-lg-10 col-xl-6 d-flex flex-column justify-content-between align-items-center m-5 w-50 bg-light p-5 rounded-5 shadow'>
      {isShowModal ? showModal() : null}
      {isProgressEnable ? null : (
        <div className='input-group mb-3 px-5'>
          <input
            type='text'
            className='form-control '
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
            aria-describedby='button-addon2'
          />
          <span className='input-group-text'>
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
            style={{ width: 70 }}
            className='btn btn-outline-primary'
            type='button'
            id='button-addon2'
            onClick={toggleProgress}
          >
            <FontAwesomeIcon size='lg' icon={faFlag} />
          </button>
        </div>
      )}
      {isProgressEnable ? (
        <CircleProgressBar
          timer={initialTime}
          isProgress={isProgressEnable}
          isPaused={paused}
          isReset={isReset}
          initialHours={hours}
          initialMinutes={minutes}
          onPause={(isPaused) => handlePause(isPaused)}
          stop={() => setIsProgressEnable(!isProgressEnable)}
          reset={() => {
            setInitialTime(0);
            setIsReset(!isReset);
          }}
        />
      ) : null}
    </div>
  );
};

export default Watch;
