import React from 'react';

import { useState, useEffect } from 'react';

import './auth.css';
import { useNavigate } from 'react-router-dom';

import logo from '../edo.png';
import { auth, db } from "../firebase";

import { collection, getDocs, query, where } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { async } from '@firebase/util';

function Login(){

    const[password, setPassword] = useState("");
    const navigate = useNavigate();

  

    const [showError, setShowError] = useState(false);

   const[email, setEmail] = useState("");
   const[message, setMessage] = useState("");
   const[isLoading, setLoading] = useState(false);


   async function handleSignIn(e) {
    e.preventDefault();
    setShowError(false);
  
    try {

        setLoading(true);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log("Signed in as:", user);

      localStorage.setItem("authid", user.uid);
      localStorage.setItem("authemail",email);
  
     setLoading(false)
      // Continue with your navigation logic
      navigate('/executive/dashboard');
    } catch (error) {
        setLoading(false)
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("Error signing in:", errorCode, errorMessage);
      setShowError(true);
      setMessage(errorMessage);
    }
  }
    return (
        <>
            <div className='maindiv'>

               

            <form onSubmit={handleSignIn}>
                {/* <div className='form-group'>
                    <input onChange={function(e){
                        setHospitalCode(e.target.value);
                    }} value={hospital_code} type="text"name="hospital_code"className='form-control'placeholder='Enter Hospital Code'required />

                </div> */}

                <div className='col-md-4 m-auto'>

                    <div className='text-center py-5'>

                        {showError && <div className='alert alert-danger text-danger font-weight-bold'>
                            <p className='text-center'>Invalid login credentials</p>

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

                 

                    <div className='form-group mt-3'>
                        <input onChange={function(e){
                            setPassword(e.target.value);

                        }} value={password} type="password"className='form-control py-4'placeholder='Enter Secured Password'required />

                    </div>
                   
                        <br/>
                    <div className='text-center mt-3'>
                <button type="submit"className='btn btn-success w-100 btn-sm submit py-2'>{isLoading ? '....Loading' : 'Go To Dashboard'}</button>

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

export default Login;