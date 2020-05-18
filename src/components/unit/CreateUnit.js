import React, { Component } from 'react'
import Layout from '../layout/Layout'
import { db } from '../../auth/firebase'
import { IoIosArrowRoundBack } from 'react-icons/io'

export default class CreateUnit extends Component 
{
    state = {
        name: ''
    }

    handleOnChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    HandleOnSubmit = () => {
        const newData = {
            name: this.state.name,
            slug: this.state.name.toLowerCase().replace(/\s+/g,"-")
        }

        db 
        .ref(process.env.REACT_APP_UNITS+`/${newData.slug}`)
        .set(newData, () => {
            this.props.history.push('/units')
        })
    }

    render() {

        const { name } = this.state

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
                        </button> Create Unit
                    </h1>
                    <div className="col-12 col-md-4 px-0">
                        <div className="field-group mb-4">
                            <label
                                className=""
                                htmlFor="name"
                            >
                                Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                value={name}
                                onChange={this.handleOnChange.bind(this)}
                                className="form-control rounded-sm shadow-none border-primary bg-transparent"
                                style={{
                                    height: '50px',
                                    lineHeight: '50px'
                                }}
                            />
                        </div>
                        <div className="field-group">
                            <button
                                type="submit"
                                className="btn btn-primary rounded-sm border-0 px-4 shadow-none"
                                onClick={this.HandleOnSubmit}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </Layout>
        )
    }
}
