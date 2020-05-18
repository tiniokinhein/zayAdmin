import React, { Component } from 'react'
import { db } from '../auth/firebase'
import Layout from '../components/layout/Layout'
import { FiEdit2 } from 'react-icons/fi'
import { GoTrashcan , GoPlus } from 'react-icons/go'
import Spinner from '../components/layout/Spinner'


const FETCHIMG = process.env.REACT_APP_FETCH_IMAGES

export default class Banners extends Component 
{
    state = {
        posts: []
    }

    getPosts = () => {
        db
        .ref(process.env.REACT_APP_BANNERS)
        .orderByChild('title')
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

    render() {

        const { posts } = this.state

        const postLists = posts.length ? (
            <>
                <div className="table-responsive">
                    <table 
                        className="table table-striped table-borderless table-dark"
                        width="100%" 
                    >
                        <thead>
                            <tr>
                                <th scope="col"><strong>Title</strong></th>
                                <th scope="col"><strong>Image</strong></th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                posts.map((p,index) => (
                                    <tr key={index}>
                                        <td className="align-middle">{p.title}</td>
                                        <td className="align-middle">
                                            <img
                                                src={FETCHIMG+`/${p.image}`}
                                                alt=""
                                                width="100"
                                            />
                                        </td>
                                        <td className="float-right">
                                            <button
                                                className="btn btn-info text-white border-0 rounded-circle mr-2 my-2 shadow-none"
                                                style={{
                                                    width: '40px',
                                                    height: '40px'
                                                }}
                                                onClick={() => this.props.history.push(`/edit-banner/${p.slug}`)}
                                            >
                                                <FiEdit2 />
                                            </button>
                                            <button
                                                className="btn btn-danger text-white border-0 rounded-circle my-2 shadow-none"
                                                style={{
                                                    width: '40px',
                                                    height: '40px'
                                                }}
                                                onClick={() => this.props.history.push(`/delete-banner/${p.slug}`)}
                                            >
                                                <GoTrashcan />
                                            </button>
                                        </td>
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
                    <h1 className="h3 mb-3 text-gray-800">Banners</h1>
                    <div className="card shadow-none mb-4 border-0 bg-transparent">
                        <div className="card-body p-0">
                            <div className="d-flex mb-3 pb-3 border-bottom">
                                <button
                                    className="btn btn-dark text-white border-0 shadow-none rounded-sm"
                                    onClick={() => this.props.history.push('/create-banner')}
                                >
                                    <GoPlus /> New Banner
                                </button>
                            </div>
                            {postLists}                                    
                        </div>
                    </div>
                </div>
            </Layout>
        )
    }
}
