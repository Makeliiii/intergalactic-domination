import React, { Component } from 'react'
import ProtectedRoute from './ProtectedRoute'

class ProtectedLanding extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <ProtectedRoute>
                
            </ProtectedRoute>
        )
    }
}

export default ProtectedLanding