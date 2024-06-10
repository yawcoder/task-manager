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
    <div className="w-full flex h-screen justify-center items-center">
        <form onSubmit={login} className="flex flex-col gap-5 border-2 py-5 px-5 w-11/12">
            <input type="email" placeholder="Enter your Email" onChange={(e) => {setLoginEmail(e.target.value)}} className="border-2 p-3"/>
            <input type="password" placeholder="Enter your Password" onChange={(e) => {setLoginPassword(e.target.value)}}/>
            <button type="submit" className="bg-red-400 py-3">Login</button>
        </form>
    </div>
  )
}

export default Login