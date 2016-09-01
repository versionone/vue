import React, {Component, PropTypes} from 'react';
import Drawer from 'material-ui/Drawer';
import {spacing, typography, zIndex} from 'material-ui/styles';
import {cerulean, gunSmoke} from 'versionone-ui/styles/themes/v1Theme/colors';
import Editor from './Editor';

const styles = {
    drawerContents: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
    },
    header: {
        cursor: 'pointer',
        fontSize: 24,
        color: typography.textFullWhite,
        lineHeight: `${spacing.desktopKeylineIncrement}px`,
        fontWeight: typography.fontWeightLight,
        backgroundColor: cerulean,
        paddingLeft: spacing.desktopGutter,
        borderBottom: `8px solid ${gunSmoke}`,
    },
    section: {
        flex: 1,
        display: 'flex'
    }
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
        const {prepareStyles} = this.context.muiTheme;
        const sectionStyles = prepareStyles(styles.section);
        
        return (
            <Drawer
                style={style}
                openSecondary={true}
                docked={docked}
                open={open}
                onRequestChange={onRequestChange}
                containerStyle={{zIndex: zIndex.drawer - 100}}
                width={850}>
                <div style={prepareStyles(styles.drawerContents)}>
                    <header style={styles.header} onTouchTap={this.handleTouchTapHeader}>
                        Code Playground
                    </header>
                    <section style={sectionStyles}>
                        <Editor code={code} />
                    </section>
                    <section style={sectionStyles}>
                        Here is where the code will render live.
                    </section>
                </div>
            </Drawer>
        );
    }

    handleTouchTapHeader = () => {
        this.props.onRequestChange(false);
    };
}

export default PlaygroundDrawer;