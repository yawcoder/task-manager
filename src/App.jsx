import React from 'react'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import CreateAccount from './components/CreateAccount'
import { auth } from './firebaseConfig'

function App() {



  return (
    <div>
    <Router>
      <Routes>
        <Route path="/createaccount" element={<CreateAccount/>}/>
      </Routes>
    </Router>
    </div>
  )
}

export default App