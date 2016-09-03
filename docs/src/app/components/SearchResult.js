import React, {Component, PropTypes} from 'react';
import MarkdownElement from './MarkdownElement';
import {cerulean} from 'vue/styles/themes/v1Theme/colors';

class SearchResult extends Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        path: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired
    };

    render() {
        const {title, description} = this.props;

        return (
            <article className="search-result">
                <h3 style={{color: cerulean}}>{title}</h3>
                <MarkdownElement text={description} />
            </article>
        );
    }
}
export default SearchResult;
