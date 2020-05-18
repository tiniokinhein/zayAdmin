import React, { Component } from 'react'
import Layout from '../layout/Layout'
import { IoIosArrowRoundBack } from 'react-icons/io'
import { db } from '../../auth/firebase'
import { nanoid } from 'nanoid'
import Axios from 'axios'


const generateDate = () => {

    const now = new Date()

    const options = {
        day: "numeric",
        month: "long",
        year: "numeric"

    }

    const year = now.getFullYear()

    let month = now.getMonth() + 1
    if(month < 10) {
        month = `0${month}`
    }

    let day = now.getDate()
    if(day < 10) {
        day = `0${day}`
    }

    const minute = now.getMinutes()

    return {
        formatted: `${year}-${month}-${day}-${minute}`,
        pretty: now.toLocaleDateString("en-US" , options)
    }
}

export default class CreatePost extends Component 
{
    state = {
        title: '',
        slug: '',
        title_mm: '',
        image: '',
        price: '',
        weight: '',
        unit: '',
        category: '',
        description: '',
        units: [],
        categories: [],
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
        const date = generateDate()

        const newData = {
            title: this.state.title,
            slug: this.state.title.toLowerCase().replace(/\s+/g,"-"),
            title_mm: this.state.title_mm,
            dateFormatted: date.formatted,
            datePretty: date.pretty,
            dateRaw: Date(Date.now()).toString(),
            description: this.state.description,
            price: this.state.price,
            weight: this.state.weight,
            unit: this.state.unit,
            category: {
                title: this.state.category
            },
            id: nanoid(3),
            image: this.state.selectedFile.name
        }

        const fd = new FormData()
        fd.append('image', this.state.selectedFile , this.state.selectedFile.name)
        Axios.post(process.env.REACT_APP_UPLOAD_IMAGES , fd)
        .then(res => {
            console.log(res)
        })

        db 
        .ref(process.env.REACT_APP_FOODS+`/${newData.slug}`)
        .set(newData, () => {
            this.props.history.push('/posts')
        })
    }

    getUnits = () => {
        db 
        .ref(process.env.REACT_APP_UNITS)
        .on('value' , snapshot => {
            let data = []
            snapshot.forEach(snap => {
                data.push(snap.val())
            })
            this.setState({
                units: data
            })
        })
    }

    getCategories = () => {
        db 
        .ref(process.env.REACT_APP_CATEGORIES)
        .on('value' , snapshot => {
            let data = []
            snapshot.forEach(snap => {
                data.push(snap.val())
            })
            this.setState({
                categories: data
            })
        })
    }

    componentDidMount() {
        this.getUnits()
        this.getCategories()
        window.scrollTo(0,0)
    }

    render() {

        const { 
            units, 
            categories 
        } = this.state


        const lists = 
            <div className="col-12 col-md-6 px-0">
                <div className="field-group mb-5">
                    <label
                        className=""
                        htmlFor="title"
                    >
                        Title (English)
                    </label>
                    <input
                        type="text"
                        name="title"
                        id="title"
                        value={this.state.title}
                        onChange={this.handleOnChange.bind(this)}
                        className="form-control rounded-sm shadow-none border-primary bg-transparent"
                        style={{
                            height: '50px'
                        }}
                    />
                </div>
                <div className="field-group mb-5">
                    <label
                        className=""
                        htmlFor="title_mm"
                    >
                        Title (Myanmar)
                    </label>
                    <input
                        type="text"
                        name="title_mm"
                        id="title_mm"
                        value={this.state.title_mm}
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
                    <span className="text-danger"><small>Width : 1200px , Height : 1200px (PNG)</small></span>
                </div>
                <div className="field-group mb-5">
                    <label
                        className=""
                        htmlFor="price"
                    >
                        Price
                    </label>
                    <input
                        type="text"
                        name="price"
                        id="price"
                        value={this.state.price}
                        onChange={this.handleOnChange.bind(this)}
                        className="form-control rounded-sm shadow-none border-primary bg-transparent"
                        style={{
                            height: '50px'
                        }}
                    />
                </div>
                <div className="field-group mb-5">
                    <div className="d-flex">
                        <div className="flex-grow-1 mr-2">
                            <label
                                className=""
                                htmlFor="weight"
                            >
                                Weight
                            </label>
                            <input
                                type="text"
                                name="weight"
                                id="weight"
                                value={this.state.weight}
                                onChange={this.handleOnChange.bind(this)}
                                className="form-control rounded-sm shadow-none border-primary bg-transparent"
                                style={{
                                    height: '50px'
                                }}
                            />
                        </div>
                        <div className="ml-auto">
                            <label
                                className=""
                                htmlFor="unit"
                            >
                                Unit
                            </label>
                            <div>
                                <select
                                    value={this.state.unit}
                                    onChange={this.handleOnChange.bind(this)}
                                    name="unit"
                                    id="unit"
                                    className="custom-select form-control rounded-sm shadow-none border-primary bg-transparent"
                                    style={{
                                        height: '50px',
                                        lineHeight: '2'
                                    }}
                                >
                                    <option
                                        value="none"
                                    >Choose...</option>
                                    {
                                        units.map((p,index) => (
                                            <option 
                                                key={index}
                                                value={p.name}
                                            >{p.name}</option>
                                        ))
                                    }
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="field-group mb-5">
                    <label
                        className=""
                        htmlFor="category"
                    >
                        Category
                    </label>
                    <div>
                        <select
                            value={this.state.category}
                            onChange={this.handleOnChange.bind(this)}
                            name="category"
                            id="category"
                            className="custom-select form-control rounded-sm shadow-none border-primary bg-transparent"
                            style={{
                                height: '50px',
                                lineHeight: '2'
                            }}
                        >
                            <option
                                value="none"
                            >Choose...</option>
                            {
                                categories.map((p,index) => (
                                    <option 
                                        key={index}
                                        value={p.title}
                                    >{p.title}</option>
                                ))
                            }
                        </select>
                    </div>
                </div>
                <div className="field-group mb-5">
                    <label
                        className=""
                        htmlFor="description"
                    >
                        Description
                    </label>
                    <textarea
                        rows="1"
                        name="description"
                        id="description"
                        value={this.state.description}
                        onChange={this.handleOnChange.bind(this)}
                        className="form-control rounded-sm shadow-none border-primary bg-transparent"
                        style={{
                            height: '50px'
                        }}
                    />
                </div>
                <div className="field-group mb-5">
                    <button
                        type="submit"
                        className="btn btn-primary rounded-sm border-0 px-4 shadow-none"
                        onClick={this.HandleOnSubmit}
                    >
                        Save
                    </button>
                </div>
            </div>

        return (
            <Layout>
                <div className="container-fluid">
                    <h1 className="h3 mb-5 text-gray-800">
                        <button 
                            onClick={() => this.props.history.push('/posts')}
                            className="btn btn-transparent rounded-0 border-0 shadow-none p-0"
                            style={{
                                fontSize: '30px',
                                lineHeight: '0'
                            }}
                        >
                            <IoIosArrowRoundBack />
                        </button> Create Post
                    </h1>
                    {lists}
                </div>
            </Layout>
        )
    }
}
