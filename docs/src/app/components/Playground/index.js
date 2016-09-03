import React, {Component, PropTypes} from 'react';
import Drawer from 'material-ui/Drawer';
import {spacing, typography, zIndex} from 'material-ui/styles';
import {cerulean, gunSmoke} from 'versionone-ui/styles/themes/v1Theme/colors';
import {desktopGutter} from 'versionone-ui/styles/themes/v1Theme/spacing';
import Editor from './Editor';
import Preview from './Preview';

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
        display: 'flex',
        padding: desktopGutter
    }
};

class PlaygroundDrawer extends Component {
    static propTypes = {
        docked: PropTypes.bool.isRequired,
        onRequestChange: PropTypes.func.isRequired,
        open: PropTypes.bool.isRequired,
        style: PropTypes.object
    };

    static contextTypes = {
        muiTheme: PropTypes.object.isRequired,
    };

    constructor(props, ...rest) {
        super(props, ...rest);
        this.state = {
            code: ''
        };
    }

    render() {
        const {
            docked,
            onRequestChange,
            open,
            style,
        } = this.props;
        const {
            code
        } = this.state;
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
                        <Editor ref="editor" code={code} onChange={this.setCode} />
                    </section>
                    <section style={sectionStyles}>
                        <Preview code={code} />
                    </section>
                </div>
            </Drawer>
        );
    }

    setCode = (code) => {
        this.setState({
            code
        });
    };

    loadCode(code) {
        this.refs.editor.setCode(code);
    }

    handleTouchTapHeader = () => {
        this.props.onRequestChange(false);
    };
}

export default PlaygroundDrawer;