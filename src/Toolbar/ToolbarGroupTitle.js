import React, {Component, PropTypes} from 'react';
import stylePropType from 'react-style-proptype';

export default class ToolbarGroupTitle extends Component {
    static propTypes = {
        text: PropTypes.string.isRequired,
        className: PropTypes.string,
        style: stylePropType
    };

    static defaultProps = {
        className: '',
        style: {}
    };

    constructor(props, ...rest) {
        super(props, ...rest);
    }

    render() {
        const {
            text,
            className,
            style
        } = this.props;
        const titleStyle = Object.assign({}, ToolbarGroupTitle.defaultStyles, style);

        return (
            <h2 className={`toolbar-title ${className}`} style={titleStyle}>{text}</h2>
        );
    }

    static defaultStyles = {
        display: 'inline-block'
    };
}