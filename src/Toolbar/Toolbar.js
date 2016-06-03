import React, {Component, PropTypes} from 'react';
import stylePropType from 'react-style-proptype';
import classNames from 'classnames';

export default class Toolbar extends Component {
    static propTypes = {
        children: PropTypes.element,
        className: PropTypes.string,
        style: stylePropType,
        titleStyle: stylePropType
    };

    static defaultProps = {
        style: {},
        titleStyle: {},
        itemStyle: {}
    };

    render() {
        const {
            children,
            className,
            style,
        } = this.props;
        const height = style.height
            ? style.height
            : '56px';

        const toolbarStyle = Object.assign({}, Toolbar.defaultStyles.container, style, {
            height
        });

        return (
            <div className={classNames('toolbar', className)} style={toolbarStyle}>
                {React.Children.map(children, (child, index) => {
                    const style = Object.assign({}, {height},child.props.style);
                    return React.cloneElement(child, {
                        key: index,
                        style
                    });
                })}
            </div>
        );
    }

    static defaultStyles = {
        container: {
            boxSizing: 'border-box',
            display: 'flex',
            padding: '0 1.5rem',
            background: '#cdcdcd',
            minHeight: '56px',
            alignItems: 'center'
        }
    };
}