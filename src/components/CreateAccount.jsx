import { useState } from 'react'
import { auth, db } from '../firebaseConfig';
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from 'firebase/auth';
import { setDoc, doc, collection, query, where, getDocs, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const CreateAccount = () => {
    const [registerFirstName, setRegisterFirstName] = useState("")
    const [registerLastName, setRegisterLastName] = useState("")
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const userCollectionRef = collection(db, "users");
    const [registered,setRegistered] = useState(false)

    const registerUser = async () => {     
      try{
          if(registerFirstName !== "" && registerLastName !== ""){
            const newUser = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
            await sendEmailVerification(newUser.user);
            await setDoc(doc(userCollectionRef, newUser.user.uid), {firstName: registerFirstName, lastName: registerLastName, email: registerEmail})
            setRegistered(true);
          } else {
            alert("Name field cannot be empty")
          }
        }
        catch(error){
            if(error.code === "auth/email-already-use"){
              alert("Email exists already")
            }else if(error.code === "auth/invalid-email" || error.code === "auth/missing-email" || error.code === "auth/missing-password"){
              alert("Enter a valid email and password");
            }
            // console.log(error.code)
        }
    }



  return (
    <div>
      {
        registered ? 
        <>
          <p>A Message has being sent to your inbox. Click the link inside to verify your email.</p>
        </> :
        <>
        <input type="text" placeholder="First Name" onChange={(e) => {setRegisterFirstName(e.target.value)}}/>
        <input type="text" placeholder="Last Name" onChange={(e) => {setRegisterLastName(e.target.value)}}/>
        <input type="email" placeholder="Email" onChange={(e) => {setRegisterEmail(e.target.value)}}/>
        <input type="password" placeholder="Password" onChange={(e) => {setRegisterPassword(e.target.value)}}/>
        <button type="submit" onClick={registerUser}>Create Account</button>
        </>
      }
    </div>
  )
}

export default CreateAccount