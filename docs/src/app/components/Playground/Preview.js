import React, {Component, PropTypes} from 'react';
import {unmountComponentAtNode, render} from 'react-dom';
import * as Vue from 'vue/';
import * as materialUi from 'material-ui';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {transform} from 'babel-standalone';
import {babel} from './../../../../package.json';
import v1Theme from 'vue/styles/themes/v1Theme';

const ERROR_TIMEOUT = 500;
const theme = Vue.Theme.getTheme(v1Theme);
const trimImportsRegularExpression = new RegExp('import .*([\n\r])*', 'g');
const exportDefaultRegularExpression = new RegExp('export default');
class Preview extends Component {
    static propTypes = {
        code: PropTypes.string.isRequired,
        scope: PropTypes.object
    };

    static defaultProps = {
        scope: {React, ...Vue, ...Vue.Toolbar, ...materialUi}
    };

    state = {
        errorMessage: null
    };

    componentDidMount() {
        this.executeCode(this.props.code);
    }

    componentDidUpdate(prevProps) {
        clearTimeout(this.timeoutID);
        if (this.props.code !== prevProps.code) {
            this.executeCode(this.props.code);
        }
    }

    render() {
        const {errorMessage} = this.state;
        return (
            <div style={{width: '100%'}}>
                {errorMessage !== null && <span>{errorMessage}</span>}
                <div ref="mount" />
            </div>
        );
    }

    executeCode = (code) => {
        if (!code) {
            return;
        }
        const {scope} = this.props;
        const mountNode = this.refs.mount;
        const fnInput = this.buildInput(scope, mountNode);
        try {
            unmountComponentAtNode(mountNode);
        }
        catch (err) {
            console.error(err);
        }
        const compiledCode = this.compileCode(scope)(code);
        const ComponentFromCode = eval(compiledCode)(...fnInput);
        try {
            render(
                <MuiThemeProvider theme={theme}>
                    <Vue.Theme.default theme={theme}>
                        <ComponentFromCode />
                    </Vue.Theme.default>
                </MuiThemeProvider>
                , mountNode);
            if (this.state.error) {
                this.setState({error: null});
            }
        }
        catch (err) {
            console.log(err);
            this.setTimeout(() => {
                this.setState({error: err.toString()});
            }, ERROR_TIMEOUT);
        }
    };

    compileCode = (scope) => (code) => {
        const trimmedImportsInCode = code.replace(trimImportsRegularExpression, '').replace(exportDefaultRegularExpression, '');
        const transformedCode = transform(trimmedImportsInCode, {presets: babel.presets}).code;
        return `(function (${Object.keys(scope).join(', ')}, mountNode) {
        ${transformedCode}
        return Example;
      });`
    };

    buildInput = (scope, mountNode) => {
        return Object.keys(scope).map((key) => {
            return this.props.scope[key];
        }).concat(mountNode);
    };

    setTimeout = () => {
        clearTimeout(this.timeoutID);
        this.timeoutID = setTimeout(...arguments);
    };
}
export default Preview;
