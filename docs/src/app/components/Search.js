import React, {Component, PropTypes} from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import searchIndex from './../searchIndex';

export default class extends Component {
    constructor(...rest) {
        super(...rest);
        this.state = {
            dataSource: []
        }
    }

    static contextTypes = {
        router: PropTypes.object.isRequired
    };

    render() {
        const {dataSource} = this.state;
        return (
            <AutoComplete hintText="keywords" floatingLabelText="I'm looking for..." dataSource={dataSource}
                          onUpdateInput={this.searchLunr}
                          onNewRequest={this.navigateToSearchResult}
                          filter={AutoComplete.noFilter} />
        )
    }

    searchLunr = (value) => {
        this.setState({
            dataSource: searchIndex.search(value).map((searchResult) => searchResult.ref)
        });
    };

    navigateToSearchResult = (value) => {
        this.context.router.push(`components/${value}`);
        this.setState({
            dataSource: []
        });
    };
};