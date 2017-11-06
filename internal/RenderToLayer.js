'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _reactDom = require('react-dom');

var _dom = require('./../utilities/dom');

var _ThemeProvider = require('./../ThemeProvider');

var _ThemeProvider2 = _interopRequireDefault(_ThemeProvider);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// eslint-disable-next-line camelcase


var immediateTimeOutValue = 0;

var RenderToLayer = function (_Component) {
    _inherits(RenderToLayer, _Component);

    function RenderToLayer() {
        var _ref;

        _classCallCheck(this, RenderToLayer);

        for (var _len = arguments.length, rest = Array(_len), _key = 0; _key < _len; _key++) {
            rest[_key] = arguments[_key];
        }

        var _this = _possibleConstructorReturn(this, (_ref = RenderToLayer.__proto__ || Object.getPrototypeOf(RenderToLayer)).call.apply(_ref, [this].concat(rest)));

        _this.getLayer = _this.getLayer.bind(_this);
        _this.createLayer = _this.createLayer.bind(_this);
        _this.renderLayer = _this.renderLayer.bind(_this);
        _this.unrenderLayer = _this.unrenderLayer.bind(_this);
        _this.handleClickAway = _this.handleClickAway.bind(_this);
        return _this;
    }

    _createClass(RenderToLayer, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.renderLayer();
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            this.renderLayer();
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.unrenderLayer();
        }
    }, {
        key: 'getLayer',
        value: function getLayer() {
            return this.layer;
        }
    }, {
        key: 'createLayer',
        value: function createLayer() {
            if (this.layer) {
                return this.layer;
            }
            this.layer = document.createElement('div');
            document.body.appendChild(this.layer);
            return this.layer;
        }
    }, {
        key: 'renderLayer',
        value: function renderLayer() {
            var _this2 = this;

            var _props = this.props,
                open = _props.open,
                render = _props.render,
                onRendered = _props.onRendered;

            if (!open) {
                this.unrenderLayer();
                return;
            }

            var layer = this.createLayer();
            var renderedLayerContent = render();
            if (!renderedLayerContent) {
                this.unrenderLayer();
                return;
            }

            setTimeout(function () {
                addEventListener('click', _this2.handleClickAway);
            }, immediateTimeOutValue);

            this.layerElement = (0, _reactDom.unstable_renderSubtreeIntoContainer)(this, renderedLayerContent, layer, onRendered);
        }
    }, {
        key: 'unrenderLayer',
        value: function unrenderLayer() {
            if (!this.layer) {
                return;
            }
            removeEventListener('click', this.handleClickAway);
            (0, _reactDom.unmountComponentAtNode)(this.layer);
            document.body.removeChild(this.layer);
            this.layer = null;
        }
    }, {
        key: 'handleClickAway',
        value: function handleClickAway(evt) {
            var _props2 = this.props,
                open = _props2.open,
                onComponentClickAway = _props2.onComponentClickAway;

            if (evt.defaultPrevented || !open) {
                return;
            }
            var el = this.layer;
            var handlingClickAway = evt.target !== el && (evt.target === window || document.documentElement.contains(evt.target) && !(0, _dom.isDescendant)(el, evt.target));
            if (handlingClickAway) {
                onComponentClickAway(evt);
            }
        }

        // eslint-disable-next-line class-methods-use-this

    }, {
        key: 'render',
        value: function render() {
            return null;
        }
    }]);

    return RenderToLayer;
}(_react.Component);

RenderToLayer.defaultProps = {
    onComponentClickAway: function onComponentClickAway() {}
};
RenderToLayer.contextTypes = {
    store: _react.PropTypes.object,
    theme: _react.PropTypes.shape(_ThemeProvider2.default.themeDefinition).isRequired
};
process.env.NODE_ENV !== "production" ? RenderToLayer.propTypes = {
    onComponentClickAway: _react.PropTypes.func,
    onRendered: _react.PropTypes.func,
    open: _react.PropTypes.bool.isRequired,
    render: _react.PropTypes.func.isRequired
} : void 0;
exports.default = RenderToLayer;