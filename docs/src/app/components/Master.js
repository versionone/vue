import React, {Component, PropTypes} from 'react';
import Title from 'react-title-component';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import spacing from 'material-ui/styles/spacing';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {darkWhite, lightWhite, grey900} from 'material-ui/styles/colors';
import AppNavDrawer from './AppNavDrawer';
import FullWidthSection from './FullWidthSection';
import withWidth from 'material-ui/utils/withWidth';
import v1Theme from 'vue/styles/themes/v1Theme';
import {ThemeProvider} from 'vue';
import {gunSmoke} from 'vue/styles/themes/v1Theme/foundations/colors';
import componentRoutes from '../routes/menuItems';

class Master extends Component {
    static propTypes = {
        children: PropTypes.node,
        location: PropTypes.object,
        width: PropTypes.number.isRequired
    };

    static contextTypes = {
        router: PropTypes.object.isRequired
    };

    static childContextTypes = {
        muiTheme: PropTypes.object
    };

    state = {
        navDrawerOpen: false
    };

    getChildContext() {
        return {
            muiTheme: this.state.muiTheme
        };
    }

    componentWillMount() {
        this.setState({
            muiTheme: getMuiTheme(v1Theme)
        });
    }

    componentWillReceiveProps(nextProps, nextContext) {
        const newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
        this.setState({
            muiTheme: newMuiTheme
        });
    }

    getStyles() {
        return {
            appBar: {
                position: 'fixed',
                // Needed to overlap the examples
                zIndex: this.state.muiTheme.zIndex.appBar + 1,
                top: 0,
                backgroundColor: gunSmoke
            },
            root: {
                paddingTop: spacing.desktopKeylineIncrement,
                minHeight: 400
            },
            footer: {
                backgroundColor: grey900,
                textAlign: 'center'
            },
            a: {
                color: darkWhite
            },
            p: {
                margin: '0 auto',
                padding: 0,
                color: lightWhite,
                maxWidth: 356
            },
            iconButton: {
                color: darkWhite
            },
            children: {}
        }
    }

    handleTouchTapLeftIconButton = () => {
        this.setState({
            navDrawerOpen: !this.state.navDrawerOpen
        });
    };

    handleChangeRequestNavDrawer = (open) => {
        this.setState({
            navDrawerOpen: open
        });
    };

    handleChangeList = (event, value) => {
        this.context.router.push(value);
        this.setState({
            navDrawerOpen: false
        });
    };

    handleChangeMuiTheme = (muiTheme) => {
        this.setState({
            muiTheme: muiTheme
        });
    };

    render() {
        const {
            location,
            children,
        } = this.props;

        const componentMenuItems = componentRoutes.map((rootMenuItem => ({
                title: rootMenuItem.meta.title,
                path: rootMenuItem.path,
                nestedMenuItems: rootMenuItem.nestedMenuItems.map((menuItem) => ({
                    title: menuItem.meta.title,
                    path: menuItem.path
                }))
            })
        ));

        const router = this.context.router;
        const styles = this.getStyles();
        const title =
            router.isActive('/get-started') ? 'Get Started' :
                router.isActive('/Patterns') ? 'Customization' :
                    router.isActive('/components') ? 'Components' :
                        router.isActive(`/search/${this.props.params.searchTerm}`) ? 'Search Results' :
                            router.isActive('/discover-more') ? 'Discover More' : '';

        const docked = true;
        const navDrawerOpen = true;
        const showMenuIconButton = false;

        styles.navDrawer = {
            zIndex: styles.appBar.zIndex - 1
        };
        styles.children.paddingLeft = 256;
        styles.footer.paddingLeft = 256;

        return (
            <ThemeProvider theme={v1Theme}>
                <div>
                    <Title render="Vue - VersionOne" />
                    <AppBar
                        onLeftIconButtonTouchTap={this.handleTouchTapLeftIconButton}
                        title={title}
                        zDepth={0}
                        style={styles.appBar}
                        showMenuIconButton={showMenuIconButton}
                        iconElementRight={<a href="http://VersionOne.com"><img src="images/white-v-logo.png"
                                                                               style={{
                                                                                   width: '64px',
                                                                                   height: '48px'
                                                                               }} /></a>}
                    />
                    {React.Children.map(children, (child) => React.cloneElement(child, {style: styles.children}))}
                    <AppNavDrawer
                        style={styles.navDrawer}
                        location={location}
                        docked={docked}
                        onRequestChangeNavDrawer={this.handleChangeRequestNavDrawer}
                        onChangeList={this.handleChangeList}
                        open={navDrawerOpen}
                        menuItems={componentMenuItems}
                    />
                    <FullWidthSection style={styles.footer}>
                        <IconButton
                            iconStyle={styles.component}
                            iconClassName="vuidocs-icon-custom-github"
                            href="https://github.com/versionone/vue/"
                        />
                    </FullWidthSection>
                </div>
            </ThemeProvider>
        );
    }
}

export default withWidth()(Master);
