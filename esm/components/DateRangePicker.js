import _extends from "@babel/runtime/helpers/esm/extends";
import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import shallowEqual from "enzyme-shallow-equal";
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
import React from 'react';
import moment from 'moment';
import { css, withStyles, withStylesPropTypes } from 'react-with-styles';
import { Portal } from 'react-portal';
import { forbidExtraProps } from 'airbnb-prop-types';
import { addEventListener } from 'consolidated-events';
import isTouchDevice from 'is-touch-device';
import OutsideClickHandler from 'react-outside-click-handler';
import DateRangePickerShape from '../shapes/DateRangePickerShape';
import { DateRangePickerPhrases } from '../defaultPhrases';
import getResponsiveContainerStyles from '../utils/getResponsiveContainerStyles';
import getDetachedContainerStyles from '../utils/getDetachedContainerStyles';
import getInputHeight from '../utils/getInputHeight';
import isInclusivelyAfterDay from '../utils/isInclusivelyAfterDay';
import _disableScroll from '../utils/disableScroll';
import noflip from '../utils/noflip';
import DateRangePickerInputController from './DateRangePickerInputController';
import DayPickerRangeController from './DayPickerRangeController';
import CloseButton from './CloseButton';
import { START_DATE, END_DATE, HORIZONTAL_ORIENTATION, VERTICAL_ORIENTATION, ANCHOR_LEFT, ANCHOR_RIGHT, OPEN_DOWN, OPEN_UP, DAY_SIZE, ICON_BEFORE_POSITION, INFO_POSITION_BOTTOM, FANG_HEIGHT_PX, DEFAULT_VERTICAL_SPACING, NAV_POSITION_TOP } from '../constants';
var propTypes = process.env.NODE_ENV !== "production" ? forbidExtraProps(_objectSpread(_objectSpread({}, withStylesPropTypes), DateRangePickerShape)) : {};
var defaultProps = {
  // required props for a functional interactive DateRangePicker
  startDate: null,
  endDate: null,
  focusedInput: null,
  // input related props
  startDatePlaceholderText: 'Start Date',
  endDatePlaceholderText: 'End Date',
  startDateAriaLabel: undefined,
  endDateAriaLabel: undefined,
  startDateOffset: undefined,
  endDateOffset: undefined,
  disabled: false,
  required: false,
  readOnly: false,
  screenReaderInputMessage: '',
  showClearDates: false,
  showDefaultInputIcon: false,
  inputIconPosition: ICON_BEFORE_POSITION,
  customInputIcon: null,
  customArrowIcon: null,
  customCloseIcon: null,
  noBorder: false,
  block: false,
  small: false,
  regular: false,
  keepFocusOnInput: false,
  // calendar presentation and interaction related props
  renderMonthText: null,
  renderWeekHeaderElement: null,
  orientation: HORIZONTAL_ORIENTATION,
  anchorDirection: ANCHOR_LEFT,
  openDirection: OPEN_DOWN,
  horizontalMargin: 0,
  withPortal: false,
  withFullScreenPortal: false,
  appendToBody: false,
  disableScroll: false,
  initialVisibleMonth: null,
  numberOfMonths: 2,
  keepOpenOnDateSelect: false,
  reopenPickerOnClearDates: false,
  renderCalendarInfo: null,
  calendarInfoPosition: INFO_POSITION_BOTTOM,
  hideKeyboardShortcutsPanel: false,
  daySize: DAY_SIZE,
  isRTL: false,
  firstDayOfWeek: null,
  verticalHeight: null,
  transitionDuration: undefined,
  verticalSpacing: DEFAULT_VERTICAL_SPACING,
  horizontalMonthPadding: undefined,
  // navigation related props
  dayPickerNavigationInlineStyles: null,
  navPosition: NAV_POSITION_TOP,
  navPrev: null,
  navNext: null,
  renderNavPrevButton: null,
  renderNavNextButton: null,
  onPrevMonthClick: function onPrevMonthClick() {},
  onNextMonthClick: function onNextMonthClick() {},
  onClose: function onClose() {},
  // day presentation and interaction related props
  renderCalendarDay: undefined,
  renderDayContents: null,
  renderMonthElement: null,
  minimumNights: 1,
  enableOutsideDays: false,
  isDayBlocked: function isDayBlocked() {
    return false;
  },
  isOutsideRange: function isOutsideRange(day) {
    return !isInclusivelyAfterDay(day, moment());
  },
  isDayHighlighted: function isDayHighlighted() {
    return false;
  },
  minDate: undefined,
  maxDate: undefined,
  // internationalization
  displayFormat: function displayFormat() {
    return moment.localeData().longDateFormat('L');
  },
  monthFormat: 'MMMM YYYY',
  weekDayFormat: 'dd',
  phrases: DateRangePickerPhrases,
  dayAriaLabelFormat: undefined
};
var DateRangePicker = /*#__PURE__*/function (_ref2, _ref) {
  function DateRangePicker(props) {
    var _this;
    _this = _ref2.call(this, props) || this;
    _this.state = {
      dayPickerContainerStyles: {},
      isDateRangePickerInputFocused: false,
      isDayPickerFocused: false,
      showKeyboardShortcuts: false
    };
    _this.isTouchDevice = false;
    _this.onOutsideClick = _this.onOutsideClick.bind(_this);
    _this.onDateRangePickerInputFocus = _this.onDateRangePickerInputFocus.bind(_this);
    _this.onDayPickerFocus = _this.onDayPickerFocus.bind(_this);
    _this.onDayPickerFocusOut = _this.onDayPickerFocusOut.bind(_this);
    _this.onDayPickerBlur = _this.onDayPickerBlur.bind(_this);
    _this.showKeyboardShortcutsPanel = _this.showKeyboardShortcutsPanel.bind(_this);
    _this.responsivizePickerPosition = _this.responsivizePickerPosition.bind(_this);
    _this.disableScroll = _this.disableScroll.bind(_this);
    _this.setDayPickerContainerRef = _this.setDayPickerContainerRef.bind(_this);
    _this.setContainerRef = _this.setContainerRef.bind(_this);
    return _this;
  }
  _inheritsLoose(DateRangePicker, _ref2);
  var _proto = DateRangePicker.prototype;
  _proto[_ref] = function (nextProps, nextState) {
    return !shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState);
  };
  _proto.componentDidMount = function componentDidMount() {
    this.removeEventListener = addEventListener(window, 'resize', this.responsivizePickerPosition, {
      passive: true
    });
    this.responsivizePickerPosition();
    this.disableScroll();
    var focusedInput = this.props.focusedInput;
    if (focusedInput) {
      this.setState({
        isDateRangePickerInputFocused: true
      });
    }
    this.isTouchDevice = isTouchDevice();
  };
  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    var focusedInput = this.props.focusedInput;
    if (!prevProps.focusedInput && focusedInput && this.isOpened()) {
      // The date picker just changed from being closed to being open.
      this.responsivizePickerPosition();
      this.disableScroll();
    } else if (prevProps.focusedInput && !focusedInput && !this.isOpened()) {
      // The date picker just changed from being open to being closed.
      if (this.enableScroll) this.enableScroll();
    }
  };
  _proto.componentWillUnmount = function componentWillUnmount() {
    this.removeDayPickerEventListeners();
    if (this.removeEventListener) this.removeEventListener();
    if (this.enableScroll) this.enableScroll();
  };
  _proto.onOutsideClick = function onOutsideClick(event) {
    var _this$props = this.props,
      onFocusChange = _this$props.onFocusChange,
      onClose = _this$props.onClose,
      startDate = _this$props.startDate,
      endDate = _this$props.endDate,
      appendToBody = _this$props.appendToBody;
    if (!this.isOpened()) return;
    if (appendToBody && this.dayPickerContainer.contains(event.target)) return;
    this.setState({
      isDateRangePickerInputFocused: false,
      isDayPickerFocused: false,
      showKeyboardShortcuts: false
    });
    onFocusChange(null);
    onClose({
      startDate: startDate,
      endDate: endDate
    });
  };
  _proto.onDateRangePickerInputFocus = function onDateRangePickerInputFocus(focusedInput) {
    var _this$props2 = this.props,
      onFocusChange = _this$props2.onFocusChange,
      readOnly = _this$props2.readOnly,
      withPortal = _this$props2.withPortal,
      withFullScreenPortal = _this$props2.withFullScreenPortal,
      keepFocusOnInput = _this$props2.keepFocusOnInput;
    if (focusedInput) {
      var withAnyPortal = withPortal || withFullScreenPortal;
      var moveFocusToDayPicker = withAnyPortal || readOnly && !keepFocusOnInput || this.isTouchDevice && !keepFocusOnInput;
      if (moveFocusToDayPicker) {
        this.onDayPickerFocus();
      } else {
        this.onDayPickerBlur();
      }
    }
    onFocusChange(focusedInput);
  };
  _proto.onDayPickerFocus = function onDayPickerFocus() {
    var _this$props3 = this.props,
      focusedInput = _this$props3.focusedInput,
      onFocusChange = _this$props3.onFocusChange;
    if (!focusedInput) onFocusChange(START_DATE);
    this.setState({
      isDateRangePickerInputFocused: false,
      isDayPickerFocused: true,
      showKeyboardShortcuts: false
    });
  };
  _proto.onDayPickerFocusOut = function onDayPickerFocusOut(event) {
    // In cases where **relatedTarget** is not null, it points to the right
    // element here. However, in cases where it is null (such as clicking on a
    // specific day) or it is **document.body** (IE11), the appropriate value is **event.target**.
    //
    // We handle both situations here by using the ` || ` operator to fallback
    // to *event.target** when **relatedTarget** is not provided.
    var relatedTarget = event.relatedTarget === document.body ? event.target : event.relatedTarget || event.target;
    if (this.dayPickerContainer.contains(relatedTarget)) return;
    this.onOutsideClick(event);
  };
  _proto.onDayPickerBlur = function onDayPickerBlur() {
    this.setState({
      isDateRangePickerInputFocused: true,
      isDayPickerFocused: false,
      showKeyboardShortcuts: false
    });
  };
  _proto.setDayPickerContainerRef = function setDayPickerContainerRef(ref) {
    if (ref === this.dayPickerContainer) return;
    if (this.dayPickerContainer) this.removeDayPickerEventListeners();
    this.dayPickerContainer = ref;
    if (!ref) return;
    this.addDayPickerEventListeners();
  };
  _proto.setContainerRef = function setContainerRef(ref) {
    this.container = ref;
  };
  _proto.addDayPickerEventListeners = function addDayPickerEventListeners() {
    // NOTE: We are using a manual event listener here, because React doesn't
    // provide FocusOut, while blur and keydown don't provide the information
    // needed in order to know whether we have left focus or not.
    //
    // For reference, this issue is further described here:
    // - https://github.com/facebook/react/issues/6410
    this.removeDayPickerFocusOut = addEventListener(this.dayPickerContainer, 'focusout', this.onDayPickerFocusOut);
  };
  _proto.removeDayPickerEventListeners = function removeDayPickerEventListeners() {
    if (this.removeDayPickerFocusOut) this.removeDayPickerFocusOut();
  };
  _proto.isOpened = function isOpened() {
    var focusedInput = this.props.focusedInput;
    return focusedInput === START_DATE || focusedInput === END_DATE;
  };
  _proto.disableScroll = function disableScroll() {
    var propDisableScroll = this.props.disableScroll;
    // The code used to automatically disable scroll when `appendToBody` was
    // set. On Macs, this caused a scrollbar to disappear and the page to shift.
    // We removed that behavior and now just respect the `disableScroll` prop.
    // https://github.com/react-dates/react-dates/issues/1697
    if (!propDisableScroll) return;
    if (!this.isOpened()) return;

    // Disable scroll for every ancestor of this DateRangePicker up to the
    // document level. This ensures the input and the picker never move. Other
    // sibling elements or the picker itself can scroll.
    this.enableScroll = _disableScroll(this.container);
  };
  _proto.responsivizePickerPosition = function responsivizePickerPosition() {
    // It's possible the portal props have been changed in response to window resizes
    // So let's ensure we reset this back to the base state each time
    var dayPickerContainerStyles = this.state.dayPickerContainerStyles;
    if (Object.keys(dayPickerContainerStyles).length > 0) {
      this.setState({
        dayPickerContainerStyles: {}
      });
    }
    if (!this.isOpened()) {
      return;
    }
    var _this$props4 = this.props,
      openDirection = _this$props4.openDirection,
      anchorDirection = _this$props4.anchorDirection,
      horizontalMargin = _this$props4.horizontalMargin,
      withPortal = _this$props4.withPortal,
      withFullScreenPortal = _this$props4.withFullScreenPortal,
      appendToBody = _this$props4.appendToBody;
    var isAnchoredLeft = anchorDirection === ANCHOR_LEFT;
    if (!withPortal && !withFullScreenPortal) {
      var containerRect = this.dayPickerContainer.getBoundingClientRect();
      var currentOffset = dayPickerContainerStyles[anchorDirection] || 0;
      var containerEdge = isAnchoredLeft ? containerRect[ANCHOR_RIGHT] : containerRect[ANCHOR_LEFT];
      this.setState({
        dayPickerContainerStyles: _objectSpread(_objectSpread({}, getResponsiveContainerStyles(anchorDirection, currentOffset, containerEdge, horizontalMargin)), appendToBody && getDetachedContainerStyles(openDirection, anchorDirection, this.container, appendToBody))
      });
    }
  };
  _proto.showKeyboardShortcutsPanel = function showKeyboardShortcutsPanel() {
    this.setState({
      isDateRangePickerInputFocused: false,
      isDayPickerFocused: true,
      showKeyboardShortcuts: true
    });
  };
  _proto.maybeRenderDayPickerWithPortal = function maybeRenderDayPickerWithPortal() {
    var _this$props5 = this.props,
      withPortal = _this$props5.withPortal,
      withFullScreenPortal = _this$props5.withFullScreenPortal,
      appendToBody = _this$props5.appendToBody;
    if (!this.isOpened()) {
      return null;
    }
    if (withPortal || withFullScreenPortal || appendToBody) {
      return /*#__PURE__*/React.createElement(Portal, null, this.renderDayPicker());
    }
    return this.renderDayPicker();
  };
  _proto.renderDayPicker = function renderDayPicker() {
    var _this$props6 = this.props,
      anchorDirection = _this$props6.anchorDirection,
      openDirection = _this$props6.openDirection,
      isDayBlocked = _this$props6.isDayBlocked,
      isDayHighlighted = _this$props6.isDayHighlighted,
      isOutsideRange = _this$props6.isOutsideRange,
      numberOfMonths = _this$props6.numberOfMonths,
      orientation = _this$props6.orientation,
      monthFormat = _this$props6.monthFormat,
      renderMonthText = _this$props6.renderMonthText,
      renderWeekHeaderElement = _this$props6.renderWeekHeaderElement,
      dayPickerNavigationInlineStyles = _this$props6.dayPickerNavigationInlineStyles,
      navPosition = _this$props6.navPosition,
      navPrev = _this$props6.navPrev,
      navNext = _this$props6.navNext,
      renderNavPrevButton = _this$props6.renderNavPrevButton,
      renderNavNextButton = _this$props6.renderNavNextButton,
      onPrevMonthClick = _this$props6.onPrevMonthClick,
      onNextMonthClick = _this$props6.onNextMonthClick,
      onDatesChange = _this$props6.onDatesChange,
      onFocusChange = _this$props6.onFocusChange,
      withPortal = _this$props6.withPortal,
      withFullScreenPortal = _this$props6.withFullScreenPortal,
      daySize = _this$props6.daySize,
      enableOutsideDays = _this$props6.enableOutsideDays,
      focusedInput = _this$props6.focusedInput,
      startDate = _this$props6.startDate,
      startDateOffset = _this$props6.startDateOffset,
      endDate = _this$props6.endDate,
      endDateOffset = _this$props6.endDateOffset,
      minDate = _this$props6.minDate,
      maxDate = _this$props6.maxDate,
      minimumNights = _this$props6.minimumNights,
      keepOpenOnDateSelect = _this$props6.keepOpenOnDateSelect,
      renderCalendarDay = _this$props6.renderCalendarDay,
      renderDayContents = _this$props6.renderDayContents,
      renderCalendarInfo = _this$props6.renderCalendarInfo,
      renderMonthElement = _this$props6.renderMonthElement,
      calendarInfoPosition = _this$props6.calendarInfoPosition,
      firstDayOfWeek = _this$props6.firstDayOfWeek,
      initialVisibleMonth = _this$props6.initialVisibleMonth,
      hideKeyboardShortcutsPanel = _this$props6.hideKeyboardShortcutsPanel,
      customCloseIcon = _this$props6.customCloseIcon,
      onClose = _this$props6.onClose,
      phrases = _this$props6.phrases,
      dayAriaLabelFormat = _this$props6.dayAriaLabelFormat,
      isRTL = _this$props6.isRTL,
      weekDayFormat = _this$props6.weekDayFormat,
      styles = _this$props6.styles,
      verticalHeight = _this$props6.verticalHeight,
      transitionDuration = _this$props6.transitionDuration,
      verticalSpacing = _this$props6.verticalSpacing,
      horizontalMonthPadding = _this$props6.horizontalMonthPadding,
      small = _this$props6.small,
      disabled = _this$props6.disabled,
      reactDates = _this$props6.theme.reactDates;
    var _this$state = this.state,
      dayPickerContainerStyles = _this$state.dayPickerContainerStyles,
      isDayPickerFocused = _this$state.isDayPickerFocused,
      showKeyboardShortcuts = _this$state.showKeyboardShortcuts;
    var onOutsideClick = !withFullScreenPortal && withPortal ? this.onOutsideClick : undefined;
    var initialVisibleMonthThunk = initialVisibleMonth || function () {
      return startDate || endDate || moment();
    };
    var closeIcon = customCloseIcon || /*#__PURE__*/React.createElement(CloseButton, css(styles.DateRangePicker_closeButton_svg));
    var inputHeight = getInputHeight(reactDates, small);
    var withAnyPortal = withPortal || withFullScreenPortal;

    /* eslint-disable jsx-a11y/no-static-element-interactions */
    /* eslint-disable jsx-a11y/click-events-have-key-events */
    return /*#__PURE__*/React.createElement("div", _extends({
      ref: this.setDayPickerContainerRef
    }, css(styles.DateRangePicker_picker, anchorDirection === ANCHOR_LEFT && styles.DateRangePicker_picker__directionLeft, anchorDirection === ANCHOR_RIGHT && styles.DateRangePicker_picker__directionRight, orientation === HORIZONTAL_ORIENTATION && styles.DateRangePicker_picker__horizontal, orientation === VERTICAL_ORIENTATION && styles.DateRangePicker_picker__vertical, !withAnyPortal && openDirection === OPEN_DOWN && {
      top: inputHeight + verticalSpacing
    }, !withAnyPortal && openDirection === OPEN_UP && {
      bottom: inputHeight + verticalSpacing
    }, withAnyPortal && styles.DateRangePicker_picker__portal, withFullScreenPortal && styles.DateRangePicker_picker__fullScreenPortal, isRTL && styles.DateRangePicker_picker__rtl, dayPickerContainerStyles), {
      onClick: onOutsideClick
    }), /*#__PURE__*/React.createElement(DayPickerRangeController, {
      orientation: orientation,
      enableOutsideDays: enableOutsideDays,
      numberOfMonths: numberOfMonths,
      onPrevMonthClick: onPrevMonthClick,
      onNextMonthClick: onNextMonthClick,
      onDatesChange: onDatesChange,
      onFocusChange: onFocusChange,
      onClose: onClose,
      focusedInput: focusedInput,
      startDate: startDate,
      startDateOffset: startDateOffset,
      endDate: endDate,
      endDateOffset: endDateOffset,
      minDate: minDate,
      maxDate: maxDate,
      monthFormat: monthFormat,
      renderMonthText: renderMonthText,
      renderWeekHeaderElement: renderWeekHeaderElement,
      withPortal: withAnyPortal,
      daySize: daySize,
      initialVisibleMonth: initialVisibleMonthThunk,
      hideKeyboardShortcutsPanel: hideKeyboardShortcutsPanel,
      dayPickerNavigationInlineStyles: dayPickerNavigationInlineStyles,
      navPosition: navPosition,
      navPrev: navPrev,
      navNext: navNext,
      renderNavPrevButton: renderNavPrevButton,
      renderNavNextButton: renderNavNextButton,
      minimumNights: minimumNights,
      isOutsideRange: isOutsideRange,
      isDayHighlighted: isDayHighlighted,
      isDayBlocked: isDayBlocked,
      keepOpenOnDateSelect: keepOpenOnDateSelect,
      renderCalendarDay: renderCalendarDay,
      renderDayContents: renderDayContents,
      renderCalendarInfo: renderCalendarInfo,
      renderMonthElement: renderMonthElement,
      calendarInfoPosition: calendarInfoPosition,
      isFocused: isDayPickerFocused,
      showKeyboardShortcuts: showKeyboardShortcuts,
      onBlur: this.onDayPickerBlur,
      phrases: phrases,
      dayAriaLabelFormat: dayAriaLabelFormat,
      isRTL: isRTL,
      firstDayOfWeek: firstDayOfWeek,
      weekDayFormat: weekDayFormat,
      verticalHeight: verticalHeight,
      transitionDuration: transitionDuration,
      disabled: disabled,
      horizontalMonthPadding: horizontalMonthPadding
    }), withFullScreenPortal && /*#__PURE__*/React.createElement("button", _extends({}, css(styles.DateRangePicker_closeButton), {
      type: "button",
      onClick: this.onOutsideClick,
      "aria-label": phrases.closeDatePicker
    }), closeIcon));
    /* eslint-enable jsx-a11y/no-static-element-interactions */
    /* eslint-enable jsx-a11y/click-events-have-key-events */
  };
  _proto.render = function render() {
    var _this$props7 = this.props,
      startDate = _this$props7.startDate,
      startDateId = _this$props7.startDateId,
      startDatePlaceholderText = _this$props7.startDatePlaceholderText,
      startDateAriaLabel = _this$props7.startDateAriaLabel,
      endDate = _this$props7.endDate,
      endDateId = _this$props7.endDateId,
      endDatePlaceholderText = _this$props7.endDatePlaceholderText,
      endDateAriaLabel = _this$props7.endDateAriaLabel,
      focusedInput = _this$props7.focusedInput,
      screenReaderInputMessage = _this$props7.screenReaderInputMessage,
      showClearDates = _this$props7.showClearDates,
      showDefaultInputIcon = _this$props7.showDefaultInputIcon,
      inputIconPosition = _this$props7.inputIconPosition,
      customInputIcon = _this$props7.customInputIcon,
      customArrowIcon = _this$props7.customArrowIcon,
      customCloseIcon = _this$props7.customCloseIcon,
      disabled = _this$props7.disabled,
      required = _this$props7.required,
      readOnly = _this$props7.readOnly,
      openDirection = _this$props7.openDirection,
      phrases = _this$props7.phrases,
      isOutsideRange = _this$props7.isOutsideRange,
      minimumNights = _this$props7.minimumNights,
      withPortal = _this$props7.withPortal,
      withFullScreenPortal = _this$props7.withFullScreenPortal,
      displayFormat = _this$props7.displayFormat,
      reopenPickerOnClearDates = _this$props7.reopenPickerOnClearDates,
      keepOpenOnDateSelect = _this$props7.keepOpenOnDateSelect,
      onDatesChange = _this$props7.onDatesChange,
      onClose = _this$props7.onClose,
      isRTL = _this$props7.isRTL,
      noBorder = _this$props7.noBorder,
      block = _this$props7.block,
      verticalSpacing = _this$props7.verticalSpacing,
      small = _this$props7.small,
      regular = _this$props7.regular,
      styles = _this$props7.styles;
    var isDateRangePickerInputFocused = this.state.isDateRangePickerInputFocused;
    var enableOutsideClick = !withPortal && !withFullScreenPortal;
    var hideFang = verticalSpacing < FANG_HEIGHT_PX;
    var input = /*#__PURE__*/React.createElement(DateRangePickerInputController, {
      startDate: startDate,
      startDateId: startDateId,
      startDatePlaceholderText: startDatePlaceholderText,
      isStartDateFocused: focusedInput === START_DATE,
      startDateAriaLabel: startDateAriaLabel,
      endDate: endDate,
      endDateId: endDateId,
      endDatePlaceholderText: endDatePlaceholderText,
      isEndDateFocused: focusedInput === END_DATE,
      endDateAriaLabel: endDateAriaLabel,
      displayFormat: displayFormat,
      showClearDates: showClearDates,
      showCaret: !withPortal && !withFullScreenPortal && !hideFang,
      showDefaultInputIcon: showDefaultInputIcon,
      inputIconPosition: inputIconPosition,
      customInputIcon: customInputIcon,
      customArrowIcon: customArrowIcon,
      customCloseIcon: customCloseIcon,
      disabled: disabled,
      required: required,
      readOnly: readOnly,
      openDirection: openDirection,
      reopenPickerOnClearDates: reopenPickerOnClearDates,
      keepOpenOnDateSelect: keepOpenOnDateSelect,
      isOutsideRange: isOutsideRange,
      minimumNights: minimumNights,
      withFullScreenPortal: withFullScreenPortal,
      onDatesChange: onDatesChange,
      onFocusChange: this.onDateRangePickerInputFocus,
      onKeyDownArrowDown: this.onDayPickerFocus,
      onKeyDownQuestionMark: this.showKeyboardShortcutsPanel,
      onClose: onClose,
      phrases: phrases,
      screenReaderMessage: screenReaderInputMessage,
      isFocused: isDateRangePickerInputFocused,
      isRTL: isRTL,
      noBorder: noBorder,
      block: block,
      small: small,
      regular: regular,
      verticalSpacing: verticalSpacing
    }, this.maybeRenderDayPickerWithPortal());
    return /*#__PURE__*/React.createElement("div", _extends({
      ref: this.setContainerRef
    }, css(styles.DateRangePicker, block && styles.DateRangePicker__block)), enableOutsideClick && /*#__PURE__*/React.createElement(OutsideClickHandler, {
      onOutsideClick: this.onOutsideClick
    }, input), enableOutsideClick || input);
  };
  return DateRangePicker;
}(React.PureComponent || React.Component, !React.PureComponent && "shouldComponentUpdate");
DateRangePicker.propTypes = process.env.NODE_ENV !== "production" ? propTypes : {};
DateRangePicker.defaultProps = defaultProps;
export { DateRangePicker as PureDateRangePicker };
export default withStyles(function (_ref3) {
  var _ref3$reactDates = _ref3.reactDates,
    color = _ref3$reactDates.color,
    zIndex = _ref3$reactDates.zIndex;
  return {
    DateRangePicker: {
      position: 'relative',
      display: 'inline-block'
    },
    DateRangePicker__block: {
      display: 'block'
    },
    DateRangePicker_picker: {
      zIndex: zIndex + 1,
      backgroundColor: color.background,
      position: 'absolute'
    },
    DateRangePicker_picker__rtl: {
      direction: noflip('rtl')
    },
    DateRangePicker_picker__directionLeft: {
      left: noflip(0)
    },
    DateRangePicker_picker__directionRight: {
      right: noflip(0)
    },
    DateRangePicker_picker__portal: {
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
      position: 'fixed',
      top: 0,
      left: noflip(0),
      height: '100%',
      width: '100%'
    },
    DateRangePicker_picker__fullScreenPortal: {
      backgroundColor: color.background
    },
    DateRangePicker_closeButton: {
      background: 'none',
      border: 0,
      color: 'inherit',
      font: 'inherit',
      lineHeight: 'normal',
      overflow: 'visible',
      cursor: 'pointer',
      position: 'absolute',
      top: 0,
      right: noflip(0),
      padding: 15,
      zIndex: zIndex + 2,
      ':hover': {
        color: "darken(".concat(color.core.grayLighter, ", 10%)"),
        textDecoration: 'none'
      },
      ':focus': {
        color: "darken(".concat(color.core.grayLighter, ", 10%)"),
        textDecoration: 'none'
      }
    },
    DateRangePicker_closeButton_svg: {
      height: 15,
      width: 15,
      fill: color.core.grayLighter
    }
  };
}, {
  pureComponent: typeof React.PureComponent !== 'undefined'
})(DateRangePicker);