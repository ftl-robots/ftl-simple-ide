import React, { Component } from 'react';
import SplitPane from 'react-split-pane';
import SimpleEditor from './simple-editor';
import Sidebar from './sidebar';

class WorkArea extends Component {
    render() {
        return (
            <SplitPane defaultSize="80%">
                <SimpleEditor />
                <Sidebar />
            </SplitPane>
        );
    }
}

export default WorkArea;
