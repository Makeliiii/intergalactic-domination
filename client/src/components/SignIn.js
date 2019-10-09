import React, { Component } from 'react'
import {
    setInStorage,
    getFromStorage
} from '../utils/storage'

class SignIn extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            password: "",
            isLoading: false
        }

        // bind handleSubmit to `this`
        this.handleSubmit = this.handleSubmit.bind(this)
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
    handleSubmit(e) {
        e.preventDefault()

        if (this.handleValidation()) {
            const url = "http://localhost:5000/users/login"

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
                    setInStorage('Car_charging_app', { token: json.token })
                    this.setState({
                        isLoading: false,
                        username: '',
                        password: '',
                        token: json.token
                    })
                } else {
                    this.setState({
                        isLoading: false
                    })
                }
            })
        }
    }

    componentDidMount() {
        const obj = getFromStorage('Car_charging_app')
        if (obj && obj.token) {
            const { token } = obj

            // Verify token
            fetch('http://localhost:5000/users/verify?token=' + token)
                .then(res => res.json())
                .then(json => {
                    if (json.success) {
                        this.setState({
                            token,
                            isLoading: false
                        })
                    } else {
                        this.setState({
                            isLoading: false
                        })
                    }
                })
        } else {
            this.setState({
                isLoading: false
            })
        }
    }
    
    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        <input type="text" placeholder="Username" value={this.state.username} onChange={e => {this.setState({ username: e.target.value })}} />
                    </label>
                    <label>
                        <input type="password" placeholder="Password" value={this.state.password} onChange={e => {this.setState({ password: e.target.value })}} />
                    </label>
                    <input type="submit" value="Submit" onClick={e => this.handleSubmit(e)} />
                </form>
            </div>
        )
    }
}

export default SignIn