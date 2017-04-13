'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _reactEventListener = require('react-event-listener');

var _reactEventListener2 = _interopRequireDefault(_reactEventListener);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _lodash = require('lodash.throttle');

var _lodash2 = _interopRequireDefault(_lodash);

var _Radium = require('./../utilities/Radium');

var _Radium2 = _interopRequireDefault(_Radium);

var _RenderToLayer = require('./../internal/RenderToLayer');

var _RenderToLayer2 = _interopRequireDefault(_RenderToLayer);

var _ThemeProvider = require('./../ThemeProvider');

var _ThemeProvider2 = _interopRequireDefault(_ThemeProvider);

var _position = require('./../utilities/position');

var _CustomPropTypes = require('./../utilities/CustomPropTypes');

var CustomPropTypes = _interopRequireWildcard(_CustomPropTypes);

var _Positions = require('./Positions');

var Positions = _interopRequireWildcard(_Positions);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var resizeThrottleValue = 50;
var scrollThrottleValue = 50;
var offScreenThresholdValue = 0;
var centerAlignmentDivisor = 2;
var getTargetPosition = function getTargetPosition(targetElement) {
    return {
        bottom: targetElement.offsetHeight,
        center: targetElement.scrollWidth / centerAlignmentDivisor,
        height: targetElement.offsetHeight,
        left: 0,
        middle: targetElement.offsetHeight / centerAlignmentDivisor,
        right: targetElement.scrollWidth,
        top: 0,
        width: targetElement.scrollWidth
    };
};

var Popover = function (_Component) {
    _inherits(Popover, _Component);

    function Popover() {
        var _ref;

        _classCallCheck(this, Popover);

        for (var _len = arguments.length, rest = Array(_len), _key = 0; _key < _len; _key++) {
            rest[_key] = arguments[_key];
        }

        var _this = _possibleConstructorReturn(this, (_ref = Popover.__proto__ || Object.getPrototypeOf(Popover)).call.apply(_ref, [this].concat(rest)));

        _this.state = {
            closing: false,
            open: _this.props.open
        };
        _this.setPlacement = _this.setPlacement.bind(_this);
        _this.handleRendered = _this.handleRendered.bind(_this);
        _this.handleResize = (0, _lodash2.default)(_this.setPlacement.bind(_this, false), resizeThrottleValue);
        _this.handleScroll = (0, _lodash2.default)(_this.setPlacement.bind(_this, true), scrollThrottleValue);
        _this.renderLayer = _this.renderLayer.bind(_this);
        _this.handleComponentClickAway = _this.handleComponentClickAway.bind(_this);
        _this.autoCloseWhenOffScreen = _this.autoCloseWhenOffScreen.bind(_this);
        return _this;
    }

    _createClass(Popover, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.setPlacement();
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if (nextProps.open === this.state.open) {
                return;
            }
            if (nextProps.open) {
                this.anchorElement = nextProps.anchorElement || this.props.anchorElement;
                this.setState({
                    closing: false,
                    open: true
                });
                return;
            }
            this.setState({
                open: false
            });
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.handleResize = null;
            this.handleScroll = null;
        }
    }, {
        key: 'setPlacement',
        value: function setPlacement(scrolling, evt) {
            var _props = this.props,
                anchorElement = _props.anchorElement,
                anchorOrigin = _props.anchorOrigin,
                autoCloseWhenOffScreen = _props.autoCloseWhenOffScreen,
                open = _props.open,
                targetOrigin = _props.targetOrigin;


            if (!open || !this.layer) {
                return;
            }

            var targetLayer = this.layer.getLayer();
            if (!targetLayer) {
                return;
            }

            var targetElement = targetLayer.children[0];
            if (!targetElement) {
                return;
            }

            var anchorEl = anchorElement || this.anchorElement || (0, _reactDom.findDOMNode)(this);

            var anchorPosition = (0, _position.getPosition)(anchorEl);
            var targetPosition = getTargetPosition(targetElement);
            var adjustedPosition = (0, _position.adjustPosition)(anchorPosition, anchorOrigin, targetPosition, targetOrigin);

            if (scrolling && autoCloseWhenOffScreen) {
                this.autoCloseWhenOffScreen(evt, anchorPosition);
            }
            targetElement.style.left = Math.max(offScreenThresholdValue, adjustedPosition.left) + 'px';
            targetElement.style.maxHeight = window.innerHeight + 'px';
            targetElement.style.top = Math.max(offScreenThresholdValue, adjustedPosition.top) + 'px';
            targetElement.style.width = adjustedPosition.width + 'px';
        }
    }, {
        key: 'handleRendered',
        value: function handleRendered() {
            this.setPlacement();
        }
    }, {
        key: 'renderLayer',
        value: function renderLayer() {
            var children = this.props.children;
            var open = this.state.open;

            if (!open) {
                return null;
            }
            var style = {
                position: 'fixed'
            };
            return _react2.default.createElement(
                'div',
                {
                    style: style
                },
                children
            );
        }
    }, {
        key: 'handleComponentClickAway',
        value: function handleComponentClickAway(evt) {
            this.requestClose(evt, 'clickedAway');
        }
    }, {
        key: 'requestClose',
        value: function requestClose(evt, reason) {
            var onRequestClose = this.props.onRequestClose;

            onRequestClose(evt, reason);
        }
    }, {
        key: 'autoCloseWhenOffScreen',
        value: function autoCloseWhenOffScreen(evt, anchorPosition) {
            if (anchorPosition.top < offScreenThresholdValue || anchorPosition.top > window.innerHeight || anchorPosition.left < offScreenThresholdValue || anchorPosition.left > window.innerWidth) {
                this.requestClose(evt, 'offScreen');
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var open = this.state.open;

            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(_reactEventListener2.default, {
                    target: 'window',
                    onResize: this.handleResize,
                    onScroll: this.handleScroll
                }),
                _react2.default.createElement(_RenderToLayer2.default, {
                    open: open,
                    ref: function ref(el) {
                        _this2.layer = el;
                    },
                    render: this.renderLayer,
                    onComponentClickAway: this.handleComponentClickAway,
                    onRendered: this.handleRendered
                })
            );
        }
    }]);

    return Popover;
}(_react.Component);

Popover.defaultProps = {
    anchorOrigin: {
        horizontal: Positions.left,
        vertical: Positions.bottom
    },
    autoCloseWhenOffScreen: true,
    onRequestClose: function onRequestClose() {},
    open: false,
    targetOrigin: {
        horizontal: Positions.left,
        vertical: Positions.top
    }
};
Popover.contextTypes = {
    theme: _react.PropTypes.shape(_ThemeProvider2.default.themeDefinition).isRequired
};
process.env.NODE_ENV !== "production" ? Popover.propTypes = {
    /**
     * The element to which the popover will relatively render
     */
    anchorElement: _react.PropTypes.object,
    /**
     * The coordinates of the anchor element in which to align to the target popover's origin
     */
    anchorOrigin: CustomPropTypes.origin,
    /**
     * If true, the popover will close when it exits the viewport
     */
    autoCloseWhenOffScreen: _react.PropTypes.bool,
    /**
     * The children to render within the popover
     */
    children: _react.PropTypes.node,
    /**
     * Function called when the popover is requested to close
     */
    onRequestClose: _react.PropTypes.func,
    /**
     * If true, the popover will be visible; otherwise it will not render
     */
    open: _react.PropTypes.bool,
    /**
     * The coordinates of the popover target in which to align to the anchor's origin
     */
    targetOrigin: CustomPropTypes.origin
} : void 0;
exports.default = (0, _Radium2.default)(Popover);