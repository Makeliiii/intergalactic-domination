import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

class SignUp extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            password: "",
            passwordConfirm: "",
            isLoading: false,
            registerSuccess: false
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
        if (this.state.passwordConfirm !== this.state.password) {
            validForm = false
            alert("Your passwords don't match")
        }

        return validForm;
    }

    // handleSubmit that sends a request to the api
    handleSubmit(e) {
        e.preventDefault()

        if (this.handleValidation()) {
            const url = "http://34.239.125.70/api/users/register"

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
                this.setState({ registerSuccess: true })
            })
        }
    }
    
    render() {
        if (this.state.registerSuccess) {
            return <Redirect to='/signin' />
        }

        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        <input type="text" placeholder="Username" value={this.state.username} onChange={e => {this.setState({ username: e.target.value })}} />
                    </label>
                    <label>
                        <input type="password" placeholder="Password" value={this.state.password} onChange={e => {this.setState({ password: e.target.value })}} />
                    </label>
                    <label>
                        <input type="password" placeholder="Confirm Password" value={this.state.passwordConfirm} onChange={e => {this.setState({ passwordConfirm: e.target.value })}} />
                    </label>
                    <input type="submit" value="Submit" onClick={e => this.handleSubmit(e)} />
                </form>
            </div>
        )
    }
}

export default SignUp