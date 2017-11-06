'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _reactEventListener = require('react-event-listener');

var _reactEventListener2 = _interopRequireDefault(_reactEventListener);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _scrollIntoView = require('scroll-into-view');

var _scrollIntoView2 = _interopRequireDefault(_scrollIntoView);

var _reduxUi = require('redux-ui');

var _reduxUi2 = _interopRequireDefault(_reduxUi);

var _ListItem = require('./ListItem');

var _ListItem2 = _interopRequireDefault(_ListItem);

var _Radium = require('./../utilities/Radium');

var _Radium2 = _interopRequireDefault(_Radium);

var _SubHeader = require('./../SubHeader');

var _SubHeader2 = _interopRequireDefault(_SubHeader);

var _component = require('./../utilities/component');

var _KeyCodes = require('./../utilities/KeyCodes');

var _CustomPropTypes = require('./../utilities/CustomPropTypes');

var CustomPropTypes = _interopRequireWildcard(_CustomPropTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var noSelectedItemIndex = -1;
var lowestSelectedItemIndex = 0;
var selectedItemIndexIncrement = 1;

var List = function (_Component) {
    _inherits(List, _Component);

    function List() {
        var _ref;

        _classCallCheck(this, List);

        for (var _len = arguments.length, rest = Array(_len), _key = 0; _key < _len; _key++) {
            rest[_key] = arguments[_key];
        }

        var _this = _possibleConstructorReturn(this, (_ref = List.__proto__ || Object.getPrototypeOf(List)).call.apply(_ref, [this].concat(rest)));

        _this.listItemEls = {};

        _this.getChildProps = _this.getChildProps.bind(_this);
        _this.getCurrentIndex = _this.getCurrentIndex.bind(_this);
        _this.getNextListItemIndex = _this.getNextListItemIndex.bind(_this);
        _this.getPreviousListItemIndex = _this.getPreviousListItemIndex.bind(_this);
        _this.highlightItem = _this.highlightItem.bind(_this);
        _this.scrollToHighlightedItem = _this.scrollToHighlightedItem.bind(_this);

        _this.handleKeyDown = _this.handleKeyDown.bind(_this);
        _this.handleKeyUp = _this.handleKeyUp.bind(_this);
        _this.handleMouseEnterItem = _this.handleMouseEnterItem.bind(_this);

        _this.getStyles = _this.getStyles.bind(_this);
        return _this;
    }

    _createClass(List, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.scrollToHighlightedItem();
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if (this.props.highlightedIndex !== nextProps.highlightedIndex || this.props.ui.highlightedIndex !== nextProps.ui.highlightedIndex) {
                this.scrollToHighlightedItem();
            }
        }
    }, {
        key: 'getChildProps',
        value: function getChildProps(child, index) {
            if (child.type.displayName === 'ListItem') {
                var _props = this.props,
                    highlightBackgroundColor = _props.highlightBackgroundColor,
                    highlightColor = _props.highlightColor;

                var highlightedIndex = this.getCurrentIndex();
                return {
                    highlightBackgroundColor: highlightBackgroundColor,
                    highlightColor: highlightColor,
                    highlighted: index === highlightedIndex,
                    key: index,
                    onMouseEnter: this.handleMouseEnterItem(index)
                };
            }
            return {
                key: index
            };
        }
    }, {
        key: 'getCurrentIndex',
        value: function getCurrentIndex() {
            return this.props.ui.highlightedIndex || this.props.highlightedIndex || noSelectedItemIndex;
        }
    }, {
        key: 'getNextListItemIndex',
        value: function getNextListItemIndex() {
            var nextIndex = this.getCurrentIndex() + selectedItemIndexIncrement;
            while (nextIndex < this.props.children.length && this.props.children[nextIndex].type.displayName !== 'ListItem') {
                nextIndex += selectedItemIndexIncrement;
            }
            return Math.min(this.props.children.length - selectedItemIndexIncrement, nextIndex);
        }
    }, {
        key: 'getPreviousListItemIndex',
        value: function getPreviousListItemIndex() {
            var previousIndex = this.getCurrentIndex() - selectedItemIndexIncrement;
            while (previousIndex >= lowestSelectedItemIndex && this.props.children[previousIndex].type.displayName !== 'ListItem') {
                previousIndex -= selectedItemIndexIncrement;
            }
            return Math.max(selectedItemIndexIncrement, previousIndex);
        }
    }, {
        key: 'highlightItem',
        value: function highlightItem(evt, index) {
            var keyboardTriggered = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

            this.props.updateUI({
                highlightedIndex: index,
                keyboardTriggered: keyboardTriggered
            });
            this.props.onHighlightItem(evt, index);
        }
    }, {
        key: 'scrollToHighlightedItem',
        value: function scrollToHighlightedItem() {
            var ui = this.props.ui;

            if (!ui.keyboardTriggered) {
                return;
            }
            var highlightedIndex = this.getCurrentIndex();
            var highlightedEl = this.listItemEls[highlightedIndex];
            if (!highlightedEl) {
                return;
            }
            (0, _scrollIntoView2.default)(highlightedEl);
        }
    }, {
        key: 'handleKeyDown',
        value: function handleKeyDown(evt) {
            var active = this.props.active;


            if (!active) {
                return null;
            }

            if (evt.keyCode === _KeyCodes.ArrowUp) {
                return this.highlightItem(evt, this.getPreviousListItemIndex(), true);
            } else if (evt.keyCode === _KeyCodes.ArrowDown) {
                return this.highlightItem(evt, this.getNextListItemIndex(), true);
            }
            return null;
        }
    }, {
        key: 'handleKeyUp',
        value: function handleKeyUp(evt) {
            var _props2 = this.props,
                active = _props2.active,
                onSelectItem = _props2.onSelectItem;


            if (!active) {
                return null;
            }
            if (evt.keyCode === _KeyCodes.Enter) {
                return onSelectItem(evt, this.getCurrentIndex(this.props));
            }
            return null;
        }
    }, {
        key: 'handleMouseEnterItem',
        value: function handleMouseEnterItem(index) {
            var _this2 = this;

            return function (evt) {
                return _this2.highlightItem(evt, index);
            };
        }
    }, {
        key: 'getStyles',
        value: function getStyles() {
            var maxHeight = this.props.maxHeight;
            var theme = this.context.theme;


            return {
                list: {
                    backgroundColor: 'white',
                    fontFamily: theme.basicFontFamily,
                    fontSize: theme.smallFontSize,
                    maxHeight: Boolean(maxHeight) && maxHeight + 'px',
                    overflow: 'auto'
                }
            };
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            var _props3 = this.props,
                children = _props3.children,
                onMouseEnter = _props3.onMouseEnter,
                onMouseLeave = _props3.onMouseLeave,
                onSelectItem = _props3.onSelectItem;

            var styles = this.getStyles();

            return _react2.default.createElement(
                'div',
                {
                    style: styles.list,
                    onMouseEnter: onMouseEnter,
                    onMouseLeave: onMouseLeave
                },
                _react2.default.createElement(_reactEventListener2.default, {
                    target: 'window',
                    onKeyDown: this.handleKeyDown,
                    onKeyUp: this.handleKeyUp
                }),
                _react2.default.Children.map(children, function (child, index) {
                    return Boolean(child) && _react2.default.createElement(
                        'div',
                        {
                            ref: function ref(el) {
                                _this3.listItemEls[index] = el;
                            },
                            onClick: (0, _component.createConditionalEventHandler)(child.type.displayName === 'ListItem')(onSelectItem, index)
                        },
                        _react2.default.cloneElement(child, _this3.getChildProps(child, index))
                    );
                })
            );
        }
    }]);

    return List;
}(_react.Component);

process.env.NODE_ENV !== "production" ? List.propTypes = {
    /**
     * Indicates List should respond to keyup events
     */
    active: _react.PropTypes.bool,
    /**
     * ListItem or SubHeader components.
     */
    children: CustomPropTypes.oneOfComponentType([_ListItem2.default, _SubHeader2.default]),
    /**
     * Background color used when list item is highlighted
     */
    highlightBackgroundColor: _react.PropTypes.string,
    /**
     * Font color used on when list item is highlighted
     */
    highlightColor: _react.PropTypes.string,
    /**
     * Index of the currently highlighted list item
     */
    highlightedIndex: _react.PropTypes.number,
    /**
     * Maximum height of the list before a scroll bar
     */
    maxHeight: _react.PropTypes.number,
    /**
     * Callback fired when an item is highlighted
     */
    onHighlightItem: _react.PropTypes.func,
    /**
     * Callback fired when mouse enters List
     */
    onMouseEnter: _react.PropTypes.func,
    /**
     * Callback fired when mouse leaves list
     */
    onMouseLeave: _react.PropTypes.func,
    /**
     * Callback fired when an item is selected
     */
    onSelectItem: _react.PropTypes.func,
    /**
     * Managed UI state props; can be overridden
     */
    ui: _react.PropTypes.shape({
        highlightedIndex: _react.PropTypes.number,
        keyboardTriggered: _react.PropTypes.bool
    }),
    /**
     * Callback fired when a ui prop related action is dispatched
     */
    updateUI: _react.PropTypes.func
} : void 0;
List.defaultProps = {
    active: false,
    highlightBackgroundColor: '#262626',
    highlightColor: '#fff',
    onHighlightItem: function onHighlightItem() {},
    onMouseEnter: function onMouseEnter() {},
    onMouseLeave: function onMouseLeave() {},
    onSelectItem: function onSelectItem() {},
    updateUI: function updateUI() {}
};
List.contextTypes = {
    theme: _react.PropTypes.object.isRequired
};
List.displayName = 'List';

exports.default = (0, _Radium2.default)((0, _reduxUi2.default)({
    state: {
        highlightedIndex: null,
        keyboardTriggered: false
    }
})(List));