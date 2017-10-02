import React, { Component } from 'react';
import SplitPane from 'react-split-pane';
import WorkArea from './components/work-area';
import ConsoleHost from './components/console-host';
import API from './api';

class App extends Component {
    constructor(props) {
        super(props);

    }
    render() {
        console.log('app render called');
        var appMethods = {
            onExampleSelected: (exampleId) => {
                console.log('Hi! Example selected!', exampleId);
                API.loadExample(exampleId);
            }
        }
        return (
            <div className="ftl-app-main">
                <SplitPane split="horizontal" defaultSize="75%" className="ftl-root-splitter">
                    <WorkArea {...appMethods}/>
                    <ConsoleHost />
                </SplitPane>
            </div>
        );
    }
}

export default App;
