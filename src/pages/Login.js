import React, { Component } from 'react'
import { signIn } from '../auth/config'

export default class Login extends Component 
{
    state = {
        error: null,
        email: '',
        password: ''
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    async handleSubmit(e) {
        e.preventDefault()
        this.setState({
            error: ''
        })
        try {
            await signIn(this.state.email , this.state.password)
        } catch(error) {
            this.setState({
                error: error.message
            })
        }
    }

    render() {
        return (
            <div 
                style={{
                    backgroundColor: '#4e73df',
                    backgroundImage: 'linear-gradient(180deg,#4e73df 10%,#224abe 100%)',
                    backgroundSize: 'cover'
                }}
            >
                <div className="container">
                    <div className="d-table w-100 h-100">
                        <div 
                            className="d-table-cell align-middle"
                            style={{
                                height: '100vh',
                                minHeight: '600px'
                            }}
                        >
                            <div className="col-12 col-md-10 col-lg-6 mx-auto">
                                <div 
                                    className="p-5 bg-white shadow-lg"
                                    style={{
                                        borderRadius: '1rem'
                                    }}
                                >
                                    <div className="text-center">
                                        <h1 className="h4 text-gray-900 mb-5">Admin</h1>
                                    </div>
                                    <form 
                                        className="user"
                                        onSubmit={this.handleSubmit.bind(this)}
                                    >
                                        <div className="form-group">
                                            <input 
                                                type="email" 
                                                className="form-control form-control-user rounded-pill shadow-none" 
                                                id="email" 
                                                name="email"
                                                aria-describedby="emailHelp" 
                                                placeholder="Email" 
                                                style={{
                                                    height: '50px'
                                                }}
                                                value={this.state.email}
                                                onChange={this.handleChange.bind(this)}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <input 
                                                type="password" 
                                                className="form-control form-control-user rounded-pill shadow-none" 
                                                id="password" 
                                                name="password"
                                                placeholder="Password" 
                                                style={{
                                                    height: '50px'
                                                }}
                                                value={this.state.password}
                                                onChange={this.handleChange.bind(this)}
                                            />
                                        </div>
                                        <div className="form-group">
                                            {
                                                this.state.error ? <p className="text-danger">{this.state.error}</p> : null
                                            }
                                            <button
                                                className="btn btn-primary w-100 rounded-pill shadow-none"
                                                style={{
                                                    height: '50px'
                                                }}
                                            >Login</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
