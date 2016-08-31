import React, {Component, PropTypes} from 'react';
import Title from 'react-title-component';
import SearchResult from './../SearchResult';
import {search} from '../../searchIndex';

export default class extends Component {
    static propTypes = {
        params: PropTypes.shape({
            searchTerm: PropTypes.string.isRequired
        }).isRequired
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
                <ol style={{listStyle: 'none', marginLeft: 0, paddingLeft: 0}}>
                    {results.map((result, index)=>(
                        <li key={index}><SearchResult {...result} /></li>
                    ))}
                </ol>
            </div>
        );
    }
}