import React, {Component, PropTypes} from 'react';
import {parse} from 'react-docgen';
import ClearFix from 'material-ui/internal/ClearFix';
import Paper from 'material-ui/Paper';
import MarkdownElement from '../MarkdownElement';
import {Tabs, Tab} from 'material-ui/Tabs';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import CodeIcon from 'material-ui/svg-icons/action/code';
import {desktopGutter} from 'versionone-ui/styles/themes/v1Theme/spacing';

class CodeExample extends Component {
    static propTypes = {
        children: PropTypes.node,
        code: PropTypes.string.isRequired,
        component: PropTypes.bool,
        description: PropTypes.string,
        exampleBlockStyle: React.PropTypes.object,
        layoutSideBySide: PropTypes.bool,
        title: PropTypes.string,
        openInPlayground: PropTypes.func
    };

    static defaultProps = {
        component: true,
    };

    static contextTypes = {
        muiTheme: PropTypes.object,
    };

    render() {
        const {
            children,
            code,
            component,
            exampleBlockStyle,
            layoutSideBySide,
            title,
            openInPlayground
        } = this.props;

        const palette = this.context.muiTheme.rawTheme.palette;
        const canvasColor = palette.canvasColor;

        const styles = {
            root: {
                backgroundColor: canvasColor,
                marginBottom: 32,
            },
            exampleBlock: {
                borderRadius: '0 0 2px 0',
                padding: '14px 24px 24px',
                margin: 0,
                width: layoutSideBySide ? '45%' : null,
                float: layoutSideBySide ? 'right' : null,
            },
        };

        const docs = component ? parse(code) : {};

        const {description} = this.props;
        const descriptionStyle = styles.description;
        const codeStyle = Object.assign({}, styles.markdown);

        const text = `\`\`\`js
${code}
    \`\`\``;

        return (
            <Paper style={styles.root}>
                <Tabs>
                    <Tab label={title} value={0}>
                        <MarkdownElement style={descriptionStyle} text={description} />
                    </Tab>
                    <Tab label="Example Code" value={1}>
                        <FloatingActionButton onMouseUp={() => openInPlayground(this.props.code)} style={{position: 'absolute', right: desktopGutter, top: desktopGutter}}><CodeIcon /></FloatingActionButton>
                        <MarkdownElement style={codeStyle} text={text} />
                        <MarkdownElement style={descriptionStyle} text={description} />
                    </Tab>
                </Tabs>
                <ClearFix style={Object.assign(styles.exampleBlock, exampleBlockStyle)}>{children}</ClearFix>
            </Paper>
        );
    }
}

export default CodeExample;
