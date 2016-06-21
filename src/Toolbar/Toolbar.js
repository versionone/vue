import React, {Component, PropTypes} from 'react';
import stylePropType from 'react-style-proptype';
import classNames from 'classnames';

export const getStyles = (props, context) => {
    const height = props.style.height
        ? props.style.height
        : '56px';

    return {
        root: {
            height,
            boxSizing: 'border-box',
            display: 'flex',
            padding: '0 1.5rem',
            background: '#cdcdcd'
        },
        children: {
            height
        }
    };
};

export default class Toolbar extends Component {
    static propTypes = {
        className: PropTypes.string,
        style: stylePropType
    };

    static contextTypes = {
        theme: PropTypes.object.isRequired
    };

    static defaultProps = {
        style: {}
    };

    render() {
        const {
            children,
            className,
            style,
        } = this.props;
        const {prepareStyles} = this.context.theme;
        const styles = getStyles(this.props, this.context);

        return (
            <div className={classNames('toolbar', className)}
                 style={prepareStyles( styles.root, style)}>
                {React.Children.map(children, (child, index) => React.cloneElement(child, {
                    key: index,
                    style: prepareStyles(styles.children)
                }))}
            </div>
        );
    }
}