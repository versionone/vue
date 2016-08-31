import React, {Component, PropTypes} from 'react';
import MarkdownElement from './MarkdownElement';

class SearchResult extends Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        path: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired
    };

    render() {
        const {title, description} = this.props;

        return (
            <article>
                <h3>{title}</h3>
                <MarkdownElement text={description} />
            </article>
        );
    }
}
export default SearchResult;
