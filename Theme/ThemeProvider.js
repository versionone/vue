'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _reduxUi = require('redux-ui');

var _v1Theme = require('./../styles/themes/v1Theme');

var _v1Theme2 = _interopRequireDefault(_v1Theme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var reducer = (0, _redux.combineReducers)({
  ui: _reduxUi.reducer
});
var store = (0, _redux.createStore)(reducer);

var ThemeProvider = function (_Component) {
  _inherits(ThemeProvider, _Component);

  function ThemeProvider() {
    _classCallCheck(this, ThemeProvider);

    return _possibleConstructorReturn(this, (ThemeProvider.__proto__ || Object.getPrototypeOf(ThemeProvider)).apply(this, arguments));
  }

  _createClass(ThemeProvider, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        theme: this.props.theme
      };
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        _reactRedux.Provider,
        { store: store },
        this.props.children
      );
    }
  }]);

  return ThemeProvider;
}(_react.Component);

ThemeProvider.themeDefinition = {
  /**
   * Name of theme.
   */
  _name: _react.PropTypes.string.isRequired,
  altColor: _react.PropTypes.string.isRequired,
  basicColor: _react.PropTypes.string.isRequired,
  /**
   * Default font family used for components and textual content.
   */
  basicFontFamily: _react.PropTypes.string.isRequired,
  /**
   * Font weight value to stress strong emphasis on textual content.
   */
  boldFont: _react.PropTypes.number.isRequired,
  /**
   * Foreground color to be used to contrast a dark background.
   */
  darkInverseColor: _react.PropTypes.string.isRequired,
  /**
   * Used to represent a disabled state.
   */
  disabledPrimaryColor: _react.PropTypes.string.isRequired,
  /**
   * Primary color to represent an error state.
   */
  errorPrimaryColor: _react.PropTypes.string.isRequired,
  /**
   * Secondary color to represent an error state; typically used for shadows.
   */
  errorSecondaryColor: _react.PropTypes.string.isRequired,
  /**
   * Default color for borders of form field components.
   */
  fieldBorderColor: _react.PropTypes.string.isRequired,
  /**
   * Primary color to represent a focused state.
   */
  focusedPrimaryColor: _react.PropTypes.string.isRequired,
  /**
   * Secondary color to represent a focused state.
   */
  focusedSecondaryColor: _react.PropTypes.string.isRequired,
  /**
   * Normal gutter size
   */
  gutter: _react.PropTypes.number.isRequired,
  importantColor: _react.PropTypes.string.isRequired,
  /**
   * Large font size used for ...?
   */
  largeFontSize: _react.PropTypes.number.isRequired,
  /**
   * Large gutter
   */
  largeGutter: _react.PropTypes.number.isRequired,
  /**
   * Larger line height used for component text.
   */
  largeLineHeight: _react.PropTypes.number.isRequired,
  /**
   * Foreground color to be used to contrast a light background.
   */
  lightInverseColor: _react.PropTypes.string.isRequired,
  /**
   * Medium font size used for ...?
   */
  mediumFontSize: _react.PropTypes.number.isRequired,
  /**
   * Default background color for components.
   */
  normalBackground: _react.PropTypes.string.isRequired,
  /**
   * Line height for textual content
   */
  normalLineHeight: _react.PropTypes.number.isRequired,
  /**
   * Default radius
   */
  normalRadius: _react.PropTypes.number.isRequired,
  /**
   * Primary color to represent a pending state.
   */
  pendingPrimaryColor: _react.PropTypes.string.isRequired,
  /**
   * Default font size.
   */
  smallFontSize: _react.PropTypes.number.isRequired,
  /**
   * Small gutter size; used for vertical padding on ListItems and SubHeaders.
   */
  smallGutter: _react.PropTypes.number.isRequired,
  /**
   * Color to represent textual content that is in a disabled state.
   */
  textDisabledColor: _react.PropTypes.string.isRequired,
  /**
   * Primary color for textual content.
   */
  textPrimaryColor: _react.PropTypes.string.isRequired,
  /**
   * Secondary color for textual content; such as hint text.
   */
  textSecondaryColor: _react.PropTypes.string.isRequired,
  /**
   * Largest font size used for ...?
   */
  xLargeFontSize: _react.PropTypes.number.isRequired,
  /**
   * Extra large gutter; typically used for horizontal padding of ListItems and SubHeaders.
   */
  xLargeGutter: _react.PropTypes.number.isRequired,
  /**
   * Slightly larger medium font size used for emphasis of medium fonts.
   */
  xMediumFontSize: _react.PropTypes.number.isRequired,
  /**
   * Smallest font size used to de-emphasize textual content.
   */
  xSmallFontSize: _react.PropTypes.number.isRequired,
  /**
   * Extra-small gutter spacing. Used for padding between the textual value of a TextField and its border.
   */
  xxSmallGutter: _react.PropTypes.number.isRequired
};
ThemeProvider.defaultProps = {
  theme: _v1Theme2.default
};
ThemeProvider.childContextTypes = {
  theme: _react.PropTypes.shape(ThemeProvider.themeDefinition).isRequired
};
exports.default = ThemeProvider;
process.env.NODE_ENV !== "production" ? ThemeProvider.propTypes = {
  children: _react.PropTypes.element,
  theme: _react.PropTypes.shape(ThemeProvider.themeDefinition).isRequired
} : void 0;