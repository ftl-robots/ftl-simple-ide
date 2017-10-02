import React, { Component } from 'react';
import { Popover, Position, Button, Menu, MenuItem } from '@blueprintjs/core';
import PropTypes from 'prop-types';

import API from '../api';

var remoteExamples = [];
var EXAMPLE_ID_TO_TEXT = {};
var EXAMPLE_TEXT_TO_ID = {};
var EXAMPLE_ID_TO_IDX = {};

function setupExamples(exampleList) {
    remoteExamples = exampleList;
    remoteExamples.forEach((example, idx) => {
        EXAMPLE_ID_TO_IDX[example.metadata.id] = idx;
        EXAMPLE_ID_TO_TEXT[example.metadata.id] = example.metadata.text;
        EXAMPLE_TEXT_TO_ID[example.metadata.text] = example.metadata.id;
    });
}

class SidebarLibrary extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedExample: props.selectedExample || null,
            remoteExamples: []
        };
        
        API.getExamples()
        .then((exampleList) => {
            setupExamples(exampleList);
            this.setState({
                remoteExamples: exampleList
            });
        });
    }

    handleExampleSelection(e) {
        var selectionId = EXAMPLE_TEXT_TO_ID[e.target.textContent];
        if (selectionId) {
            this.setState({
                selectedExample: selectionId
            });
        }
    }

    handleSelectExample(e) {
        console.log('Sending up: ', this.state.selectedExample);
        if (this.props.onExampleSelected) {
            this.props.onExampleSelected(this.state.selectedExample);
        }
    }

    render() {
        const exampleList = (
            <Menu>
                {
                    remoteExamples.map((example) => {
                        return (<MenuItem key={example.metadata.id} iconName='document' text={example.metadata.text} onClick={this.handleExampleSelection.bind(this)}/>);
                    })
                }
            </Menu>
        );

        var hasSelection = this.state.selectedExample !== null;
        var buttonText = hasSelection ? EXAMPLE_ID_TO_TEXT[this.state.selectedExample] : 'Select An Example';
        var infoSectionStyle = 'pt-callout ';
        var infoSectionText = 'Select an example above to get more information';

        if (hasSelection) {
            infoSectionStyle += 'pt-intent-primary';
            infoSectionText = remoteExamples[EXAMPLE_ID_TO_IDX[this.state.selectedExample]].metadata.description;
        }

        return (
        <div className="sidebar-component">
            <h5>Load some example code to use as a basis for your own robot project</h5>
            <div className='pt-callout pt-intent-warning'>
                <h5>Warning</h5>
                <p>Selecting a new code example here will erase all the changes you have made so far.</p>
            </div>
            <div style={{ marginTop: 10 }}>
                <Popover content={exampleList} position={Position.BOTTOM_LEFT}>
                    <Button iconName='document' text={buttonText} rightIconName='caret-down' disabled={remoteExamples.length === 0}/>
                </Popover>
            </div>
            <div className={infoSectionStyle} style={{ marginTop: 10 }}>
                {infoSectionText}
            </div>
            <Button text="Use Selected Example" disabled={!hasSelection} style={{marginTop: 10}} onClick={this.handleSelectExample.bind(this)}/>
        </div>
        );
    }
}

SidebarLibrary.propTypes = {
    onExampleSelected: PropTypes.func.isRequired,
    selectedExample: PropTypes.string
}

export default SidebarLibrary;