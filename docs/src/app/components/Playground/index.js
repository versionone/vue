import React, {Component, PropTypes} from 'react';
import Drawer from 'material-ui/Drawer';
import {spacing, typography, zIndex} from 'material-ui/styles';
import {corpRed} from 'versionone-ui/styles/themes/v1Theme/colors';
import Editor from './Editor';

const styles = {
    toolbar: {
        cursor: 'pointer',
        fontSize: 24,
        color: typography.textFullWhite,
        lineHeight: `${spacing.desktopKeylineIncrement}px`,
        fontWeight: typography.fontWeightLight,
        backgroundColor: corpRed,
        paddingLeft: spacing.desktopGutter,
        marginBottom: 8,
    },
    version: {
        paddingLeft: spacing.desktopGutterLess,
        fontSize: 16,
    },
    search: {
        paddingLeft: spacing.desktopGutterLess,
        paddingRight: spacing.desktopGutterLess,
        fontSize: 16,
    },
};

class PlaygroundDrawer extends Component {
    static propTypes = {
        docked: PropTypes.bool.isRequired,
        onRequestChange: PropTypes.func.isRequired,
        open: PropTypes.bool.isRequired,
        style: PropTypes.object,
        code: PropTypes.string.isRequired
    };

    static contextTypes = {
        muiTheme: PropTypes.object.isRequired,
    };

    render() {
        const {
            docked,
            onRequestChange,
            open,
            style,
            code
        } = this.props;

        return (
            <Drawer
                style={style}
                openSecondary={true}
                docked={docked}
                open={open}
                onRequestChange={onRequestChange}
                containerStyle={{zIndex: zIndex.drawer - 100}}
                width={850}>
                <div style={styles.toolbar} onTouchTap={this.handleTouchTapHeader}>
                    Code Playground
                </div>
                <Editor code={code} />
            </Drawer>
        );
    }

    handleTouchTapHeader = () => {
        this.props.onRequestChange(false);
    };
}

export default PlaygroundDrawer;