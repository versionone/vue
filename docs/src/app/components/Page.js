import React, {Component, PropTypes} from 'react';
import Title from 'react-title-component';
import MarkdownElement from './MarkdownElement';
import StatusBadge from './StatusBadge';

export default class ComponentPage extends Component {
    static propTypes = {
        title: PropTypes.string,
        status: PropTypes.string,
        readme: PropTypes.string
    };

    render() {
        const {title, status, readme} = this.props;

        return (
            <div>
                <Title render={(previousTitle) => `${title} - ${previousTitle}`} />
                <StatusBadge status={status} />
                <h1>{title}</h1>
                <MarkdownElement text={readme} />
            </div>
        );
    }
}
