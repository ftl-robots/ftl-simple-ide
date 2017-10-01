import React, { Component } from 'react';
import {Tabs2, Tab2 } from '@blueprintjs/core';

class Sidebar extends Component {
    render() {
        return (
            <Tabs2 id="sidebar-tabs">
                <Tab2 id="sidebar-library" title="Code Library" panel={<div>Library</div>}/>
                <Tab2 id="sidebar-reference" title="Reference" panel={<div>Reference</div>}/>

            </Tabs2>
        )
    }
}

export default Sidebar;
