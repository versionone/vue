import React, {Component, PropTypes} from 'react';
import CodeMirror from 'codemirror';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import './_editor.css';

const styles = {
    root: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column'
    }
};

class Editor extends Component {
    static propTypes = {
        code: PropTypes.string,
        lineNumbers: PropTypes.bool,
        onChange: PropTypes.func,
        readOnly: PropTypes.bool,
        tabSize: PropTypes.number,
        theme: PropTypes.string
    };

    static defaultProps = {
        lineNumbers: true,
        readOnly: false,
        tabSize: 2,
        theme: 'material'
    };

    componentDidMount() {
        const {lineNumbers, tabSize, theme, readOnly} = this.props;
        this.editor = CodeMirror.fromTextArea(this.refs.editor, {
            mode: 'javascript',
            lineNumbers: lineNumbers,
            smartIndent: false,
            tabSize: tabSize,
            matchBrackets: true,
            theme: theme,
            readOnly: readOnly
        });
        this.editor.on('change', this.handleChange);
    }

    componentDidUpdate() {
        const {code, readOnly} = this.props;
        if (!readOnly) {
            this.editor.setValue(code);
        }
    }

    handleChange = () => {
        const {readOnly, onChange} = this.props;
        if (!readOnly && onChange) {
            onChange(this.editor.getValue());
        }
    };

    render() {
        const {code} = this.props;
        return (
            <div style={styles.root}>
                <textarea ref="editor" defaultValue={code} />
            </div>
        );
    }
}

export default Editor;