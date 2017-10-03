import React, { Component } from 'react';
import {Tabs2, Tab2 } from '@blueprintjs/core';
import SidebarLibrary from './sidebar-library';

class Sidebar extends Component {
    render() {
        return (
            <Tabs2 id="sidebar-tabs" className="app-sidebar">
                <Tab2 id="sidebar-library" title="Code Library" panel={<SidebarLibrary {...this.props}/>}/>
                <Tab2 id="sidebar-reference" title="Reference" panel={<div>Reference</div>}/>

            </Tabs2>
        )
    }
}

export default Sidebar;
