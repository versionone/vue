import React, {Component, PropTypes} from 'react';
import Lookup from './../Lookup';
import * as Filters from './../Lookup/Filters';

class AssetLookup extends Component {
    static propTypes = {
        /**
         * Background color of selected item chips
         */
        chipBackgroundColor: PropTypes.string,
        /**
         * Text color of selected item chips
         */
        chipColor: PropTypes.string,
        /**
         * Defines mechanism to convert data source item to: text, rendered list item, and unique key
         */
        dataSourceConfig: PropTypes.shape({
            oidKey: PropTypes.string.isRequired,
            renderItem: PropTypes.func.isRequired,
            renderSelectedItem: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.func,
            ]).isRequired,
        }).isRequired,
        /**
         * If true, the field is 100% width
         */
        fullWidth: PropTypes.bool,
        /**
         * Placeholder text
         */
        hintText: PropTypes.string,
        /**
         *
         */
        listHoverBackgroundColor: PropTypes.string,
        /**
         *
         */
        listHoverColor: PropTypes.string,
        /**
         * Minimum number of characters required to be typed before applying the filter to the result set
         */
        minimumNumberOfCharactersToFilter: PropTypes.number,
        /**
         * Event handler which fires upon the selection of an item from the results list
         */
        onSelect: PropTypes.func,
        /**
         * When true, the auto complete is open
         */
        open: PropTypes.bool,
        /**
         * Meta query used to populate asset lookup with data
         */
        query: PropTypes.shape({
            from: PropTypes.string.isRequired,
            select: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.arrayOf(PropTypes.string),
            ]).isRequired,
        }).isRequired,
        /**
         * Header text when one group, otherwise array of groups with header and group filter func
         */
        resultGroups: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.arrayOf(PropTypes.shape({
                filter: PropTypes.func.isRequired,
                header: PropTypes.oneOfType([
                    PropTypes.string,
                    PropTypes.node,
                ]).isRequired,
            })),
        ]).isRequired,
        /**
         * Callback function used to filter the lookup; accepts searchText, value of each item, and its index
         */
        searchFilter: PropTypes.func,
        /**
         * Explicitly set the search text to appear in the lookup
         */
        searchText: PropTypes.string,
        /**
         * Sets the selected values of the lookup; is the string key of the selected object in the data source
         */
        selectedItems: PropTypes.arrayOf(PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string,
        ])),
        /**
         * Width of the text field
         */
        width: PropTypes.number,
    };
    static defaultProps = {
        chipBackgroundColor: '#e9edf1',
        chipColor: '#474c54',
        dataSource: [],
        fullWidth: false,
        hintText: '',
        listHoverBackgroundColor: '#262626',
        listHoverColor: '#fff',
        minimumNumberOfCharactersToFilter: 3,
        onSelect: () => {
        },
        open: false,
        resultGroups: [],
        searchFilter: Filters.none,
        searchText: '',
        selectedItems: [],
        width: 256,
    };
    static contextTypes = {
        runQuery: PropTypes.func.isRequired,
    };

    constructor(...rest) {
        super(...rest);

        this.state = {
            dataSource: [],
        };

        this.fetchDataSource = this.fetchDataSource.bind(this);
    }

    componentDidMount() {
        this.fetchDataSource(this.props.query);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.query !== nextProps.query) {
            this.fetchDataSource(nextProps.query);
        }
    }

    fetchDataSource(query) {
        this.context.runQuery(query)
            .then((results) => {
                this.setState({
                    dataSource: results,
                });
            })
            .catch(() => {
                this.setState([]);
            });
    }

    render() {
        return (
            <Lookup
                {...this.props}
                dataSource={this.state.dataSource}
            />
        );
    }
}

export default AssetLookup;
