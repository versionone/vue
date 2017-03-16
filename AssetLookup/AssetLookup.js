'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Lookup = require('./../Lookup');

var _Lookup2 = _interopRequireDefault(_Lookup);

var _Filters = require('./../Lookup/Filters');

var Filters = _interopRequireWildcard(_Filters);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AssetLookup = function (_Component) {
    _inherits(AssetLookup, _Component);

    function AssetLookup() {
        var _ref;

        _classCallCheck(this, AssetLookup);

        for (var _len = arguments.length, rest = Array(_len), _key = 0; _key < _len; _key++) {
            rest[_key] = arguments[_key];
        }

        var _this = _possibleConstructorReturn(this, (_ref = AssetLookup.__proto__ || Object.getPrototypeOf(AssetLookup)).call.apply(_ref, [this].concat(rest)));

        _this.state = {
            dataSource: []
        };

        _this.fetchDataSource = _this.fetchDataSource.bind(_this);
        return _this;
    }

    _createClass(AssetLookup, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.fetchDataSource(this.props.query);
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if (this.props.query !== nextProps.query) {
                this.fetchDataSource(nextProps.query);
            }
        }
    }, {
        key: 'fetchDataSource',
        value: function fetchDataSource(query) {
            var _this2 = this;

            this.context.runQuery(query).then(function (results) {
                _this2.setState({
                    dataSource: results
                });
            }).catch(function () {
                _this2.setState([]);
            });
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(_Lookup2.default, _extends({}, this.props, {
                dataSource: this.state.dataSource
            }));
        }
    }]);

    return AssetLookup;
}(_react.Component);

AssetLookup.defaultProps = {
    chipBackgroundColor: '#e9edf1',
    chipColor: '#474c54',
    dataSource: [],
    fullWidth: false,
    hintText: '',
    listHoverBackgroundColor: '#262626',
    listHoverColor: '#fff',
    minimumNumberOfCharactersToFilter: 3,
    onSelect: function onSelect() {},
    open: false,
    resultGroups: [],
    searchFilter: Filters.none,
    searchText: '',
    selectedItems: [],
    width: 256
};
AssetLookup.contextTypes = {
    runQuery: _react.PropTypes.func.isRequired
};
process.env.NODE_ENV !== "production" ? AssetLookup.propTypes = {
    /**
     * Background color of selected item chips
     */
    chipBackgroundColor: _react.PropTypes.string,
    /**
     * Text color of selected item chips
     */
    chipColor: _react.PropTypes.string,
    /**
     * Defines mechanism to convert data source item to: text, rendered list item, and unique key
     */
    dataSourceConfig: _react.PropTypes.shape({
        oidKey: _react.PropTypes.string.isRequired,
        renderItem: _react.PropTypes.func.isRequired,
        renderSelectedItem: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.func]).isRequired
    }).isRequired,
    /**
     * If true, the field is 100% width
     */
    fullWidth: _react.PropTypes.bool,
    /**
     * Placeholder text
     */
    hintText: _react.PropTypes.string,
    /**
     *
     */
    listHoverBackgroundColor: _react.PropTypes.string,
    /**
     *
     */
    listHoverColor: _react.PropTypes.string,
    /**
     * Minimum number of characters required to be typed before applying the filter to the result set
     */
    minimumNumberOfCharactersToFilter: _react.PropTypes.number,
    /**
     * Event handler which fires upon the selection of an item from the results list
     */
    onSelect: _react.PropTypes.func,
    /**
     * When true, the auto complete is open
     */
    open: _react.PropTypes.bool,
    /**
     * Meta query used to populate asset lookup with data
     */
    query: _react.PropTypes.shape({
        from: _react.PropTypes.string.isRequired,
        select: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.arrayOf(_react.PropTypes.string)]).isRequired
    }).isRequired,
    /**
     * Header text when one group, otherwise array of groups with header and group filter func
     */
    resultGroups: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.arrayOf(_react.PropTypes.shape({
        filter: _react.PropTypes.func.isRequired,
        header: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.node]).isRequired
    }))]).isRequired,
    /**
     * Callback function used to filter the lookup; accepts searchText, value of each item, and its index
     */
    searchFilter: _react.PropTypes.func,
    /**
     * Explicitly set the search text to appear in the lookup
     */
    searchText: _react.PropTypes.string,
    /**
     * Sets the selected values of the lookup; is the string key of the selected object in the data source
     */
    selectedItems: _react.PropTypes.arrayOf(_react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.string])),
    /**
     * Width of the text field
     */
    width: _react.PropTypes.number
} : void 0;
exports.default = AssetLookup;