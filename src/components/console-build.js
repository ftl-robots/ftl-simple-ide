import React, { Component } from 'react';
import { Tooltip, AnchorButton, Position } from '@blueprintjs/core';

class ConsoleBuildPanel extends Component {
    render() {
        var logEntries = this.props.buildLogEntries || [];
        return (
            <div className="console-component">
                <div className="console-build-hstretch">
                    <Tooltip content="Build Project" position={Position.BOTTOM_LEFT}>
                        <AnchorButton className="pt-minimal" iconName="build" onClick={this.props.onBuildRequested}/>
                    </Tooltip>

                    <Tooltip content="Run Project" position={Position.BOTTOM}>
                        <AnchorButton className="pt-minimal" iconName="play" style={{marginLeft: 30}}/>
                    </Tooltip>

                    <Tooltip content="Stop Running Project" position={Position.BOTTOM}>
                        <AnchorButton className="pt-minimal" iconName="stop" style={{marginLeft: 10}}/>
                    </Tooltip>
                </div>
                <div className="console-build-hstretch" style={{marginTop: 5, marginBottom: 5}}>
                    <span style={{verticalAlign: 'center'}}><b>Build Output</b></span>
                    <AnchorButton className="pt-small" text="Clear Output" style={{marginLeft: 10}} onClick={this.props.onClearBuildLog}/>
                </div>
                <div className="console-build-vstretch">
                    <div className="console-log-scroller">
                        {
                            logEntries.map((entry) => {
                                return <div className="log-entry">{entry.text}</div>;
                            })
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default ConsoleBuildPanel;