import React, {Component, PropTypes} from 'react';
import Title from 'react-title-component';
import SearchResult from './../SearchResult';
import {search} from '../../searchIndex';
import {List, ListItem, MakeSelectable} from 'material-ui/List';
const SelectableList = MakeSelectable(List);

export default class extends Component {
    static propTypes = {
        params: PropTypes.shape({
            searchTerm: PropTypes.string.isRequired
        }).isRequired
    };

    static contextTypes = {
        router: PropTypes.object.isRequired
    };

    constructor(...rest) {
        super(...rest);
        this.state = {
            results: []
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            results: search(nextProps.params.searchTerm)
        });
    }

    render() {
        const {results} = this.state;
        return (
            <div className="markdown-body">
                <Title render={(previousTitle) => `Search Results - ${previousTitle}`} />
                <h2>Search Results</h2>
                <SelectableList
                    value={location.pathname}
                    onChange={this.selectSearchResult}>
                    {results.map((result, index)=>(
                        <ListItem key={index} value={result.path}><SearchResult {...result} /></ListItem>
                    ))}
                </SelectableList>
            </div>
        );
    }

    selectSearchResult = (evt, value) => {
        this.context.router.push(value);
    };
}