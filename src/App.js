import React, { Component } from 'react';
import SplitPane from 'react-split-pane';
import WorkArea from './components/work-area';
import ConsoleHost from './components/console-host';
import API from './api';
import Gamepad from 'react-gamepad';

var s_logItem = 0;

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            buildLogEntries: []
        };

        // this.d_interval = setInterval(() => {
        //     var oldEntries = this.state.buildLogEntries;
        //     oldEntries.push({text: "Log Item #" + s_logItem});
        //     s_logItem++;
        //     this.setState({
        //         buildLogEntries: oldEntries
        //     });
        // }, 1000);
    }

    // Log related
    handleClearBuildLog() {
        this.setState({
            buildLogEntries: []
        });
        s_logItem = 0;
    }

    // Build related
    handleBuildRequested() {
        console.log('Handle Build Requested');
    }

    render() {
        var appMethods = {
            onExampleSelected: (exampleId) => {
                console.log('Hi! Example selected!', exampleId);
                API.loadExample(exampleId);
            }
        }

        return (
            <div className="ftl-app-main">
                <SplitPane split="horizontal" defaultSize="70%" className="ftl-root-splitter">
                    <WorkArea {...appMethods}/>
                    <ConsoleHost buildLogEntries={this.state.buildLogEntries} 
                                 onClearBuildLog={this.handleClearBuildLog.bind(this)} 
                                 onBuildRequested={this.handleBuildRequested.bind(this)}/>
                </SplitPane>
            </div>
        );
    }
}

export default App;
