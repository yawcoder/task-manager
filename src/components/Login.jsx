import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { useState, useEffect} from 'react';
import { auth } from '../firebaseConfig';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("")
    let navigate = useNavigate();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if(user){
                navigate("/dashboard");
            }
        })
    }, [])

    const login = async (e) => {
        e.preventDefault();
        try{
            const user = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
            onAuthStateChanged(auth, (user => {
                if(user){
                    navigate("/dashboard")
                }
            }))
        }
        catch(error){
            if(error.code === "auth/invalid-email" || error.code === "auth/invalid-credential"){
                alert("Invalid Email or Password")
            }
            // console.log(error.code)
        }
    }


  return (
    <div>
        <form onSubmit={login}>
            <input type="email" placeholder="Enter your Email" onChange={(e) => {setLoginEmail(e.target.value)}}/>
            <input type="password" placeholder="Enter your Password" onChange={(e) => {setLoginPassword(e.target.value)}}/>
            <button type="submit">Login</button>
        </form>
    </div>
  )
}

export default Login