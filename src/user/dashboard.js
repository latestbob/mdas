import React from 'react';

import './dashboard.css';

import { Link } from 'react-router-dom';

import logo from '../edo.png';
import { auth } from "../firebase";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function Dashboard(){

    const[mdaname, setMdaName] = useState("");
    

    React.useEffect(()=>{
        var docId = localStorage.getItem("mdasDocumentId");

        if(docId == null){
            navigate('/');
        }
        else{
            setMdaName(localStorage.getItem("mdasName"));
        }
     

     
    },[]);


    const navigate = useNavigate();

    const handleSignOut = () => {
        auth.signOut()
          .then(() => {
            // Sign-out successful.
            console.log("User signed out");

            localStorage.removeItem("mdasDocumentId");
            localStorage.removeItem("mdasName");
            localStorage.removeItem("mdasLeader");
            localStorage.removeItem("email");

            navigate('/');

        
          })
          .catch((error) => {
            // An error happened.
            console.error("Error signing out:", error);
          });
      };

    return (

        
        <>

        <div className='main row'>
            <div className='col-md-3 third 'style={{
                background:"#293D34",
            }}>

                <div className='text-center py-5'>

                    <div className='flexdiv px-2'>
                            <img src={logo} className="logo mr-4"/>

                        <h4 className='mdaname text-left'>{mdaname}</h4>

                    </div>


                    


                   
                    

                    <div className='linkss px-1 text-left'>

                    <hr className='line' />

                        <Link className='slidelink ml-3 py-5 font-weight-bold' to={'/dashboard'} ><i className='fa fa-bar-chart icons px-2'></i>Dashboard</Link>

                        <hr className='line' />


                        <Link className='slidelink ml-3 py-5' to={'/projects'} ><i className='fa fa-clock icons px-2'></i>Key Initiatives</Link>

                <hr className='line' />

                    </div>

               

            


            
                    

{/* <Link style={{
                        textDecoration:"none",
                    }} to={'/dashboard'}>
                    <p className='font-weight-bold py-1 mx-2 my-3 activelink rounded'>Dashboard</p>
                    </Link>
                    
                    <Link style={{
                        textDecoration:"none",
                    }} to={'/records'}>
                    <p className='font-weight-bold py-1 mx-2 my-3 hoverme rounded'>View Records</p>
                    </Link> */}

                    <br/>
                    <button onClick={handleSignOut} className='btn btn-danger text-light font-weight-bold'>Logout</button>

             

           

   



                </div>




            </div>

            <div className='col-md-9 full m-0 px-5 py-5'>

                <h3 className='intro py-3'>Dashboard</h3>


                {/* activity count */}

                <div className='row'>
                        <div className='col-md-4 mb-3'>
                            <div className='count bg-danger rounded px-3'>

                                <div>
                                    <p className='title'>Overdue Projects <br/> <span className='figure'>20</span></p>

                                   
                                </div>

                                <i className='fa fa-exclamation-triangle icontwo text-light'></i>
                                
                            </div>
                        </div>

                        <div className='col-md-4 mb-3'>
                            <div className='count bg-warning rounded px-3'>
                            <div>
                                    <p className='titledark'>Pending Projects <br/> <span className='figuredark'>5</span></p>

                                   
                                </div>

                                <i className='fa fa-clock icontwo text-dark'></i>
                                
                              
                            </div>
                        </div>

                        

                        <div className='col-md-4 mb-3'>
                            <div className='count bg-success rounded px-3'>

                            <div>
                                    <p className='title'>Completed Projects <br/> <span className='figure'>10</span></p>

                                   
                                </div>

                                <i className='fa fa-check icontwo text-light'></i>
                                
                            </div>
                        </div>
                    </div>



                {/* end of activity count */}




                    <div className='row summary'>
                        <div className='col-md-6'>
                            <div className='card'>
                                <h4 className='card-header'>Project Summary</h4>

                                <div className='card-body'>


                                    <div className='form-group'>
                                        <div className='labeldiv'>

                                            <p>Overdue Projects</p>
                                            <p>20%</p>
                                        </div> 
                                        {/* <input className='w-100' type="range" value="20" /> */}


                                        <progress className='w-100 overdue' value="20" max="100"></progress>

                                        

                                    </div>

                                    <div className='form-group'>
                                    <div className='labeldiv'>

                                            <p>Pending Projects</p>
                                            <p>60%</p>
                                            </div> 
                                        {/* <input className='w-100' type="range" value="20" /> */}


                                        <progress className='w-100 pending' value="60" max="100"></progress>

                                        

                                    </div>

                                    <div className='form-group'>
                                    <div className='labeldiv'>

                                        <p>Completed Projects</p>
                                        <p>10%</p>
</div> 
                                        {/* <input className='w-100' type="range" value="20" /> */}


                                        <progress className='w-100 completed' value="10" max="100"></progress>

                                        

                                    </div>

                                </div>
                            </div>
                        </div>

                    </div>
            
            </div>


           




        </div>
        

    </>
    );
}


export default Dashboard;