import React from 'react';
import PropTypes from 'prop-types';

const NotFound = ({ msg }) => {
  return (
    <div className='not-found'>{msg}</div>
  );
};

NotFound.propTypes = {
  msg: PropTypes.string.isRequired
};

export default NotFound;