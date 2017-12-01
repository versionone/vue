'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _redux = require('redux');

var _reduxUi = require('redux-ui');

var _ThemeProvider = require('./../ThemeProvider');

var _ThemeProvider2 = _interopRequireDefault(_ThemeProvider);

var _V1Provider = require('./../V1Provider');

var _V1Provider2 = _interopRequireDefault(_V1Provider);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var VersionOneUIProvider = function VersionOneUIProvider(props, context) {
    var store = context.store;
    if (!store) {
        store = (0, _redux.createStore)((0, _redux.combineReducers)({
            ui: _reduxUi.reducer
        }));
    }
    return _react2.default.createElement(
        _V1Provider2.default,
        { runQuery: props.runQuery },
        _react2.default.createElement(
            _ThemeProvider2.default,
            { theme: props.theme },
            _react2.default.createElement(
                _reactRedux.Provider,
                { store: store },
                props.children
            )
        )
    );
};
process.env.NODE_ENV !== "production" ? VersionOneUIProvider.propTypes = {
    /**
     * Instance of the VersionOne JavaScript SDK
     */
    runQuery: _react.PropTypes.func,
    /**
     * A redux store with `ui` state segment property.
     */
    store: _react.PropTypes.shape({
        dispatch: _react.PropTypes.func.isRequired,
        getState: _react.PropTypes.func.isRequired
    }),
    /**
     * Theme to be used with VersionOne UI
     */
    theme: _react.PropTypes.shape(_ThemeProvider2.default.themeDefinition)
} : void 0;
VersionOneUIProvider.defaultProps = {
    runQuery: function runQuery() {
        console.warn('You have not specified a runQuery function in `VersionOneUIProvider`.');
    }
};
exports.default = VersionOneUIProvider;