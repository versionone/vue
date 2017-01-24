import React, {Component, PropTypes} from 'react';
import Popover, {Positions} from './../Popover';
import SubHeader from './../SubHeader';
import TextField from './../TextField';
import ThemeProvider from './../Theme';

class AutoComplete extends Component {
    static propTypes = {
        /**
         * Array of strings or nodes that represent each individual result item
         */
        dataSource: PropTypes.arrayOf(PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.node,
        ])),
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
    };
    static defaultProps = {
        dataSource: [],
        open: false,
        resultsHeader: null,
    };
    static contextTypes = {theme: PropTypes.shape(ThemeProvider.themeDefinition).isRequired,};

    constructor(props, ...rest) {
        super(props, ...rest);
        this.state = {
            open: props.open
        };
        this.handleFocusTextField = this.handleFocusTextField.bind(this);
        this.handleBlurTextField = this.handleBlurTextField.bind(this);
    }

    handleFocusTextField() {
        this.setState({open: true});
    }

    handleBlurTextField() {
        this.setState({open: false});
    }

    render() {
        const {
            dataSource,
            resultsHeader,
        } = this.props;
        const {
            open
        } = this.state;

        return (
            <div>
                <TextField
                    ref={(el) => {
                        this.textFieldEl = el;
                    }}
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
                </Popover>
            </div>
        );
    }
}

export default AutoComplete;
