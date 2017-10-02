import React, { Component } from 'react';
import {Tabs2, Tab2} from '@blueprintjs/core';
import BuildPanel from './console-build';

class ConsoleHost extends Component {
    render() {
        return (
            <Tabs2 id="console-host">
                <Tab2 id="console-build" title="Build/Run" panel={<BuildPanel />}/>
                <Tab2 id="console-output" title="Robot Output"/>
                <Tab2 id="console-driver-station" title="Driver Station"/>
                <Tab2 id="console-settings" title="Settings"/>
            </Tabs2>
        )
    }
}

export default ConsoleHost;
