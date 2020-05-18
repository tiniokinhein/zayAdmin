import React, { Component } from 'react'
import Layout from '../layout/Layout'
import { db } from '../../auth/firebase'
import { IoIosArrowRoundBack } from 'react-icons/io'

export default class DeleteUnit extends Component 
{
    state = {
        p: null
    }
    
    getUnit = () => {
        const slug = this.props.match.params.slug
        db 
        .ref(process.env.REACT_APP_UNITS+`/${slug}`)
        .on('value' , snapshot => {
            const data = snapshot.val()
            this.setState({
                p: data
            })
        })
    }

    deleteUnit = () => {
        const slug = this.props.match.params.slug
        db 
        .ref(process.env.REACT_APP_UNITS+`/${slug}`)
        .remove()
        this.props.history.push('/units')
    }

    componentDidMount() {
        this.getUnit()
        window.scrollTo(0,0)
    }

    render() {

        const { p } = this.state

        return (
            <Layout>
                <div className="container-fluid">
                    <h1 className="h3 mb-5 text-gray-800">
                        <button 
                            onClick={() => this.props.history.push('/units')}
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
                                <span key={p.slug}>{p.name}</span>
                            ) : null
                        }
                    </h1>              
                    <div className="d-flex">
                        <button
                            onClick={this.deleteUnit}
                            className="btn btn-primary shadow-none mr-2 py-2 px-4 border-0 rounded-pill text-white"
                        >
                            Delete
                        </button>
                        <button
                            onClick={() => this.props.history.push('/units')}
                            className="btn btn-secondary shadow-none ml-2 py-2 px-4 border-0 rounded-pill text-white"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </Layout>
        )
    }
}
