import React, { Component } from 'react'
import Sidebar from './Sidebar'
import Topbar from './Topbar'

export default class Layout extends Component 
{
    render() {
        return (
            <div id="wrapper">
                <Sidebar />

                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                        <Topbar />
                        {this.props.children}
                    </div>
                </div>                
            </div>
        )
    }
}
