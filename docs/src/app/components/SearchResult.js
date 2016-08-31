import React, {Component, PropTypes} from 'react';
import MarkdownElement from './MarkdownElement';
import {Link} from 'react-router';

class SearchResult extends Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        path: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired
    };

    render() {
        const {title, description, path} = this.props;

        return (
            <article>
                <h2><Link to={path}>{title}</Link></h2>
                <MarkdownElement text={description} />
            </article>
        );
    }
}
export default SearchResult;
