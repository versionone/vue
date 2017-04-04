'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash.isempty');

var _lodash2 = _interopRequireDefault(_lodash);

var _colorFunctions = require('@andrew-codes/color-functions');

var _Chip = require('./../Chip');

var _Chip2 = _interopRequireDefault(_Chip);

var _HintText = require('./../internal/HintText');

var _HintText2 = _interopRequireDefault(_HintText);

var _List = require('./../List');

var _List2 = _interopRequireDefault(_List);

var _Radium = require('./../utilities/Radium');

var _Radium2 = _interopRequireDefault(_Radium);

var _Popover = require('./../Popover');

var _Popover2 = _interopRequireDefault(_Popover);

var _SubHeader = require('./../SubHeader');

var _SubHeader2 = _interopRequireDefault(_SubHeader);

var _ThemeProvider = require('./../ThemeProvider');

var _ThemeProvider2 = _interopRequireDefault(_ThemeProvider);

var _Transparent = require('./../utilities/Transparent');

var _Transparent2 = _interopRequireDefault(_Transparent);

var _Transitions = require('./../utilities/Transitions');

var _dom = require('./../utilities/dom');

var _Filters = require('./Filters');

var Filters = _interopRequireWildcard(_Filters);

var _KeyCodes = require('./../utilities/KeyCodes');

var KeyCodes = _interopRequireWildcard(_KeyCodes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // TODO: Fix the instances in this file that break the rule below and remove the disabling of this rule for this file.
/* eslint-disable no-underscore-dangle */


var matchOn = function matchOn(prop) {
    return function (valueToMatch) {
        return function (item) {
            return item[prop] === valueToMatch;
        };
    };
};
var matchOid = matchOn('oid');
var matchesOid = function matchesOid(oid) {
    return matchOid(oid);
};

var configureGetChipValues = function configureGetChipValues(dataSourceConfig, dataSource) {
    return function (oid) {
        if (!dataSourceConfig) {
            return {
                oid: oid,
                text: dataSource[oid]
            };
        }
        var matchOnOidKey = matchOn(dataSourceConfig.oidKey);
        var itemData = dataSource.find(matchOnOidKey(oid));
        var text = void 0;
        if (typeof dataSourceConfig.renderSelectedItem === 'string') {
            text = itemData[dataSourceConfig.renderSelectedItem];
        } else {
            text = dataSourceConfig.renderSelectedItem(itemData);
        }

        return {
            oid: oid,
            text: text
        };
    };
};

var Lookup = function (_Component) {
    _inherits(Lookup, _Component);

    function Lookup(props) {
        var _ref;

        _classCallCheck(this, Lookup);

        for (var _len = arguments.length, rest = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            rest[_key - 1] = arguments[_key];
        }

        var _this = _possibleConstructorReturn(this, (_ref = Lookup.__proto__ || Object.getPrototypeOf(Lookup)).call.apply(_ref, [this, props].concat(rest)));

        _this.handleChangeTextField = _this.handleChangeTextField.bind(_this);
        _this.handleLookupRootClick = _this.handleLookupRootClick.bind(_this);
        _this.handleItemSelection = _this.handleItemSelection.bind(_this);
        _this.handleClosePopover = _this.handleClosePopover.bind(_this);
        _this.handleChipRemove = _this.handleChipRemove.bind(_this);
        _this.handleTextFieldKeyDown = _this.handleTextFieldKeyDown.bind(_this);
        _this.handleTextFieldFocus = _this.handleTextFieldFocus.bind(_this);

        _this.setSelectedItem = _this.setSelectedItem.bind(_this);
        _this.getHeight = _this.getHeight.bind(_this);
        _this.getStyles = _this.getStyles.bind(_this);

        _this.renderChip = _this.renderChip.bind(_this);
        _this.renderListItem = _this.renderListItem.bind(_this);
        _this.shouldApplyFilter = _this.shouldApplyFilter.bind(_this);
        _this.combineWithSearchFilter = _this.combineWithSearchFilter.bind(_this);
        _this.renderGroupedResultItems = _this.renderGroupedResultItems.bind(_this);
        _this.applyGroupFilter = _this.applyGroupFilter.bind(_this);

        _this.items = [];

        _this.state = {
            open: props.open,
            searchText: props.searchText,
            selectedItems: props.selectedItems,
            width: props.width
        };
        return _this;
    }

    _createClass(Lookup, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var newState = {};
            if (this.props.fullWidth) {
                newState.width = this.getFullWidth();
            }

            this.setState(_extends({}, newState, {
                height: this.getHeight()
            }));
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            var newState = {};
            if (nextProps.fullWidth) {
                newState.height = this.getHeight();
                newState.width = this.getFullWidth();
            } else if (this.props.width !== nextProps.width) {
                newState.height = this.getHeight();
                newState.width = nextProps.width;
            }
            if (this.props.searchText !== nextProps.searchText) {
                newState.searchText = nextProps.searchText;
            }
            if (this.props.selectedItems !== nextProps.selectedItems) {
                newState.selectedItems = nextProps.selectedItems;
            }
            this.setState(newState);
        }
    }, {
        key: 'getFullWidth',
        value: function getFullWidth() {
            return parseInt(window.getComputedStyle(this.popoverAnchorEl).width.replace('px', ''), 10);
        }
    }, {
        key: 'getHeight',
        value: function getHeight() {
            return Math.max(this.inputField.getBoundingClientRect().height, this.hintTextWrapper.getBoundingClientRect().height);
        }
    }, {
        key: 'setSelectedItem',
        value: function setSelectedItem(evt, oid) {
            var _this2 = this;

            this.setState({
                open: false,
                searchText: '',
                selectedItems: [oid]
            }, function () {
                _this2.inputField.blur();
            });
            this.props.onSelect(evt, oid);
        }
    }, {
        key: 'handleChangeTextField',
        value: function handleChangeTextField(evt) {
            this.setState({
                searchText: evt.target.value
            });
        }
    }, {
        key: 'handleItemSelection',
        value: function handleItemSelection(evt, index) {
            var selectedItem = this.items.find(function (item, itemIndex) {
                return itemIndex === index;
            });
            var selectedOid = selectedItem.oid;
            this.setSelectedItem(evt, selectedOid);
        }
    }, {
        key: 'handleLookupRootClick',
        value: function handleLookupRootClick() {
            this.inputField.focus();
        }
    }, {
        key: 'handleClosePopover',
        value: function handleClosePopover(evt, reason) {
            if ((0, _dom.isDescendant)(this.rootEl, evt.target)) {
                return;
            }
            this.setState({
                open: false
            });
            this.props.onDeactivate(evt, reason);
        }
    }, {
        key: 'handleChipRemove',
        value: function handleChipRemove(evt, oid) {
            evt.stopPropagation();
            this.setState({
                open: false,
                selectedItems: this.state.selectedItems.filter(matchesOid(oid))
            });
            this.props.onDeselect(evt, oid);
        }
    }, {
        key: 'handleTextFieldKeyDown',
        value: function handleTextFieldKeyDown(evt) {
            var _this3 = this;

            if (evt.keyCode !== KeyCodes.Tab) {
                return;
            }
            this.setState({
                open: false
            }, function () {
                _this3.inputField.blur();
            });
            this.props.onDeactivate(evt);
        }
    }, {
        key: 'handleTextFieldFocus',
        value: function handleTextFieldFocus(evt) {
            if (!this.state.open) {
                this.props.onActivate(evt);
            }
            this.setState({
                open: true
            });
        }
    }, {
        key: 'getStyles',
        value: function getStyles() {
            var _props = this.props,
                fullWidth = _props.fullWidth,
                inline = _props.inline,
                prependIcon = _props.prependIcon;
            var _state = this.state,
                height = _state.height,
                open = _state.open,
                width = _state.width;
            var _context$theme = this.context.theme,
                basicFontFamily = _context$theme.basicFontFamily,
                fieldBorderColor = _context$theme.fieldBorderColor,
                focusedPrimaryColor = _context$theme.focusedPrimaryColor,
                normalBackground = _context$theme.normalBackground,
                normalLineHeight = _context$theme.normalLineHeight,
                normalRadius = _context$theme.normalRadius,
                smallFontSize = _context$theme.smallFontSize,
                textPrimaryColor = _context$theme.textPrimaryColor,
                xxSmallGutter = _context$theme.xxSmallGutter;

            var darkenCoefficient = 0.55;
            var paddingMultiplier = 2;
            var borderHeight = 2;
            var textHeight = Math.floor(smallFontSize * normalLineHeight);
            var paddingHeight = xxSmallGutter * paddingMultiplier;
            var textFieldHeight = textHeight + paddingHeight + borderHeight;
            var isHintTextMultipleLines = height > textFieldHeight;
            var marginTop = isHintTextMultipleLines ? height - textHeight + 'px' : '0px';
            var hintTextWrapperHeight = isHintTextMultipleLines ? height + paddingHeight + borderHeight : textFieldHeight;
            var computedWidth = fullWidth ? '100%' : width + 'px';
            var hasIcon = Boolean(prependIcon);
            var borderColor = open ? focusedPrimaryColor : fieldBorderColor;
            var border = {
                borderBottom: '1px solid ' + borderColor,
                borderRight: '1px solid ' + borderColor,
                borderTop: '1px solid ' + borderColor
            };
            if (!hasIcon) {
                border.borderLeft = '1px solid ' + borderColor;
            }
            if (inline) {
                border = {};
            }
            var borderRadius = normalRadius + 'px';
            if (hasIcon) {
                borderRadius = '0 ' + normalRadius + 'px ' + normalRadius + 'px 0';
            }

            return {
                hintTextWrapper: _extends({
                    background: 'rgba(255,255,255,1)'
                }, border, {
                    borderRadius: !inline && borderRadius,
                    boxSizing: 'border-box',
                    height: hintTextWrapperHeight + 'px',
                    padding: xxSmallGutter + 'px',
                    position: 'absolute',
                    top: 0,
                    width: computedWidth
                }),
                input: {
                    background: _Transparent2.default,
                    border: '0px solid ' + _Transparent2.default,
                    boxSizing: 'border-box',
                    color: textPrimaryColor,
                    cursor: 'initial',
                    fontFamily: basicFontFamily,
                    fontSize: smallFontSize + 'px',
                    outline: 'none',
                    padding: 0,
                    position: 'relative',
                    width: '100%'
                },
                inputWrapper: {
                    background: _Transparent2.default,
                    border: '1px solid ' + _Transparent2.default,
                    boxSizing: 'border-box',
                    display: 'inline-flex',
                    marginTop: marginTop,
                    minWidth: width,
                    padding: xxSmallGutter + 'px',
                    width: width,
                    zIndex: 11
                },
                lookupRoot: {
                    background: _Transparent2.default,
                    display: 'flex',
                    height: hintTextWrapperHeight + 'px',
                    position: 'relative',
                    width: computedWidth
                },
                paddingForPopover: {
                    height: hintTextWrapperHeight + 'px'
                },
                prependIcon: {
                    alignItems: 'center',
                    background: open ? focusedPrimaryColor : fieldBorderColor,
                    border: '1px solid ' + borderColor,
                    borderRadius: !inline && normalRadius + 'px 0 0 ' + normalRadius + 'px',
                    boxSizing: 'border-box',
                    display: 'flex',
                    height: hintTextWrapperHeight + 'px',
                    padding: xxSmallGutter + 'px',
                    transition: (0, _Transitions.create)('250ms')
                },
                resultsPaper: {
                    background: normalBackground,
                    border: '1px solid ' + (0, _colorFunctions.toRgbaString)((0, _colorFunctions.darken)(fieldBorderColor, darkenCoefficient)),
                    boxSizing: 'border-box',
                    width: width + 'px'
                },
                root: {
                    display: 'flex',
                    width: computedWidth
                },
                selectedItems: {
                    background: _Transparent2.default,
                    display: 'flex',
                    height: hintTextWrapperHeight + 'px',
                    position: 'absolute',
                    top: 0,
                    width: width,
                    zIndex: 12
                },
                textFieldWrapper: {
                    height: textFieldHeight + 'px',
                    position: 'absolute',
                    top: 0,
                    width: '100%'
                }
            };
        }
    }, {
        key: 'renderChip',
        value: function renderChip(styles) {
            var _this4 = this;

            var _props2 = this.props,
                chipBackgroundColor = _props2.chipBackgroundColor,
                chipColor = _props2.chipColor,
                dataSource = _props2.dataSource,
                dataSourceConfig = _props2.dataSourceConfig;
            var selectedItems = this.state.selectedItems;
            var smallFontSize = this.context.theme.smallFontSize;


            if ((0, _lodash2.default)(selectedItems)) {
                return undefined;
            }

            var getChipValues = configureGetChipValues(dataSourceConfig, dataSource);

            return _react2.default.createElement(
                'div',
                {
                    style: styles.selectedItems
                },
                selectedItems.map(function (item, index) {
                    return _react2.default.createElement(_Chip2.default, _extends({
                        fullWidth: true,
                        backgroundColor: chipBackgroundColor,
                        color: chipColor,
                        fontSize: smallFontSize,
                        key: index,
                        onRequestRemove: _this4.handleChipRemove
                    }, getChipValues(item, index)));
                })
            );
        }
    }, {
        key: 'renderListItem',
        value: function renderListItem(item, index) {
            var dataSourceConfig = this.props.dataSourceConfig;

            var children = item.value;
            if (dataSourceConfig) {
                children = dataSourceConfig.renderItem(item.value, item.index);
            }

            return _react2.default.createElement(
                _List.ListItem,
                {
                    key: index
                },
                children
            );
        }
    }, {
        key: 'shouldApplyFilter',
        value: function shouldApplyFilter() {
            return this.state.searchText.length >= this.props.minimumNumberOfCharactersToFilter;
        }
    }, {
        key: 'combineWithSearchFilter',
        value: function combineWithSearchFilter(filter) {
            var _this5 = this;

            return function (searchText, value, index) {
                return filter(value, index) && (!_this5.shouldApplyFilter() || _this5.props.searchFilter(searchText, value, index));
            };
        }
    }, {
        key: 'applyGroupFilter',
        value: function applyGroupFilter(dataSource, groupFilter, dataSourceConfig) {
            var _this6 = this;

            var filter = this.combineWithSearchFilter(groupFilter);
            return dataSource.map(function (item, index) {
                return {
                    index: index,
                    oid: dataSourceConfig ? item[dataSourceConfig.oidKey] || index : index,
                    value: item
                };
            }).filter(function (item, index) {
                return filter(_this6.state.searchText, item.value, index);
            });
        }
    }, {
        key: 'renderGroupedResultItems',
        value: function renderGroupedResultItems(groups) {
            var _this7 = this;

            var _props3 = this.props,
                dataSource = _props3.dataSource,
                dataSourceConfig = _props3.dataSourceConfig;


            if (typeof groups === 'string') {
                this.items = [{
                    __type: 'SubHeader',
                    header: groups
                }].concat(this.applyGroupFilter(dataSource, Filters.none, dataSourceConfig));
            } else {
                this.items = groups.reduce(function (output, group) {
                    return output.concat([_extends({
                        __type: 'SubHeader'
                    }, group)]).concat(_this7.applyGroupFilter(dataSource, group.filter, dataSourceConfig));
                }, []);
            }

            return this.items.map(function (item, index) {
                if (item.__type === 'SubHeader') {
                    return _react2.default.createElement(
                        _SubHeader2.default,
                        { key: 'subheader' + index },
                        item.header
                    );
                }
                return _this7.renderListItem(item, index);
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this8 = this;

            var _props4 = this.props,
                hintText = _props4.hintText,
                listHoverBackgroundColor = _props4.listHoverBackgroundColor,
                listHoverColor = _props4.listHoverColor,
                prependIcon = _props4.prependIcon,
                resultGroups = _props4.resultGroups;
            var _state2 = this.state,
                searchText = _state2.searchText,
                selectedItems = _state2.selectedItems,
                open = _state2.open;
            var normalBackground = this.context.theme.normalBackground;

            var isHintTextHidden = Boolean(searchText) || !(0, _lodash2.default)(selectedItems);
            var styles = this.getStyles();

            return _react2.default.createElement(
                'div',
                {
                    ref: function ref(el) {
                        _this8.rootEl = el;
                    },
                    style: styles.root
                },
                Boolean(prependIcon) && _react2.default.createElement(
                    'div',
                    {
                        style: styles.prependIcon
                    },
                    _react2.default.createElement(prependIcon, {
                        color: normalBackground
                    })
                ),
                _react2.default.createElement(
                    'div',
                    {
                        ref: function ref(el) {
                            _this8.popoverAnchorEl = el;
                        },
                        style: styles.lookupRoot,
                        onClick: this.handleLookupRootClick
                    },
                    _react2.default.createElement('div', { style: styles.paddingForPopover }),
                    this.renderChip(styles),
                    _react2.default.createElement(
                        'div',
                        { style: styles.textFieldWrapper },
                        _react2.default.createElement(
                            'div',
                            { style: styles.hintTextWrapper },
                            _react2.default.createElement(
                                'div',
                                {
                                    ref: function ref(el) {
                                        _this8.hintTextWrapper = el;
                                    }
                                },
                                _react2.default.createElement(_HintText2.default, {
                                    hidden: isHintTextHidden,
                                    text: hintText
                                })
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            {
                                ref: function ref(el) {
                                    _this8.inputWrapper = el;
                                },
                                style: styles.inputWrapper
                            },
                            _react2.default.createElement('input', {
                                ref: function ref(el) {
                                    _this8.inputField = el;
                                },
                                style: styles.input,
                                type: 'text',
                                value: searchText,
                                onChange: this.handleChangeTextField,
                                onFocus: this.handleTextFieldFocus,
                                onKeyDown: this.handleTextFieldKeyDown
                            })
                        )
                    ),
                    _react2.default.createElement(
                        _Popover2.default,
                        {
                            anchorElement: this.popoverAnchorEl,
                            anchorOrigin: {
                                horizontal: _Popover.Positions.left,
                                vertical: _Popover.Positions.bottom
                            },
                            open: open,
                            targetOrigin: {
                                horizontal: _Popover.Positions.left,
                                vertical: _Popover.Positions.top
                            },
                            onRequestClose: this.handleClosePopover
                        },
                        _react2.default.createElement(
                            'div',
                            {
                                style: styles.resultsPaper
                            },
                            _react2.default.createElement(
                                _List2.default,
                                {
                                    active: open,
                                    hoverBackgroundColor: listHoverBackgroundColor,
                                    hoverColor: listHoverColor,
                                    onSelectItem: this.handleItemSelection
                                },
                                this.renderGroupedResultItems(resultGroups)
                            )
                        )
                    )
                )
            );
        }
    }]);

    return Lookup;
}(_react.Component);

Lookup.defaultProps = {
    chipBackgroundColor: '#e9edf1',
    chipColor: '#474c54',
    dataSource: [],
    fullWidth: false,
    hintText: '',
    inline: false,
    listHoverBackgroundColor: '#262626',
    listHoverColor: '#fff',
    minimumNumberOfCharactersToFilter: 3,
    onActivate: function onActivate() {},
    onDeactivate: function onDeactivate() {},
    onDeselect: function onDeselect() {},
    onSelect: function onSelect() {},
    open: false,
    resultGroups: [],
    searchFilter: Filters.none,
    searchText: '',
    selectedItems: [],
    width: 256
};
Lookup.contextTypes = {
    theme: _react.PropTypes.shape(_ThemeProvider2.default.themeDefinition).isRequired
};
process.env.NODE_ENV !== "production" ? Lookup.propTypes = {
    /**
     * Background color of selected item chips
     */
    chipBackgroundColor: _react.PropTypes.string,
    /**
     * Text color of selected item chips
     */
    chipColor: _react.PropTypes.string,
    /**
     * Array of all possible date items to be filtered when searching using the lookup; uniqueness is either the index of the item (when an array of strings) or defined by the dataSourceConfig's oidKey
     */
    dataSource: _react.PropTypes.arrayOf(_react.PropTypes.oneOfType([_react.PropTypes.object, _react.PropTypes.string])),
    /**
     * Defines mechanism to convert data source item to: text, rendered list item, and unique key
     */
    dataSourceConfig: _react.PropTypes.shape({
        oidKey: _react.PropTypes.string.isRequired,
        renderItem: _react.PropTypes.func.isRequired,
        renderSelectedItem: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.func]).isRequired
    }),
    /**
     * If true, the field is 100% width
     */
    fullWidth: _react.PropTypes.bool,
    /**
     * Placeholder text
     */
    hintText: _react.PropTypes.string,
    /**
     * When true, renders without border. Useful for using within other components.
     */
    inline: _react.PropTypes.bool,
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
     * Event handler which fires upon engaging the Lookup; clicking on it to open
     */
    onActivate: _react.PropTypes.func,
    /**
     * Event handler which fires when Lookup is dis-engaged or closed.
     */
    onDeactivate: _react.PropTypes.func,
    /**
     * Event handler which fires upon the removal of an item from the results list
     */
    onDeselect: _react.PropTypes.func,
    /**
     * Event handler which fires upon the selection of an item from the results list
     */
    onSelect: _react.PropTypes.func,
    /**
     * When true, the auto complete is open
     */
    open: _react.PropTypes.bool,
    /**
     * If provided, will prepend the icon to the Lookup field.
     */
    prependIcon: _react.PropTypes.node,
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
exports.default = (0, _Radium2.default)(Lookup);