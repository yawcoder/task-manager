import React from 'react'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import CreateAccount from './components/CreateAccount'
import { auth } from './firebaseConfig'
import Login from './components/Login'
import Verified from './components/Verified'
import Dashboard from './components/Dashboard'

function App() {



  return (
    <div>
    <Router>
      <Routes>
        <Route path="/createaccount" element={<CreateAccount/>}/>
        <Route path="/login" element={<Login/>} />
        <Route path="/email-verified" element={<Verified/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
      </Routes>
    </Router>
    </div>
  )
}

export default App