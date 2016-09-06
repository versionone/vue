import React, {Component, PropTypes} from 'react';
import withWidth, {MEDIUM, LARGE} from 'material-ui/utils/withWidth';

class ContentPage extends Component {
    static propTypes = {
        children: PropTypes.node,
        style: PropTypes.object
    };

    static contextTypes = {
        muiTheme: PropTypes.object.isRequired
    };

    render() {
        const {prepareStyles} = this.context.muiTheme;
        const {children, style} = this.props;
        const styles = this.getStyles();

        return (
            <div style={prepareStyles({...styles.root, ...style})}>
                <div style={prepareStyles(styles.content)}>
                    {React.cloneElement(children, {
                        onChangeMuiTheme: this.handleChangeMuiTheme,
                    })}
                </div>
            </div>
        );
    }

    getStyles() {
        const {spacing} = this.context.muiTheme;
        const styles = {
            root: {
                paddingTop: spacing.desktopKeylineIncrement,
                minHeight: 400,
            },
            content: {
                margin: spacing.desktopGutter,
            },
            contentWhenMedium: {
                margin: `${spacing.desktopGutter * 2}px ${spacing.desktopGutter * 3}px`,
            }
        };

        if (this.props.width === MEDIUM || this.props.width === LARGE) {
            styles.content = Object.assign(styles.content, styles.contentWhenMedium);
        }

        return styles;
    }
};

export default withWidth()(ContentPage);