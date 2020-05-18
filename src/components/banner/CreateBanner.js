import React, { Component } from 'react'
import Layout from '../layout/Layout'
import { db } from '../../auth/firebase'
import { IoIosArrowRoundBack } from 'react-icons/io'
import Axios from 'axios'

export default class CreateBanner extends Component 
{
    state = {
        title: '',
        image: '',
        selectedFile: null
    }

    handleOnChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    imageOnChange = e => {
        this.setState({
            selectedFile: e.target.files[0]
        })
    }

    HandleOnSubmit = () => {
        const newData = {
            title: this.state.title,
            slug: this.state.title.toLowerCase().replace(/\s+/g,"-"),
            image: this.state.selectedFile.name
        }

        const fd = new FormData()
        fd.append('image', this.state.selectedFile , this.state.selectedFile.name)
        Axios.post(process.env.REACT_APP_UPLOAD_IMAGES , fd)
        .then(res => {
            console.log(res)
        })

        db 
        .ref(process.env.REACT_APP_BANNERS+`/${newData.slug}`)
        .set(newData, () => {
            this.props.history.push('/banners')
        })
    }

    render() {

        const { title } = this.state

        return (
            <Layout>
                <div className="container-fluid">
                    <h1 className="h3 mb-5 text-gray-800">
                        <button 
                            onClick={() => this.props.history.push('/banners')}
                            className="btn btn-transparent rounded-0 border-0 shadow-none p-0"
                            style={{
                                fontSize: '30px',
                                lineHeight: '0'
                            }}
                        >
                            <IoIosArrowRoundBack />
                        </button> Create Banner
                    </h1>
                    <div className="col-12 col-md-4 px-0">
                        <div className="field-group mb-5">
                            <label
                                className=""
                                htmlFor="title"
                            >
                                Title
                            </label>
                            <input
                                type="text"
                                name="title"
                                id="title"
                                value={title}
                                onChange={this.handleOnChange.bind(this)}
                                className="form-control rounded-sm shadow-none border-primary bg-transparent"
                                style={{
                                    height: '50px'
                                }}
                            />
                        </div>
                        <div className="field-group mb-5">
                            <label
                                htmlFor="file"
                            >
                                Image
                            </label>
                            <input
                                type="file"
                                id="file"
                                onChange={this.imageOnChange}
                                className="form-control rounded-sm shadow-none border-primary bg-transparent"
                                style={{
                                    height: '45px'
                                }}
                            />
                            <span className="text-danger"><small>Width : 1600px , Height : 400px (JPG,PNG)</small></span>
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
