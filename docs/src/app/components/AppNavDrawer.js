import React, {Component, PropTypes} from 'react';
import Drawer from 'material-ui/Drawer';
import {List, ListItem, makeSelectable} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import {spacing, typography, zIndex} from 'material-ui/styles';
import {gunSmoke} from '@versionone/ui/styles/themes/v1Theme/foundations/colors';
import SearchField from './SearchField';

const SelectableList = makeSelectable(List);

const styles = {
    logo: {
        cursor: 'pointer',
        fontSize: 24,
        color: typography.textFullWhite,
        lineHeight: `${spacing.desktopKeylineIncrement}px`,
        fontWeight: typography.fontWeightLight,
        backgroundColor: gunSmoke,
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

class AppNavDrawer extends Component {
    static propTypes = {
        docked: PropTypes.bool.isRequired,
        location: PropTypes.object.isRequired,
        onChangeList: PropTypes.func.isRequired,
        onRequestChangeNavDrawer: PropTypes.func.isRequired,
        open: PropTypes.bool.isRequired,
        style: PropTypes.object,
        menuItems: PropTypes.arrayOf(PropTypes.shape({
            title: PropTypes.string.isRequired,
            path: PropTypes.string.isRequired,
            nestedMenuItems: PropTypes.arrayOf(PropTypes.shape({
                title: PropTypes.string.isRequired,
                path: PropTypes.string.isRequired
            }))
        }))
    };

    static contextTypes = {
        muiTheme: PropTypes.object.isRequired,
        router: PropTypes.object.isRequired,
    };

    state = {
        muiVersions: [],
    };

    componentDidMount() {
        const self = this;
        const url = '/vue/versions.json';
        const request = new XMLHttpRequest();

        request.onreadystatechange = function() {
            if (request.readyState === 4 && request.status === 200) {
                self.setState({
                    muiVersions: JSON.parse(request.responseText),
                    version: JSON.parse(request.responseText)[0],
                });
            }
        };

        request.open('GET', url, true);
        request.send();
    }

    firstNonPreReleaseVersion() {
        let version;
        for (let i = 0; i < this.state.muiVersions.length; i++) {
            version = this.state.muiVersions[i];
            // If the version doesn't contain '-' and isn't 'HEAD'
            if (!/-/.test(version) && version !== 'HEAD') {
                break;
            }
        }
        return version;
    }

    handleVersionChange = (event, index, value) => {
        if (value === this.firstNonPreReleaseVersion()) {
            window.location = 'http://versionone.github.io/vue/release';
        } else {
            window.location = `http://versionone.github.io/vue/${value}`;
        }
    };

    currentVersion() {
        if (window.location.hostname === 'localhost') return this.state.muiVersions[0];
        if (window.location.pathname === '/') {
            return this.firstNonPreReleaseVersion();
        } else {
            return window.location.pathname.replace(/\//g, '');
        }
    }

    handleRequestChangeLink = (event, value) => {
        window.location = value;
    };

    handleTouchTapHeader = () => {
        this.context.router.push('/');
        this.props.onRequestChangeNavDrawer(false);
    };

    render() {
        const {
            location,
            docked,
            onRequestChangeNavDrawer,
            onChangeList,
            open,
            style,
            menuItems
        } = this.props;

        return (
            <Drawer
                style={style}
                docked={docked}
                open={open}
                onRequestChange={onRequestChangeNavDrawer}
                containerStyle={{zIndex: zIndex.drawer - 100}}>
                <div style={styles.logo} onTouchTap={this.handleTouchTapHeader}>
                    VersionOne UI
                </div>
                <span style={styles.version}>Version:</span>
                <DropDownMenu
                    value={this.currentVersion()}
                    onChange={this.handleVersionChange}
                    maxHeight={300}
                    style={{width: 181}}>
                    {this.state.muiVersions.map((version) => (
                        <MenuItem
                            key={version}
                            value={version}
                            primaryText={version}
                        />
                    ))}
                </DropDownMenu>
                <div style={styles.search}>
                    <SearchField />
                </div>
                {menuItems.map((rootMenuItem, menuItemIndex) => (
                    <SelectableList
                        value={rootMenuItem.path}
                        onChange={onChangeList}
                        key={menuItemIndex}>
                        <ListItem
                            primaryText={rootMenuItem.title}
                            primaryTogglesNestedList={true}
                            nestedItems={rootMenuItem.nestedMenuItems.map((item, nestedMenuItemIndex) =>(
                                <ListItem primaryText={item.title}
                                          value={`#/${rootMenuItem.path}/${item.path}`}
                                          href={`#/${rootMenuItem.path}/${item.path}`} key={nestedMenuItemIndex} />
                            ))} />
                    </SelectableList>
                ))}
                <Divider />

                <SelectableList
                    value=""
                    onChange={this.handleRequestChangeLink}>
                    <Subheader>Resources</Subheader>
                    <ListItem primaryText="GitHub" value="https://github.com/versionone/vue/" />
                    <ListItem primaryText="React" value="http://facebook.github.io/react" />
                    <ListItem primaryText="VersionOne" value="http://VersionOne.com" />
                    <ListItem primaryText="Markdown Cheatsheet" value="https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet" />
                </SelectableList>
            </Drawer>
        );
    }
}

export default AppNavDrawer;
