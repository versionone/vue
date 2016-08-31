import React from 'react';
import CodeMirror from 'codemirror';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';

class Editor extends React.Component {
    static propTypes = {
        code: React.PropTypes.string,
        lineNumbers: React.PropTypes.bool,
        onChange: React.PropTypes.func,
        readOnly: React.PropTypes.bool,
        tabSize: React.PropTypes.number,
        theme: React.PropTypes.string
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
        });console.log('here', this.editor);
        this.editor.on('change', this.handleChange);
    }

    componentDidUpdate() {
        const {code, readOnly} = this.props;
        if (readOnly) {
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
        return (
            <div>
                <textarea ref="editor" defaultValue={this.props.code} />
            </div>
        );
    }
}

export default Editor;