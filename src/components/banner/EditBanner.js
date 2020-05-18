import React, { Component } from 'react'
import Layout from '../layout/Layout'
import { IoIosArrowRoundBack , IoIosCloseCircleOutline } from 'react-icons/io'
import { db } from '../../auth/firebase'
import Axios from 'axios'

export default class EditBanner extends Component 
{
    state = {
        title: '',
        image: '',
        selectedFile: null
    }

    imageOnChange = e => {
        this.setState({
            selectedFile: e.target.files[0]
        })
    }

    handleOnChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    HandleOnSubmit = () => {

        if(this.state.image) {
            const newData = {
                title: this.state.title,
                slug: this.props.match.params.slug
            }

            db 
            .ref(process.env.REACT_APP_BANNERS+`/${newData.slug}`)
            .update(newData, () => {
                this.props.history.push('/banners')
            })

        } else {
            const newData = {
                title: this.state.title,
                slug: this.props.match.params.slug,
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
            .update(newData, () => {
                this.props.history.push('/banners')
            })
        }

    }

    getBanner = () => {
        const slug = this.props.match.params.slug
        db 
        .ref(process.env.REACT_APP_BANNERS+`/${slug}`)
        .on('value' , snapshot => {
            const data = snapshot.val()
            this.setState({
                title: data.title,
                image: data.image
            })
        })
    }

    removeImage = () => {
        const slug = this.props.match.params.slug

        db 
        .ref(process.env.REACT_APP_BANNERS+`/${slug}`)
        .update({
            image: null
        })
    }

    componentDidMount() {
        this.getBanner()
        window.scrollTo(0,0)
    }

    render() {

        const lists = 
            <>
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
                    </button> Edit
                </h1>
                <div className="col-12 col-md-6 px-0">
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
                            value={this.state.title}
                            onChange={this.handleOnChange.bind(this)}
                            className="form-control rounded-sm shadow-none border-primary bg-transparent"
                            style={{
                                height: '50px',
                                lineHeight: '50px'
                            }}
                        />
                    </div>
                    <div className="field-group mb-5">
                        <label
                            htmlFor="file"
                        >
                            Image
                        </label>
                        {
                            this.state.image ? (
                                <div>
                                    <button
                                        onClick={this.removeImage}
                                        className="text-danger btn border-0 rounded-0 shadow-none p-0"
                                        style={{
                                            height: '40px',
                                            width: '40px',
                                            fontSize: '30px',
                                            lineHeight: '0'
                                        }}
                                    >
                                        <IoIosCloseCircleOutline />
                                    </button>
                                    <img
                                        src={process.env.REACT_APP_FETCH_IMAGES+`/${this.state.image}`}
                                        alt=""
                                        width="100"
                                        className="mb-3 d-block"
                                    />
                                </div>
                            ) : (
                                <>
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
                                </>
                            )
                        }
                    </div>
                    <div className="field-group mb-5">
                        <button
                            type="submit"
                            className="btn btn-primary rounded-sm border-0 px-4 shadow-none"
                            onClick={this.HandleOnSubmit}
                        >
                            Update
                        </button>
                    </div>
                </div>
            </>

        return (
            <Layout>
                <div className="container-fluid">
                    {lists}
                </div>
            </Layout>
        )
    }
}
