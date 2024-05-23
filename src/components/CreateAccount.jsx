import { useState } from 'react'
import { auth, db } from '../firebaseConfig';
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from 'firebase/auth';
import { setDoc } from 'firebase/firestore';

const CreateAccount = () => {
    const [registerUsername, setRegisterUsername] = useState("");
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");

    const registerUser = async () => {
        try{
            const newUser = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
            await updateProfile(newUser.user, {displayName: registerUsername});
            await sendEmailVerification(newUser.user);
            console.log(newUser.user.uid);
        }
        catch(error){
            console.log(error.message);
        }
    }



  return (
    <div>
        <input type="text" placeholder="Username" onChange={(e) => {setRegisterUsername(e.target.value)}}/>
        <input type="email" placeholder="Email" onChange={(e) => {setRegisterEmail(e.target.value)}}/>
        <input type="password" placeholder="Password" onChange={(e) => {setRegisterPassword(e.target.value)}}/>
        <button onClick={registerUser}>Create Account</button>
    </div>
  )
}

export default CreateAccount