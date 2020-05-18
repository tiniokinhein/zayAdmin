import React, { Component } from 'react'
import Layout from '../components/layout/Layout'
import { GoTrashcan } from 'react-icons/go'
import { IoIosList } from 'react-icons/io'
import Spinner from '../components/layout/Spinner'
import { db } from '../auth/firebase'
import Moment from 'react-moment'

export default class CancelledOrders extends Component 
{
    state = {
        orders: [],
        searchID: ''
    }

    handleOnChange = e => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    getOrders = () => {
        db 
        .ref(process.env.REACT_APP_ORDERS)
        .orderByChild('/checkout/contact/dateRaw')
        .on('value' , snapshot => {
            const data = []
            snapshot.forEach(snap => {
                data.push(snap.val())
            })
            const allData = data.reverse()
            this.setState({
                orders: allData
            })
        })
    }

    componentDidMount() {
        this.getOrders()
        window.scrollTo(0,0)
    }

    render() {

        const { orders , searchID } = this.state

        const orderDatas = orders.filter(p => {
            return p.id.toLowerCase().indexOf(searchID.toLowerCase()) !== -1
        })

        const list = orderDatas.length ? (
            <>
                <div className="table-responsive">
                    <table 
                        className="table table-striped table-borderless table-dark table-hover text-light" 
                        width="100%" 
                    >
                        <thead>
                            <tr>
                                <th scope="col"><strong>Date</strong></th>
                                <th scope="col"><strong>Delivery</strong></th>
                                <th scope="col"><strong>Order ID</strong></th>
                                <th scope="col"><strong>Name</strong></th>
                                <th scope="col"><strong>Phone</strong></th>
                                <th scope="col"><strong>Status</strong></th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                orderDatas.map((p,index) => (
                                            
                                    <tr key={index}>
                                        <>
                                            {
                                                p.status === 'Cancelled' &&
                                                <>
                                                    <td className="align-middle">
                                                        <small>
                                                            <Moment
                                                                format="D.MM.YYYY - h:mm a"
                                                            >
                                                                {p.checkout.contact.dateRaw}
                                                            </Moment>
                                                        </small>
                                                    </td>
                                                    <td className="align-middle">
                                                        {
                                                            p.products.delivery === 'ပုံမှန်ကြာချိန် (၂)ရက်' &&
                                                            <>
                                                                <small>
                                                                    <Moment 
                                                                        add={{ days:2 }}
                                                                        format="D.MM.YYYY - h:mm a"
                                                                    >
                                                                        {p.checkout.contact.dateRaw}
                                                                    </Moment>
                                                                </small><br />
                                                            </>
                                                        }
                                                        {
                                                            p.products.delivery === 'ကြာချိန် (၁)ရက်' &&
                                                            <>
                                                                <small>
                                                                    <Moment 
                                                                        add={{ days:1 }}
                                                                        format="D.MM.YYYY - h:mm a"
                                                                    >
                                                                        {p.checkout.contact.dateRaw}
                                                                    </Moment>
                                                                </small><br />
                                                            </>
                                                        }
                                                        {
                                                            p.products.delivery === 'ချက်ချင်း (၂)နာရီအတွင်း' &&
                                                            <>
                                                                <small>
                                                                    <Moment 
                                                                        add={{ hours:2 }}
                                                                        format="D.MM.YYYY - h:mm a"
                                                                    >
                                                                        {p.checkout.contact.dateRaw}
                                                                    </Moment>
                                                                </small><br />
                                                            </>
                                                        }
                                                        <small className="text-warning">{p.products.delivery}</small><br />
                                                        <small className="text-info">({p.checkout.payment})</small>
                                                    </td>
                                                    <td className="align-middle">{p.id}</td>
                                                    <td className="align-middle">{p.checkout.contact.name}</td>
                                                    <td className="align-middle">{p.checkout.contact.phone}</td>
                                                    <td className="align-middle">
                                                        <small className="text-uppercase">{p.status}</small>
                                                    </td>
                                                    <td className="float-right">
                                                        <button
                                                            className="btn text-white border-0 rounded-circle mr-2 my-2 shadow-none"
                                                            style={{
                                                                width: '40px',
                                                                height: '40px',
                                                                background: '#000'
                                                            }}
                                                            onClick={() => this.props.history.push(`/cancelled-order/${p.id}`)}
                                                        >
                                                            <IoIosList />
                                                        </button>
                                                        <button
                                                            className="btn btn-danger text-white border-0 rounded-circle my-2 shadow-none"
                                                            style={{
                                                                width: '40px',
                                                                height: '40px'
                                                            }}
                                                            onClick={() => this.props.history.push(`/delete-cancelled-order/${p.id}`)}
                                                        >
                                                            <GoTrashcan />
                                                        </button>
                                                    </td>
                                                </>
                                            }
                                        </>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </>
        ) : (
            <Spinner />
        )
        return (
            <Layout>
                <div className="container-fluid">
                <h1 className="h3 mb-3 text-gray-800">Cancelled Orders</h1>
                    <div className="card shadow-none bg-transparent mb-4 border-0">
                        <div className="card-body p-0">
                            <div className="d-flex mb-3 pb-3 border-bottom">
                                <div className="mr-auto">
                                    <input
                                        type="text"
                                        name="searchID"
                                        onChange={this.handleOnChange.bind(this)}
                                        value={searchID}
                                        placeholder="&#8981; ID"
                                        className="form-control shadow-none rounded-pill border-secondary px-3 bg-transparent text-secondary"
                                        style={{
                                            height: '36px'
                                        }}
                                    />
                                </div>
                            </div>
                            {list}                                    
                        </div>
                    </div>
                </div>
            </Layout>
        )
    }
}
