import React, {Component, PropTypes} from 'react';
import Title from 'react-title-component';
import MarkdownElement from './MarkdownElement';
import StatusBadge from './StatusBadge';

export default class ComponentPage extends Component {
    static propTypes = {
        component: PropTypes.node,
        readme: PropTypes.string,
        status: PropTypes.string,
        title: PropTypes.string,
    };

    render() {
        const {
            component,
            readme,
            status,
            title,
        } = this.props;

        return (
            <div>
                <Title render={(previousTitle) => `${title} - ${previousTitle}`} />
                <StatusBadge status={status} />
                <h1>{title}</h1>
                {component && component()}
                {!component && <MarkdownElement text={readme} />}
            </div>
        );
    }
}
