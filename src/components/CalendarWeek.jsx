import React from 'react';
import PropTypes from 'prop-types';

// We don't use forbidExtraProps because it causes `npm run build:css` to fail
// because some parent components pass `key={...}`
const propTypes = {
  children: PropTypes.node.isRequired,
};

export default function CalendarWeek({ children }) {
  return (
    <tr>
      {children}
    </tr>
  );
}

CalendarWeek.propTypes = propTypes;
