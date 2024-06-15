import { useEffect, useState } from 'react'
import { auth, db } from '../firebaseConfig'
import { useNavigate } from 'react-router-dom'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import Navbar from './Navbar'
import NotionKanban from './NotionKanban'
import logo from "../assets/logo.jpg"
import { doc, getDoc, collection } from 'firebase/firestore'
import Sidebar from './Sidebar'

const Dashboard = () => {
    const userCollectionRef = collection(db, "users");
    let navigate = useNavigate()
    const [userFirstName, setUserFirstName] = useState("")

    useEffect(() => {
        onAuthStateChanged(auth, async (user) =>{
            if(!user){
                navigate("/login")
            }else{
                const userId = user.uid;
                const userRef = doc(userCollectionRef, userId);
                const userSnapShot = await getDoc(userRef);
                setUserFirstName(userSnapShot.data().firstName);
            }
        })
    }, []);

    const signUserOut = async () => {
        await signOut(auth);
        navigate("/login");
    }


  return (
    <div>
        <div className="flex w-full">
            <Sidebar userFirstName={userFirstName} signUserOut={signUserOut}/>
            <section className="py-10 h-[5000px]">
                <input type="text" placeholder="Search" />
            </section>
        </div>
    </div>
  )
}

export default Dashboard