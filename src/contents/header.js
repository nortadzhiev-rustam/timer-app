import React from 'react';

const Header = () => {


    const handleSearch = (e) => {
        e.preventDefault();
    }

  return (
    <nav className='navbar navbar-expand-lg navbar-dark bg-dark sticky-top'>
      <div className='container-fluid'>
        <img src='assets/img/logo192.png' alt='logo' width='30' />
        <a className='navbar-brand' href='#'>
          Timer
        </a>
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarColor01'
          aria-controls='navbarColor01'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarColor01'>
          <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
            <li className='nav-item'>
              <a className='nav-link active' aria-current='page' href='#'>
                Home
              </a>
            </li>
          </ul>
          <form className='d-flex'>
            <input
              className='form-control me-2'
              type='search'
              placeholder='Search'
              aria-label='Search'
            />
            <button className='btn btn-outline-light' onClick={handleSearch} type='submit'>
              Search
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Header;
