import React from 'react'
import { Route } from 'react-router-dom'

import SignUp from './components/auth/SignUp'
import SignIn from './components/auth/SignIn'
import Landing from './components/Landing'

function App() {
  return (
    <div className="App">
        <Route exact path='/' component={ Landing } />
        <Route path='/register' component={ SignUp } />
        <Route path='/signin' component={ SignIn } />
    </div>
  )
}

export default App