"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = CalendarWeek;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
// We don't use forbidExtraProps because it causes `npm run build:css` to fail
// because some parent components pass `key={...}`
var propTypes = process.env.NODE_ENV !== "production" ? {
  children: _propTypes["default"].node.isRequired
} : {};
function CalendarWeek(_ref) {
  var children = _ref.children;
  return /*#__PURE__*/_react["default"].createElement("tr", null, children);
}
CalendarWeek.propTypes = process.env.NODE_ENV !== "production" ? propTypes : {};