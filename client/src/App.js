import React from 'react'
import { Route, Link } from 'react-router-dom'

import SignUp from './components/SignUp'
import SignIn from './components/SignIn'

function App() {
  return (
    <div className="App">
        <SignUp />
        <SignIn />
    </div>
  )
}

export default App