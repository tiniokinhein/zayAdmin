import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { MdClose } from 'react-icons/md'

export default class Sidebar extends Component 
{
    closeMenu = () => {
        document.getElementById('accordionSidebar').style.left = '-294px'
    }

    render() {
        return (
                
            <ul 
                className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" 
                id="accordionSidebar"
            >

                <Link 
                    className="sidebar-brand d-flex align-items-center justify-content-center position-relative" 
                    to="/"
                    onClick={this.closeMenu}
                >
                    <div
                        className="position-absolute d-block d-md-none text-dark"
                        style={{
                            cursor: 'pointer',
                            width: '70px',
                            height: '70px',
                            lineHeight: '70px',
                            right: '-70px',
                            top: '0',
                            fontSize: '30px',
                            background: '#fff',
                            transition: 'width 0.3s ease-in-out'
                        }}
                        onClick={this.closeMenu}
                    >
                        <MdClose />
                    </div>
                    <div className="sidebar-brand-text mx-3">Zay Admin</div>
                </Link>

                <hr className="sidebar-divider my-0" />
                
                <li className="nav-item active">
                    <Link 
                        className="nav-link" 
                        to="/"
                    >
                        <span>Orders</span>
                    </Link>
                    <ul className="list-unstyled">
                        <li className="nav-item active">
                            <Link 
                                className="nav-link pl-4 pr-3 pb-2 pt-0" 
                                to="/completed-orders"
                            >
                                <span>Completed Orders</span>
                            </Link>
                        </li>

                        <li className="nav-item active">
                            <Link 
                                className="nav-link pl-4 pr-3 pb-2 pt-0" 
                                to="/cancelled-orders"
                            >
                                <span>Cancelled Orders</span>
                            </Link>
                        </li>
                    </ul>
                </li>

                <hr className="sidebar-divider my-0" />

                <li className="nav-item active">
                    <Link 
                        className="nav-link" 
                        to="/invoices"
                    >
                        <span>Invoices</span>
                    </Link>
                </li>

                <hr className="sidebar-divider my-0" />

                <li className="nav-item active">
                    <Link 
                        className="nav-link" 
                        to="/posts"
                    >
                        <span>Posts</span>
                    </Link>
                    <ul className="list-unstyled">
                        <li className="nav-item active">
                            <Link 
                                className="nav-link pl-4 pr-3 pb-2 pt-0" 
                                to="/categories"
                            >
                                <span>Categories</span>
                            </Link>
                        </li>

                        <li className="nav-item active">
                            <Link 
                                className="nav-link pl-4 pr-3 pb-2 pt-0" 
                                to="/units"
                            >
                                <span>Units</span>
                            </Link>
                        </li>
                    </ul>
                </li>

                <hr className="sidebar-divider my-0" />

                <li className="nav-item active">
                    <Link 
                        className="nav-link" 
                        to="/banners"
                    >
                        <span>Banners</span>
                    </Link>
                </li>

            </ul>
        )
    }
}
