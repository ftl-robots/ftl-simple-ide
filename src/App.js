import React, { Component } from 'react';
import SplitPane from 'react-split-pane';
import WorkArea from './components/work-area';
import NavBar from './components/nav-bar';
import ConsoleHost from './components/console-host';

class App extends Component {

    render() {
        return (
            <div className="ftl-app-main">
                <SplitPane split="horizontal" defaultSize="75%" className="ftl-root-splitter">
                    <WorkArea />
                    <ConsoleHost />
                </SplitPane>
            </div>
        );
    }
}

export default App;
