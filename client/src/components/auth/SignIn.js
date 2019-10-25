import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { setInStorage, getFromStorage } from '../../utils/storage'

class SignIn extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            password: "",
            isLoading: false,
            isAuthenticated: false
        }

        // bind functions
        this.handleSignIn = this.handleSignIn.bind(this)
    }

    // form validation
    handleValidation() {
        let validForm = true

        if (!/^[a-zA-Z0-9]+$/.test(this.state.username)) {
            validForm = false
            alert("Your username can contain only letters and numbers")
        }
        if (this.state.password.length < 6) {
            validForm = false
            alert("Your password must be atleast 6 characters long")
        }

        return validForm;
    }

    // handleSubmit that sends a request to the api
    handleSignIn(e) {
        e.preventDefault()

        if (this.handleValidation()) {
            const url = "http://34.239.125.70/api/users/login"

            this.setState({ isLoading: true })

            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: this.state.username,
                    password: this.state.password
                })
            })
            .then(res => res.json())
            .then(json => {
                console.log('json', json)
                if (json.success) {
                    setInStorage('Token', json.token )
                    this.setState({
                        isLoading: false,
                        username: '',
                        password: '',
                        token: json.token,
                        isAuthenticated: true
                    })
                } else {
                    this.setState({
                        isLoading: false
                    })
                }
            })
        }
    }
    
    render() {
        if (this.state.isAuthenticated) {
            return <Redirect to='/map' />
        }

        return (
            <div>
                <form onSubmit={this.handleSignIn}>
                    <label>
                        <input type="text" placeholder="Username" value={this.state.username} onChange={e => {this.setState({ username: e.target.value })}} />
                    </label>
                    <label>
                        <input type="password" placeholder="Password" value={this.state.password} onChange={e => {this.setState({ password: e.target.value })}} />
                    </label>
                    <input type="submit" value="Submit" onClick={e => this.handleSignIn(e)} />
                </form>
            </div>
        )
    }
}

export default SignIn