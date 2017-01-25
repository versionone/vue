import React, {Component, PropTypes} from 'react';
import {findDOMNode} from 'react-dom';
import Popover, {Positions} from './../Popover';
import SubHeader from './../SubHeader';
import TextField from './../TextField';
import ThemeProvider from './../Theme';
import {darken, toRgbaString} from '@andrew-codes/color-functions';

class Lookup extends Component {
    static propTypes = {
        /**
         * Array of strings or nodes that represent each individual result item
         */
        dataSource: PropTypes.arrayOf(PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.node,
        ])),
        /**
         * If true, the field is 100% width
         */
        fullWidth: PropTypes.bool,
        /**
         * Placeholder text
         */
        hintText: PropTypes.string,
        /**
         * When true, the auto complete is open
         */
        open: PropTypes.bool,
        /**
         * When provided, this will render as the sub-header to the result list; otherwise it will not render a sub-header
         */
        resultsHeader: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.node,
        ]),
        /**
         * Width of the text field
         */
        width: PropTypes.number,
    };
    static defaultProps = {
        dataSource: [],
        fullWidth: false,
        hintText: '',
        open: false,
        resultsHeader: null,
        width: 256,
    };
    static contextTypes = {theme: PropTypes.shape(ThemeProvider.themeDefinition).isRequired,};

    constructor(props, ...rest) {
        super(props, ...rest);

        this.handleFocusTextField = this.handleFocusTextField.bind(this);
        this.handleBlurTextField = this.handleBlurTextField.bind(this);
        this.getStyles = this.getStyles.bind(this);

        this.state = {
            open: props.open,
            width: props.width,
        };
    }

    componentDidMount() {
        if (this.props.fullWidth) {
            this.setState({
                width: this.getFullWidth(),
            });
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.fullWidth) {
            this.setState({
                width: this.getFullWidth(),
            });
        }
        else if (this.props.width !== nextProps.width) {
            this.setState({
                width: nextProps.width
            });
        }
    }

    getFullWidth() {
        const textField = findDOMNode(this.textFieldEl);
        return parseInt(window
            .getComputedStyle(textField)
            .width
            .replace('px', '')
        );
    }

    handleFocusTextField() {
        this.setState({open: true});
    }

    handleBlurTextField() {
        this.setState({open: false});
    }

    getStyles() {
        const {
            width,
        } = this.state;
        const {
            fieldBorderColor,
            normalBackground,
            smallGutter,
        } = this.context.theme;

        return {
            resultsPaper: {
                background: normalBackground,
                boxSizing: 'border-box',
                border: `1px solid ${toRgbaString(darken(fieldBorderColor, 0.55))}`,
                padding: `${smallGutter}px`,
                width: `${width}px`,
            },
        }
    }

    render() {
        const {
            dataSource,
            fullWidth,
            hintText,
            resultsHeader,
            width,
        } = this.props;
        const {
            open,
        } = this.state;
        const styles = this.getStyles();

        return (
            <div>
                <TextField
                    ref={(el) => {
                        this.textFieldEl = el;
                    }}
                    fullWidth={fullWidth}
                    hintText={hintText}
                    width={width}
                    onBlur={this.handleBlurTextField}
                    onFocus={this.handleFocusTextField}
                />
                <Popover
                    anchor={this.textFieldEl}
                    anchorOrigin={{
                        horizontal: Positions.left,
                        vertical: Positions.bottom,
                    }}
                    open={open}
                    targetOrigin={{
                        horizontal: Positions.left,
                        vertical: Positions.top,
                    }}
                >
                    <div
                        style={styles.resultsPaper}
                    >
                        {Boolean(resultsHeader) && (
                            <SubHeader>
                                {resultsHeader}
                            </SubHeader>
                        )}
                        {dataSource.length > 0 && (
                            <ol>
                                {dataSource.map((item, itemIndex) => (
                                    <li key={itemIndex}>{item}</li>
                                ))}
                            </ol>
                        )}
                    </div>
                </Popover>
            </div>
        );
    }
}

export default Lookup;
