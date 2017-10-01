import React, { Component } from 'react';
import CodeMirror from 'react-codemirror2'
import 'codemirror/mode/clike/clike';
import 'codemirror/addon/edit/matchbrackets';
import 'codemirror/addon/edit/closebrackets';

var DEFAULT_EDITOR_OPTIONS = {
    lineNumbers: true,
    readOnly: false,
    mode: 'text/x-java',
    indentUnit: 4,
    autoSave: true,
    preserveScrollPosition: true,
    matchBrackets: true,
    autoCloseBrackets: true
};

class SimpleEditor extends Component {
    render() {
        return (
            <CodeMirror
              options={DEFAULT_EDITOR_OPTIONS}
              onChange={(editor, metadata, value) => {
              }}
            />
        );
    }
}

export default SimpleEditor;
