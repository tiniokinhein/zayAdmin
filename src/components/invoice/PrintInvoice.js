import React, { Component } from 'react'
import Layout from '../layout/Layout'
import { db } from '../../auth/firebase'
import { IoIosArrowRoundBack } from 'react-icons/io'
import ReactToPrint from 'react-to-print'
import { MdEmail } from 'react-icons/md'
import { GiPhone } from 'react-icons/gi'
import LOGO from '../../assets/images/logo.png'
import Moment from 'react-moment'


export default class PrintInvoice extends Component 
{
    state = {
        p: null
    }
    
    getInvoice = () => {
        const id = this.props.match.params.id
        db 
        .ref(process.env.REACT_APP_ORDERS+`/${id}`)
        .on('value' , snapshot => {
            const data = snapshot.val()
            this.setState({
                p: data
            })
        })
    }

    componentDidMount() {
        this.getInvoice()
        window.scrollTo(0,0)
    }

    render() {

        const { p } = this.state

        const printList = 
            <>
                {
                    p ? (
                        <div 
                            key={p.id}
                            className="row"
                        >
                            <div
                                className="col-6"
                            >
                                <img
                                    src={LOGO}
                                    alt="Bagan Zay"
                                    width="120"
                                />
                                <h4
                                    className="font-weight-bold mb-4 text-dark"
                                >Bagan Zay</h4>
                                <h5
                                    className="mb-2"
                                ><MdEmail className="text-dark" /> baganbusinessgroup.zay@gmail.com</h5>
                                <h5
                                    className="mb-2"
                                ><GiPhone className="text-dark" /> 09123456789</h5>
                            </div>
                            <div
                                className="col-6 text-right"
                            >
                                <h1
                                    className="text-uppercase font-weight-bold display-4 mb-4"
                                    style={{
                                        color: '#000'
                                    }}
                                >Invoice</h1>
                                <table className="ml-auto">
                                    <tbody>
                                        <tr className="text-right">
                                            <td className="px-3 py-3 border"><h5 className="m-0">INVOICE NO.</h5></td>
                                            <td className="text-left border px-3 py-3"><h5 className="m-0"><strong>{p.invoice_number}</strong></h5></td>
                                        </tr>
                                        <tr className="text-right">
                                            <td className="px-3 py-3 border"><h5 className="m-0">DATE</h5></td>
                                            <td className="text-left border px-3 py-3">
                                                {
                                                    p.products.delivery === 'ပုံမှန်ကြာချိန် (၂)ရက်' &&
                                                    <h5 className="m-0">
                                                        <strong>
                                                            <Moment 
                                                                add={{ days:2 }}
                                                                format="dddd, D.MM.YYYY"
                                                            >
                                                                {p.checkout.contact.dateRaw}
                                                            </Moment>
                                                        </strong>
                                                    </h5>
                                                }
                                                {
                                                    p.products.delivery === 'ကြာချိန် (၁)ရက်' &&
                                                    <h5 className="m-0">
                                                        <strong>
                                                            <Moment 
                                                                add={{ days:1 }}
                                                                format="dddd, D.MM.YYYY"
                                                            >
                                                                {p.checkout.contact.dateRaw}
                                                            </Moment>
                                                        </strong>
                                                    </h5>
                                                }
                                                {
                                                    p.products.delivery === 'ချက်ချင်း (၂)နာရီအတွင်း' &&
                                                    <h5 className="m-0">
                                                        <strong>
                                                            <Moment 
                                                                add={{ hours:2 }}
                                                                format="dddd, D.MM.YYYY"
                                                            >
                                                                {p.checkout.contact.dateRaw}
                                                            </Moment>
                                                        </strong>
                                                    </h5>
                                                }
                                            </td>
                                        </tr>
                                        <tr className="text-right">
                                            <td className="px-3 py-3 border"><h5 className="m-0">DELIVERY</h5></td>
                                            <td className="text-left border px-3 py-3">
                                                {
                                                    p.products.delivery === 'ပုံမှန်ကြာချိန် (၂)ရက်' &&
                                                    <h5 className="m-0">
                                                        <strong>
                                                            <Moment 
                                                                add={{ days:2 }}
                                                                format="D.MM.YYYY"
                                                            >
                                                                {p.checkout.contact.dateRaw}
                                                            </Moment>
                                                        </strong>
                                                    </h5>
                                                }
                                                {
                                                    p.products.delivery === 'ကြာချိန် (၁)ရက်' &&
                                                    <h5 className="m-0">
                                                        <strong>
                                                            <Moment 
                                                                add={{ days:1 }}
                                                                format="D.MM.YYYY"
                                                            >
                                                                {p.checkout.contact.dateRaw}
                                                            </Moment>
                                                        </strong>
                                                    </h5>
                                                }
                                                {
                                                    p.products.delivery === 'ချက်ချင်း (၂)နာရီအတွင်း' &&
                                                    <h5 className="m-0">
                                                        <strong>
                                                            <Moment 
                                                                add={{ hours:2 }}
                                                                format="D.MM.YYYY"
                                                            >
                                                                {p.checkout.contact.dateRaw}
                                                            </Moment>
                                                        </strong>
                                                    </h5>
                                                }
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div
                                className="col-12 my-5 py-4"
                            >
                                <h4
                                    className="font-weight-bold mb-3 text-secondary"
                                >လိပ်စာ</h4>
                                <h5
                                    className="mb-2"
                                >{p.checkout.contact.name}</h5>
                                <h5
                                    className="mb-2"
                                >{p.checkout.contact.email}</h5>
                                <h5
                                    className="mb-2"
                                >{p.checkout.contact.phone}</h5>
                                <h5
                                    className="mb-2"
                                >{p.checkout.contact.address}</h5>
                            </div>
                            <div
                                className="col-12 mb-5"
                            >
                                <h4
                                    className="font-weight-bold mb-4 text-secondary"
                                >ဝယ်ယူထားသောပစ္စည်းများ</h4>
                                <table className="table">
                                    <thead className="thead-dark">
                                        <tr>
                                            <th scope="col"><h5 className="m-0"><strong>ပစ္စည်းများ</strong></h5></th>
                                            <th scope="col"><h5 className="m-0"><strong>စျေးနှုန်း</strong></h5></th>
                                            <th scope="col"><h5 className="m-0"><strong>အရေအတွက်</strong></h5></th>
                                            <th scope="col"><h5 className="m-0"><strong>စုပေါင်း</strong></h5></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            p.products.orderItems.map(p => (
                                                <tr key={p.id}>
                                                    <td><h5 className="m-0">{p.title_mm}</h5></td>
                                                    <td><h5 className="m-0"><small>( {p.weight} {p.unit} )</small> - {p.price} ကျပ်</h5></td>
                                                    <td><h5 className="m-0">{p.quantity}</h5></td>
                                                    <td><h5 className="m-0">{p.item_total} ကျပ်</h5></td>
                                                </tr>
                                            ))
                                        }

                                        <tr>
                                            <td colSpan="2" className="py-4 text-center align-middle">
                                                <h1
                                                    className="text-uppercase font-weight-bold mb-1"
                                                ><strong>Invoice</strong></h1>
                                                <h4
                                                    className="font-weight-bold mb-0"
                                                    style={{
                                                        color: '#000'
                                                    }}
                                                >
                                                    {p.products.total} ကျပ်
                                                </h4>
                                            </td>
                                            <td colSpan="2" className="py-4">
                                                <table className="tabel table-borderless w-100">
                                                    <tbody>
                                                        <tr>
                                                            <td className="text-left px-0"><h5 className="m-0"><strong>စုပေါင်း</strong></h5></td>
                                                            <td className="px-0"><h5 className="m-0"><strong>{p.products.subtotal} ကျပ်</strong></h5></td>
                                                        </tr>
                                                        <tr>
                                                            <td className="text-left px-0"><h5 className="m-0"><strong>ပို့ခ</strong></h5></td>
                                                            {
                                                                p.products.delivery_fee === '0' ? (
                                                                    <td className="px-0"><h5 className="m-0"><strong>အခမဲ့</strong></h5></td>
                                                                ) : (
                                                                    <td className="px-0"><h5 className="m-0"><strong>{p.products.delivery_fee} ကျပ်</strong></h5></td>
                                                                )
                                                            }
                                                        </tr>
                                                        <tr>
                                                            <td className="text-left px-0"><h5 className="m-0"><strong>လျှော့စျေး <small>( {p.products.discount} )</small></strong></h5></td>
                                                            <td className="px-0"><h5 className="m-0"><strong>{p.products.discount_price} ကျပ်</strong></h5></td>
                                                        </tr>
                                                        <tr>
                                                            <td className="text-left px-0"><h5 className="m-0"><strong>အားလုံးစုပေါင်း</strong></h5></td>
                                                            <td className="px-0"><h5 className="m-0"><strong>{p.products.total} ကျပ်</strong></h5></td>
                                                        </tr>
                                                       
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div 
                                className="col-12 position-absolute"
                                style={{
                                    bottom: '3rem',
                                    left: '3rem',
                                    right: '3rem',
                                    zIndex: '9'
                                }}
                            >
                                <p
                                    className="mb-0"
                                    style={{
                                        color: '#000'
                                    }}
                                >
                                    <strong><i>BAGANစျေး နှင့် ဝယ်ယူအားပေးမှုအတွက် ကျေးဇူးတင်ပါသည်။</i></strong>
                                </p>
                            </div>
                        </div>
                    ) : null
                }
            </>

        return (
            <Layout>
                <div className="container-fluid">
                    <h1 className="h3 mb-5 text-gray-800">
                        <button 
                            onClick={() => this.props.history.push('/invoices')}
                            className="btn btn-transparent rounded-0 border-0 shadow-none p-0"
                            style={{
                                fontSize: '30px',
                                lineHeight: '0'
                            }}
                        >
                            <IoIosArrowRoundBack />
                        </button> &nbsp;
                        {
                            p ? (
                                <span key={p.id}>{p.invoice_number}</span>
                            ) : null
                        }
                    </h1>              
                    <div className="d-flex">
                        <ReactToPrint
                            trigger={() => 
                                <button
                                    className="btn btn-primary shadow-none mr-2 py-2 px-4 border-0 rounded-pill text-white"
                                >
                                    Print
                                </button>
                            }
                            content={() => this.componentRef}
                        />
                        <button
                            onClick={() => this.props.history.push('/invoices')}
                            className="btn btn-secondary shadow-none ml-2 py-2 px-4 border-0 rounded-pill text-white"
                        >
                            Cancel
                        </button>
                    </div>
                </div>

                <div 
                    className="d-none printPage px-5 py-5" 
                    ref={el => (this.componentRef = el)}
                >
                    {printList}
                </div>

            </Layout>
        )
    }
}
