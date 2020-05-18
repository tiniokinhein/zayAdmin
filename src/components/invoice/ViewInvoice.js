import React, { Component } from 'react'
import Layout from '../layout/Layout'
import { db } from '../../auth/firebase'
import { IoIosArrowRoundBack } from 'react-icons/io'
import Moment from 'react-moment'


const FETCHIMG = process.env.REACT_APP_FETCH_IMAGES

export default class ViewInvoice extends Component 
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

        const list = 
            <>
                {
                    p ? (
                        <div key={p.id} className="mb-4">
                            <h1 className="h3 mb-4 text-gray-800">
                                <button 
                                    onClick={() => this.props.history.push('/invoices')}
                                    className="btn btn-transparent rounded-0 border-0 shadow-none p-0"
                                    style={{
                                        fontSize: '30px',
                                        lineHeight: '0'
                                    }}
                                >
                                    <IoIosArrowRoundBack />
                                </button> {p.invoice_number} 
                            </h1>
                            <div
                                className=""
                            >
                                <div 
                                    className="row"
                                    style={{
                                        lineHeight: '2'
                                    }}
                                >
                                    <div className="col-12 col-lg-6 mb-4">
                                        <strong className="text-dark">ရက်စွဲ</strong> - <small>({p.checkout.contact.datePretty})</small>
                                    </div>
                                    <div className="col-12 col-lg-6 mb-4">
                                        <strong className="text-dark">Invoice နံပါတ်</strong> - <strong className="text-primary"><i>{p.invoice_number}</i></strong>
                                    </div>
                                    <div className="col-12 col-lg-6 mb-4">
                                        <strong className="text-dark">အော်ဒါတင်သည့်အချိန်</strong><br />
                                        <small>
                                            <Moment format="D.MM.YYYY - h:mm a">
                                                {p.checkout.contact.dateRaw}
                                            </Moment>
                                        </small>
                                    </div>
                                    <div className="col-12 col-lg-6 mb-4">
                                        <strong className="text-dark">ပစ္စည်းပို့ရမည့်အချိန်</strong> <small>( {p.products.delivery} )</small><br />
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
                                    </div>
                                    <div className="col-12 col-lg-6 mb-4">
                                        <strong className="text-dark">ပစ္စည်းပို့ရမည့်လိပ်စာ</strong><br /> 
                                        {
                                            p.checkout.contact.name &&
                                            <>
                                                <small>
                                                    {p.checkout.contact.name}
                                                </small><br />
                                            </>
                                        }
                                        {
                                            p.checkout.contact.email &&
                                            <>
                                                <small>
                                                    {p.checkout.contact.email}
                                                </small><br />
                                            </>
                                        }
                                        {
                                            p.checkout.contact.phone &&
                                            <>
                                                <small>
                                                    {p.checkout.contact.phone}
                                                </small><br />
                                            </>
                                        }
                                        {
                                            p.checkout.contact.address &&
                                            <>
                                                <small>
                                                    {p.checkout.contact.address}
                                                </small>
                                            </>
                                        }
                                    </div>
                                    <div className="col-12 col-lg-6 mb-4">
                                        <strong className="text-dark">ငွေပေးချေစနစ်</strong><br /> 
                                        <small>{p.checkout.payment}</small><br /><br />
                                        <strong className="text-dark">ပို့ခ</strong><br /> 
                                        {
                                            p.products.delivery_fee === '0' ? (
                                                <small>အခမဲ့</small>
                                            ) : (
                                                <small>{p.products.delivery_fee} ကျပ်</small>
                                            )
                                        }
                                    </div>
                                    <div className="col-12 mb-4">
                                        <strong className="text-dark">အော်ဒါအခြေအနေ</strong><br />
                                        <button
                                            className="mt-2 px-4 py-2 border-0 rounded-sm shadow btn btn-danger d-inline-block"
                                        >
                                            {p.status_mm} <small>( {p.status} )</small>
                                        </button>
                                    </div>
                                    <div className="col-12 mb-4">
                                        <div className="row">
                                            <div className="col-12 col-lg-6 mb-4">
                                                <strong className="text-dark">ဝယ်ယူထားသောပစ္စည်းများ</strong>
                                                <div className="mt-3">
                                                    {
                                                        p.products.orderItems.map(p => (
                                                            <div 
                                                                key={p.id}
                                                                className="mb-3 d-flex px-3 py-0 rounded shadow bg-white"
                                                                style={{
                                                                    borderLeft: '4px solid #000'
                                                                }}
                                                            >
                                                                <div
                                                                    className="mr-3"
                                                                >
                                                                    <img 
                                                                        src={FETCHIMG+`/${p.image}`}
                                                                        alt={p.title}
                                                                        width="100"
                                                                    />
                                                                </div>
                                                                <div
                                                                    className="flex-grow-1 align-self-center"
                                                                    style={{
                                                                        fontSize: '13px'
                                                                    }}
                                                                >
                                                                    <p
                                                                        className="mb-0 text-secondary"
                                                                    >
                                                                        <strong>{p.title_mm}</strong>
                                                                    </p>
                                                                    <small>( <strong>{p.weight}</strong> ) <strong>{p.unit}</strong></small><br />
                                                                    <small><strong>{p.price}</strong> ကျပ်</small>
                                                                </div>
                                                                <div
                                                                    className="align-self-center"
                                                                    style={{
                                                                        fontSize: '13px'
                                                                    }}
                                                                >
                                                                    <small><strong>အရေအတွက်</strong> - ( <strong>{p.quantity}</strong> )</small><br />
                                                                    <small><strong>စုပေါင်း</strong> - <strong>{p.item_total}</strong> ကျပ်</small>
                                                                </div>
                                                            </div>
                                                        ))
                                                    }
                                                </div>
                                            </div>
                                            <div className="col-12 col-lg-6 mb-4">
                                                <strong className="text-dark">ကျသင့်ငွေ <small>(စုစုပေါင်း)</small></strong>
                                                <div
                                                    className="mt-3 px-3 py-3 rounded shadow bg-white"
                                                    style={{
                                                        borderLeft: '4px solid #000',
                                                        fontSize: '13px',
                                                        lineHeight: '2'
                                                    }}
                                                >
                                                    <p
                                                        className="mb-2 text-secondary"
                                                    >
                                                        <strong>စုပေါင်း <span className="float-right"> - {p.products.subtotal} ကျပ်</span></strong>
                                                    </p>
                                                    <p
                                                        className="mb-2 text-secondary"
                                                    >
                                                        {
                                                            p.products.delivery_fee === '0' ? (
                                                                <strong>ပို့ခ <small>({p.products.delivery})</small> <span className="float-right"> - အခမဲ့</span></strong>
                                                            ) : (
                                                                <strong>ပို့ခ <small>({p.products.delivery})</small> <span className="float-right"> - {p.products.delivery_fee} ကျပ်</span></strong>
                                                            )
                                                        }
                                                    </p>
                                                    <p
                                                        className="mb-3 text-secondary"
                                                    >
                                                        <strong>လျှော့စျေး <small>({p.products.discount})</small> <span className="float-right"> - {p.products.discount_price} ကျပ်</span></strong>
                                                    </p>
                                                    <p
                                                        className="mb-0"
                                                        style={{
                                                            fontSize: '15px',
                                                            color: '#000'
                                                        }}
                                                    >
                                                        <strong>အားလုံးစုစုပေါင်း <span className="float-right"> - {p.products.total} ကျပ်</span></strong>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>                            
                        </div>
                    ) : null
                }
            </>

        return (
            <Layout>
                <div className="container-fluid">
                    {list}
                </div>
            </Layout>
        )
    }
}
