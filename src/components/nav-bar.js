import React, { Component } from 'react';

class NavBar extends Component {
    render() {
        return(
            <div className="pt-navbar">
                <div className="pt-navbar-group pt-align-left">
                    <div className="pt-navbar-heading" style={{marginRight: '30px'}}>FTL IDE</div>
                </div>
            </div>
        );
    }
}

export default NavBar;
