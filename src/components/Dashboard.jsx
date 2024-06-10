import { useEffect } from 'react'
import { auth } from '../firebaseConfig'
import { useNavigate } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import Navbar from './Navbar'

const Dashboard = () => {
    let navigate = useNavigate()

    useEffect(() => {
        onAuthStateChanged(auth, (user) =>{
            if(!user){
                navigate("/login")
            }
        })
    }, [])


  return (
    <div>
        <Navbar/>
        <p>Dashboard</p>
    </div>
  )
}

export default Dashboard