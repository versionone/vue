import React, {Component, PropTypes} from 'react';
import MarkdownElement from './MarkdownElement';
import {cerulean} from 'vue/styles/themes/v1Theme/foundations/colors';

class SearchResult extends Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        path: PropTypes.string.isRequired,
        readme: PropTypes.string.isRequired
    };

    render() {
        const {title, readme} = this.props;
        const description = `${readme.substring(0, 150)}...`;

        return (
            <article className="search-result">
                <h3 style={{color: cerulean}}>{title}</h3>
                <MarkdownElement text={description} />
            </article>
        );
    }
}
export default SearchResult;
