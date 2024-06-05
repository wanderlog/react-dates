import React from 'react';
import PropTypes from 'prop-types';

// We don't use forbidExtraProps because it causes `npm run build:css` to fail
// because some parent components pass `key={...}`
var propTypes = process.env.NODE_ENV !== "production" ? {
  children: PropTypes.node.isRequired
} : {};
export default function CalendarWeek(_ref) {
  var children = _ref.children;
  return /*#__PURE__*/React.createElement("tr", null, children);
}
CalendarWeek.propTypes = process.env.NODE_ENV !== "production" ? propTypes : {};