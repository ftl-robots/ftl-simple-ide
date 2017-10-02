import React, { Component } from 'react';
import CodeMirror from 'react-codemirror2'
import 'codemirror/mode/clike/clike';
import 'codemirror/addon/edit/matchbrackets';
import 'codemirror/addon/edit/closebrackets';
import API from '../api';

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
    constructor(props) {
        super(props);
        this.state = {
            editorContent: ''
        };

        // Set up API
        API.on('fileUpdated', (update) => {
            this.setState({
                editorContent: update.content
            });
        });

        API.getRemoteFile()
        .then((newContent) => {
            this.setState({
                editorContent: newContent
            });
        })
    }

    componentWillUnmount() {
        API.off('fileUpdated');
    }

    render() {
        return (
            <CodeMirror
                value={this.state.editorContent}
                options={DEFAULT_EDITOR_OPTIONS}
                onChange={(editor, metadata, value) => {
                }}
            />
        );
    }
}

export default SimpleEditor;
