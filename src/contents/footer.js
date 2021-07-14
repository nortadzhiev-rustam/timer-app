import React from 'react';

const Footer = () => {
  const getYear = () => {
    const d = new Date();
    return d.getFullYear();
  };
  return (
    <nav className='navbar navbar-dark bg-dark d-flex flex-row align-items-center justify-content-center'>
      <span style={{ color: 'white' }}>
        {' '}
        &#169; Rustam Nortadzhiev {getYear()}
      </span>
    </nav>
  );
};

export default Footer;
