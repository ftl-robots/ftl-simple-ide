import React, { Component } from 'react';
import {Tabs2, Tab2} from '@blueprintjs/core';
import BuildPanel from './console-build';
import OutputPanel from './console-robot-output';
import DriverStationPanel from './console-driver-station';
import SettingsPanel from './console-settings';

class ConsoleHost extends Component {
    render() {
        return (
            <Tabs2 id="console-host" className="console-tabs">
                <Tab2 id="console-build" title="Build/Run"
                     panel={<BuildPanel buildLogEntries={this.props.buildLogEntries} 
                                        onClearBuildLog={this.props.onClearBuildLog}
                                        onBuildRequested={this.props.onBuildRequested}/>}/>
                <Tab2 id="console-output" title="Robot Output" panel={<OutputPanel />}/>
                <Tab2 id="console-driver-station" title="Driver Station" panel={<DriverStationPanel />}/>
                <Tab2 id="console-settings" title="Settings" panel={<SettingsPanel />}/>
            </Tabs2>
        )
    }
}

export default ConsoleHost;
