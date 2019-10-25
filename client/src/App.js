import React from 'react'
import { Route } from 'react-router-dom'

// import components
import SignUp from './components/auth/SignUp'
import SignIn from './components/auth/SignIn'
import Landing from './components/Landing'
import ChargerMap from './components/Map/ChargerMap'

function App() {
  return (
    <div className="App">
        <Route exact path='/' component={ Landing } />
        <Route path='/register' component={ SignUp } />
        <Route path='/signin' component={ SignIn } />
        <Route path='/map' component={ ChargerMap } />
    </div>
  )
}

export default App