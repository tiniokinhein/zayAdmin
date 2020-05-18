import React, { Component } from 'react'
import { db } from '../auth/firebase'
import Layout from '../components/layout/Layout'
import { FiEdit2 } from 'react-icons/fi'
import { GoTrashcan , GoPlus } from 'react-icons/go'
import Spinner from '../components/layout/Spinner'

export default class Posts extends Component 
{
    state = {
        posts: [],
        searchTitle: '',
        visible: 30
    }

    handleOnChange = e => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    getPosts = () => {
        db
        .ref(process.env.REACT_APP_FOODS)
        .orderByChild('id')
        .on('value' , snapshot => {
            let data = []
            snapshot.forEach(snap => {
                data.push(snap.val())
            })
            const allData = data.reverse()
            this.setState({
                posts: allData
            })
        })
    }

    componentDidMount() {
        this.getPosts()
        window.scrollTo(0,0)
    }

    loadMore = () => {
        this.setState((prev) => {
            return {
                visible: prev.visible + 15
            }
        })
    }

    render() {

        const { posts , searchTitle , visible } = this.state


        // FILTER SEARCH (START)
        const postDatas = posts.filter(p => {
            return p.title_mm.toLowerCase().indexOf(searchTitle.toLowerCase()) !== -1
        })
        // FILTER SEARCH (END)


        const postLists = postDatas.length ? (
            <>
                <div className="table-responsive">
                    <table 
                        className="table table-striped table-borderless" 
                        width="100%" 
                    >
                        <thead>
                            <tr>
                                <th scope="col"><strong>ID</strong></th>
                                <th scope="col"><strong>Title</strong></th>
                                <th scope="col"><strong>Price</strong></th>
                                <th scope="col"><strong>Weight</strong></th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                postDatas.slice(0,visible).map((p,index) => (
                                    <tr key={index}>
                                        <td className="align-middle">{p.id}</td>
                                        <td className="align-middle">{p.title_mm}</td>
                                        <td className="align-middle">{p.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} ကျပ်</td>
                                        <td className="align-middle">{p.weight} {p.unit}</td>
                                        <td className="float-right">
                                            <button
                                                className="btn btn-info text-white border-0 rounded-circle mr-2 my-2 shadow-none"
                                                style={{
                                                    width: '40px',
                                                    height: '40px'
                                                }}
                                                onClick={() => this.props.history.push(`/edit-post/${p.slug}`)}
                                            >
                                                <FiEdit2 />
                                            </button>
                                            <button
                                                className="btn btn-danger text-white border-0 rounded-circle my-2 shadow-none"
                                                style={{
                                                    width: '40px',
                                                    height: '40px'
                                                }}
                                                onClick={() => this.props.history.push(`/delete-post/${p.slug}`)}
                                            >
                                                <GoTrashcan />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            }
                            {
                                visible < postDatas.length &&
                                <tr>
                                    <td
                                        colSpan="5"
                                        className="align-middle text-center py-4"
                                    >
                                        <button
                                            onClick={this.loadMore.bind(this)}
                                            className="btn btn-primary text-white border-0 shadow-sm rounded-pill px-4 py-2"
                                        >
                                            Click More
                                        </button>
                                    </td>
                                </tr>
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
                    <h1 className="h3 mb-3 text-gray-800">Posts</h1>
                    <div className="card shadow-none bg-transparent mb-4 border-0">
                        <div className="card-body p-0">
                            <div className="d-flex mb-3 pb-3 border-bottom">
                                <button
                                    className="btn btn-primary text-white border-0 shadow-none rounded-sm"
                                    onClick={() => this.props.history.push('/create-post')}
                                    style={{
                                        height: '36px'
                                    }}
                                >
                                    <GoPlus /> New Post
                                </button>
                                <div className="ml-auto">
                                    <input
                                        type="text"
                                        name="searchTitle"
                                        onChange={this.handleOnChange.bind(this)}
                                        value={searchTitle}
                                        placeholder="&#8981; Title"
                                        className="form-control shadow-none rounded-pill border-secondary px-3 bg-transparent text-secondary"
                                        style={{
                                            height: '36px'
                                        }}
                                    />
                                </div>
                            </div>
                            {postLists}                                    
                        </div>
                    </div>
                </div>
            </Layout>
        )
    }
}
