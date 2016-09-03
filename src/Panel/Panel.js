import React, {Component, PropTypes} from 'react';

const getStyles = (props, context) => {
    const {
        panel
    } = context.theme;

    return {
        root: {
            color: panel.color,
            backgroundColor: panel.backgroundColor,
            boxSizing: 'border-box',
            fontFamily: panel.fontFamily
        }
    };
};

class Panel extends Component {
    static propTypes = {
        children: PropTypes.node,
        style: PropTypes.object
    };

    static contextTypes = {
        theme: PropTypes.object.isRequired
    };

    render() {
        const {
            children,
            style,
            ...rest
        } = this.props;

        const {prepareStyles} = this.context.theme;
        const styles = getStyles(this.props, this.context);

        return (
            <div {...rest} style={prepareStyles({...styles.root, ...style})}>
                {children}
            </div>
        );
    }
}

export default Panel;
