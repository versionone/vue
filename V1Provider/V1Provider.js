'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var V1Provider = function (_Component) {
    _inherits(V1Provider, _Component);

    function V1Provider() {
        _classCallCheck(this, V1Provider);

        return _possibleConstructorReturn(this, (V1Provider.__proto__ || Object.getPrototypeOf(V1Provider)).apply(this, arguments));
    }

    _createClass(V1Provider, [{
        key: 'getChildContext',
        value: function getChildContext() {
            return {
                runQuery: this.props.runQuery
            };
        }
    }, {
        key: 'render',
        value: function render() {
            return this.props.children;
        }
    }]);

    return V1Provider;
}(_react.Component);

V1Provider.childContextTypes = {
    runQuery: _react.PropTypes.func.isRequired
};
process.env.NODE_ENV !== "production" ? V1Provider.propTypes = {
    /**
     * Query function used to resolve meta queries to hydrated asset item data
     */
    runQuery: _react.PropTypes.func.isRequired
} : void 0;
exports.default = V1Provider;