import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Landing extends Component {
    render() {
        return(
            <div>
                <Link to='/register'>
                    <button>
                        Register
                    </button>
                </Link>

                <Link to='/signin'>
                    <button>
                        Sign In
                    </button>
                </Link>
            </div>
        )
    }
}

export default Landing