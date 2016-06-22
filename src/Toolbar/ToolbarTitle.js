import React, {Component, PropTypes} from 'react';
import * as CustomPropTypes from './../utilities/PropTypes';
import classNames from 'classnames';

export default class ToolbarTitle extends Component {
    static propTypes = {
        text: PropTypes.string.isRequired,
        className: PropTypes.string,
        style: CustomPropTypes.style
    };

    static defaultProps = {
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
        const containerStyle = Object.assign({}, ToolbarTitle.defaultStyles.container, style);
        const titleStyle = Object.assign({}, ToolbarTitle.defaultStyles.title);

        return (
            <div style={containerStyle} className={classNames('toolbar-title', className)} >
                <span style={titleStyle}>{text}</span>
            </div>
        );
    }

    static defaultStyles = {
        container: {
            display: 'flex',
            alignItems: 'center',
            paddingRight: '24px',
            fontSize: '24px',
            lineHeight: 1
        }
    }
}