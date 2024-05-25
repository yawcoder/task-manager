import React, { useEffect } from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '../firebaseConfig'
import { useNavigate } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'

const Dashboard = () => {
    let navigate = useNavigate()

    useEffect(() => {
        onAuthStateChanged(auth, (user) =>{
            if(!user){
                navigate("/login")
            }
        })
    }, [])

    const signUserOut = async () => {
        await signOut(auth);
        navigate("/login");
    }


  return (
    <div>
        <p>Dashboard</p>
        <button onClick={signUserOut}>Sign Out</button>
    </div>
  )
}

export default Dashboard