import React, { Component } from 'react'
import { AiOutlineMenu , AiOutlineLogout } from 'react-icons/ai'
import Modal from 'react-modal'
import { auth , db } from '../../auth/firebase'
import { BsBell } from 'react-icons/bs'
import { Link, withRouter } from 'react-router-dom'
import Moment from 'react-moment'


Modal.setAppElement('#root')

class Topbar extends Component 
{
    state = {
        show: false,
        orders: []
    }

    showModal = () => {
        this.setState({
            show: true
        })
    }

    closeModal = () => {
        this.setState({
            show: false
        })
    }

    openMenu = () => {
        document.getElementById('accordionSidebar').style.left = '0%'
    }

    getOrders = () => {
        db
        .ref(process.env.REACT_APP_ORDERS)
        .orderByChild('/checkout/contact/dateFormatted')
        .on('value' , snapshot => {
            const data = []
            snapshot.forEach(snap => {
                data.push(snap.val())
            })
            const dataAll = data.reverse()
            this.setState({
                orders: dataAll
            })
        })
    }

    componentDidMount() {
        this.getOrders()
    }

    render() {

        const { show , orders } = this.state

        const customStyles = {
            content : {
                top: '50%',
                left: '50%',
                right: 'auto',
                bottom: 'auto',
                marginRight: '-50%',
                transform: 'translate(-50%, -50%)',
                padding: '3rem',
                boxShadow: '0',
                borderRadius: '0',
                border: '0',
                background: 'none'
              }
        }

        return (
            <nav 
                className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow"
            >
                <button 
                    className="btn btn-link d-md-none rounded-circle mr-3 text-dark p-0"
                    style={{
                        fontSize: '23px',
                        width: '40px',
                        height: '40px'
                    }}
                    onClick={this.openMenu}
                >
                    <AiOutlineMenu />
                </button>

                <div className="navbar-nav ml-auto">
                    <div className="dropdown mr-5">
                        <button
                            className="btn text-dark p-0 border-0 rounded-0 shadow-none position-relative"
                            id="dropdownMenuLink" 
                            data-toggle="dropdown" 
                            aria-haspopup="true" 
                            aria-expanded="false"
                            style={{
                                fontSize: '23px',
                                height: '40px',
                                lineHeight: '0'
                            }}
                        >
                            <BsBell />
                            {
                                orders.map((p,index) => (
                                    <div key={index}>
                                        <>
                                            {
                                                p.status === 'Pending' &&

                                                <span
                                                    className="position-absolute d-inline-block bg-primary text-white rounded-sm shadow-none px-1 py-2"
                                                    style={{
                                                        fontSize: '9px',
                                                        top: '0',
                                                        right: '-5px',
                                                        zIndex: '9'
                                                    }}
                                                >{index + 1}</span>
                                            }
                                        </>
                                    </div>
                                ))
                            }
                        </button>

                        <div 
                            className="dropdown-menu py-0 rounded-sm shadow px-4" 
                            aria-labelledby="dropdownMenuLink"
                            style={{
                                top: '53px',
                                border: '0',
                                borderLeft: '3px solid #4e73df',
                                left: 'auto'
                            }}
                        >
                            {
                                orders.slice(0,3).map((p,index) => (
                                    <Link 
                                        key={index}
                                        className="dropdown-item py-2 px-0 rounded-0 bg-white border-bottom text-dark" 
                                        style={{
                                            overflow: 'hidden',
                                            whiteSpace: 'nowrap',
                                            textOverflow: 'ellipsis'
                                        }}
                                        to={`/order/${p.id}`}
                                    >
                                        <small className="text-uppercase font-weight-bold mt-3 d-inline-block">
                                            <Moment 
                                                format="D.MM.YYYY - h:mm a"
                                            >
                                                {p.checkout.contact.dateRaw}
                                            </Moment>
                                        </small>
                                        <p
                                            className="mt-1 mb-2"
                                            style={{
                                                lineHeight: '2'
                                            }}
                                        >
                                            <strong>{p.id}</strong> ကို <span className="text-dark font-weight-bold">{p.checkout.contact.name}</span>  မှာထားသည်
                                        </p>
                                    </Link>
                                ))
                            }
                            <div
                                className="py-3"
                            >
                                <button
                                    className="btn rounded-0 border-0 shadow-none text-dark font-weight-bold p-0"
                                    onClick={() => this.props.history.push('/')}
                                    style={{
                                        fontSize: '12px',
                                        lineHeight: '2',
                                        letterSpacing: '0.5px'
                                    }}
                                >
                                    အားလုံးကြည့်မည်
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    <button
                        className="btn text-dark p-0 border-0 rounded-0 shadow-none"
                        style={{
                            fontSize: '23px',
                            height: '40px',
                            lineHeight: '0'
                        }}
                        onClick={this.showModal}
                    >
                        <AiOutlineLogout />
                    </button>
                </div>

                <Modal
                    isOpen={show}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    contentLabel="Sign Out"
                >
                    <div className="d-flex">
                        <button
                            onClick={() => auth.signOut()}
                            className="btn btn-primary shadow-none mr-2 py-2 px-4 border-0 rounded-pill text-white"
                        >
                            Logout
                        </button>
                        <button
                            onClick={this.closeModal}
                            className="btn btn-secondary shadow-none ml-2 py-2 px-4 border-0 rounded-pill text-white"
                        >
                            Cancel
                        </button>
                    </div>
                </Modal>
            </nav>
        )
    }
}

export default withRouter(Topbar)