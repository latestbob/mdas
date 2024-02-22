import React from 'react';

import { useState, useEffect } from 'react';

import './auth.css';
import { Link, useNavigate } from 'react-router-dom';

import logo from '../edo.png';
import { auth, db } from "../firebase";

import { collection, getDocs, query, where } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { async } from '@firebase/util';

function Forgot(){

   
    const navigate = useNavigate();

  

    const [showError, setShowError] = useState(false);

   const[email, setEmail] = useState("");
   const[message, setMessage] = useState("");
   const[isLoading, setLoading] = useState(false);


   async function handleForgot(e) {
    e.preventDefault();
   
    setShowError(false);

    try {

        setLoading(true);

        // await sendPasswordResetEmail(auth, email);

        // alert('Password reset email sent successfully. Check your inbox.');
        // setTimeout(() => {
        //     navigate('/');
        // }, 1000); 



           const mdasCollection = collection(db, "mdas");
      const q = query(mdasCollection, where("email", "==", email));
  
      const querySnapshot = await getDocs(q);
  
      if (querySnapshot.empty) {
          setLoading(false);
        setShowError(true);
        setMessage("Email Address not registered");

      }

      else{
          await sendPasswordResetEmail(auth, email);

        alert('Password reset email sent successfully. Check your inbox.');
        setTimeout(() => {
            navigate('/');
        }, 1000); 
      }




        setLoading(false);
        
    } catch (error) {
        setLoading(false);

          const errorCode = error.code;
      const errorMessage = error.message;
      //console.error("Error signing in:", errorCode, errorMessage);
      setShowError(true);
      setMessage(errorMessage);
    }
  
    // try {
    //     setLoading(true);
    //   const userCredential = await signInWithEmailAndPassword(auth, email, password);
    //   const user = userCredential.user;
    //   console.log("Signed in as:", user);
  
    //   // Now, let's query the Firestore collection
    //   const mdasCollection = collection(db, "mdas");
    //   const q = query(mdasCollection, where("email", "==", user.email));
  
    //   const querySnapshot = await getDocs(q);
  
    //   if (!querySnapshot.empty) {
    //     // Assuming there's only one matching document, you can access it like this:
    //     const document = querySnapshot.docs[0].data();
  
    //     // Store relevant fields in local storage
    //     localStorage.setItem("mdasDocumentId", querySnapshot.docs[0].id);
    //     localStorage.setItem("mdasName", document.name);
    //     localStorage.setItem("title", document.title);
    //     localStorage.setItem("email",document.email);
    //     localStorage.setItem("type",document.type);
    //     // Add more fields as needed
    //   }
  
    //   // Continue with your navigation logic
    //   setLoading(false);
    //   navigate('/dashboard');
    // } catch (error) {
    //     setLoading(false);
    //   const errorCode = error.code;
    //   const errorMessage = error.message;
    //   console.error("Error signing in:", errorCode, errorMessage);
    //   setShowError(true);
    //   setMessage(errorMessage);
    // }
  }
    return (
        <>
            <div className='maindiv'>

            <form onSubmit={handleForgot}>
                {/* <div className='form-group'>
                    <input onChange={function(e){
                        setHospitalCode(e.target.value);
                    }} value={hospital_code} type="text"name="hospital_code"className='form-control'placeholder='Enter Hospital Code'required />

                </div> */}

                <div className='col-md-4 m-auto'>

                    <div className='text-center py-5'>

                        {showError && <div className='alert alert-danger text-danger font-weight-bold'>
                            <p className='text-center'>Email Address not registered</p>

                        </div>}

                    <img src={logo} className="" style={{
                        width:"100px",
                        height:"100px",
                        borderRadius:"100%",
                    }} />

                    </div>

                    


                    <div className='form-group mb-3'>
                        <input onChange={function(e){
                            setEmail(e.target.value);

                        }} value={email} type="text"className='form-control py-4'placeholder='Enter Email Address'required />

                    </div>

                 

                    

                        <div className='text-center'>
                            <Link to='/' style={{
                                color:"white",
                                fontSize:"13px",
                                fontWeight:"500",
                            }}>Back To Login</Link>

                        </div>
                   
                        <br/>
                    <div className='text-center mt-3'>
                <button type="submit"className='btn btn-success w-100 btn-sm submit py-2'>{isLoading ? 'Loading.....' : 'Verify Email'}</button>

                </div>

                </div>

                {/* <input type="text"className='form-control w-100'placeholder='Enter Hospital Name'/> */}

               
                <br/>

                {/* <Link to={}></Link> */}

                
                

                
            </form>




            </div>
        </>
    );
}

export default Forgot;