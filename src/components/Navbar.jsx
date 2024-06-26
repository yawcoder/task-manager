import { useEffect, useState } from 'react'
import logo from "../assets/logo.jpg"
import { auth, db } from '../firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, doc, getDoc } from 'firebase/firestore';
import { useNavigate, Link } from 'react-router-dom';
import { signOut } from 'firebase/auth';

const Navbar = () => {
    let navigate = useNavigate()
    const userCollectionRef = collection(db, "users");
    const [user, setUser] = useState(false)
    const [userFirstName, setUserFirstName] = useState("")


    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            if(user){
                const userId = user.uid;
                const userRef = doc(userCollectionRef, userId);
                const userSnapShot = await getDoc(userRef);
                setUser(true);
                setUserFirstName(userSnapShot.data().firstName);
            }
        })
    },[])

    const signUserOut = async () => {
        await signOut(auth);
        setUser(false);
        navigate("/login");
    }


  return (
    <nav>
        <div>
            <img src={logo} alt="logo" width="300"/>
        </div>
        <div>
            {
                user ?
                <>
                    <p>{userFirstName}</p>
                    <button onClick={signUserOut}>Sign Out</button>
                </> :
                <>
                    <Link to="/login">Log in</Link>
                </>
            }
        </div>
    </nav>
  )
}

export default Navbar