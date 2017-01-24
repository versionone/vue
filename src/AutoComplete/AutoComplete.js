import React, {Component, PropTypes} from 'react';
import Popover from './../Popover';
import SubHeader from './../SubHeader';
import TextField from './../TextField';
import ThemeProvider from './../Theme';

class AutoComplete extends Component {
    static propTypes = {
        /**
         * Array of strings or nodes that represent each individual result item
         */
        dataSource: PropTypes.arrayOf(PropTypes.oneOf([PropTypes.string, PropTypes.node])),
        /**
         * When true, the auto complete is open
         */
        open: PropTypes.bool,
        /**
         * When provided, this will render as the sub-header to the result list; otherwise it will not render a sub-header
         */
        resultsHeader: PropTypes.oneOf([PropTypes.string, PropTypes.node]),
    };
    static defaultProps = {
        dataSource: [],
        open: false,
        resultsHeader: null,
    };
    static contextTypes = {theme: PropTypes.shape(ThemeProvider.themeDefinition).isRequired,};

    render() {
        const {
            dataSource,
            open,
            resultsHeader,
        } = this.props;

        return (
            <div>
                <TextField />
                <Popover open={open}>
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
