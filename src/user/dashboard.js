import React from 'react';

import './dashboard.css';

import { Link } from 'react-router-dom';

import logo from '../edo.png';
import { auth } from "../firebase";
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

function Dashboard(){

    const[mdaname, setMdaName] = useState("");
    const[summary, setSummary] = useState("");

    React.useEffect(()=>{
        var docId = localStorage.getItem("mdasDocumentId");

        if(docId == null){
            navigate('/');
        }
        else{
            setMdaName(localStorage.getItem("mdasName"));
            
        }
     

     
    },[]);


    useEffect(() => {
        console.log('working');

        if(mdaname != ""){
        
               axios.get(`https://office.laurenparkerway.com/api/mda/summary?mda=${mdaname}`)
                .then(response => {
                 
                    setSummary(response.data);
                  console.log('fetched');
                  console.log(response.data);
                    console.log(response.data);
                })
                .catch(error => {
                  console.log(error);
                });
            }
      }, [mdaname]);


    const navigate = useNavigate();

    const handleSignOut = () => {
        auth.signOut()
          .then(() => {
            // Sign-out successful.
            console.log("User signed out");

            localStorage.removeItem("mdasDocumentId");
            localStorage.removeItem("mdasName");
            localStorage.removeItem("title");
            localStorage.removeItem("type");
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

                        <Link className='slidelink ml-3 py-5 font-weight-bold' to='/dashboard' ><i className='fa fa-bar-chart icons px-2'></i>Dashboard</Link>

                        <hr className='line' />


                        <Link className='slidelink ml-3 py-5' to='/projects' ><i className='fa fa-clock icons px-2'></i>Key Initiatives</Link>

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

                <div className='flextop'>
                    <h3 className='intro py-3'>Dashboard</h3>

                    <div className='py-3'>
                        <i className='fa fa-user text-secondary'></i> <span className='leader'>{localStorage.getItem("title")} </span>
                    </div>
                </div>

                


                {/* activity count */}

                <div className='row'>
                        <div className='col-md-6 mb-3'>
                            <div className='count bg-danger rounded px-3'>

                                <div>
                                    <p className='title'>Late <br/> <span className='figure'>{summary.late_percent && summary.late_percent.toFixed(2)}%</span></p>

                                   
                                </div>

                                <i className='fa fa-exclamation-triangle icontwo text-light'></i>
                                
                            </div>
                        </div>

                        <div className='col-md-6 mb-3'>
                            <div className='count bg-secondary rounded px-3'>
                            <div>
                                    <p className='title'>Not Started <br/> <span className='figure'>{summary.notstarted_percent && summary.notstarted_percent.toFixed(2)}%</span></p>

                                   
                                </div>

                                <i className='fa fa-clock icontwo text-light'></i>
                                
                              
                            </div>
                        </div>

                        

                       
                    </div>



                    <div className='row'>
                        <div className='col-md-6 mb-3'>
                            <div className='count bg-warning rounded px-3'>

                                <div>
                                    <p className='titledark'>On Time <br/> <span className='figuredark'>{summary.ontime_percent && summary.ontime_percent.toFixed(2)}%</span></p>

                                   
                                </div>

                                <i className='fa fa-gear icontwo text-dark'></i>
                                
                            </div>
                        </div>

                        <div className='col-md-6 mb-3'>
                            <div className='count bg-success rounded px-3'>
                            <div>
                                    <p className='title'>Completed <br/> <span className='figure'>{summary.complete_percent && summary.complete_percent.toFixed(2)}%</span></p>

                                   
                                </div>

                                <i className='fa fa-check icontwo text-light'></i>
                                
                              
                            </div>
                        </div>

                        

                    </div>



                {/* end of activity count */}




                <div className='summary card'>
                <h4 className='card-header text-center'>Initiatives  Summary</h4>

                    <div className='row card-body'>
                        <div className='col-md-6'>
                       

                                    <div className='form-group'>
                                    <div className='labeldiv'>

                                            <p>Initiation</p>
                                            <p>{summary.initiation}</p>
                                            </div> 
                                        {/* <input className='w-100' type="range" value="20" /> */}


                                        <progress className='w-100 pending' value={summary.initiation} max={summary.total}></progress>

                                        

                                    </div>

                                    <div className='form-group'>
                                    <div className='labeldiv'>

                                        <p>Planning</p>
                                        <p>{summary.planning}</p>
</div> 
                                        {/* <input className='w-100' type="range" value="20" /> */}


                                        <progress className='w-100 completed' value={summary.planning} max={summary.total}></progress>

                                        

                                    

                                </div>

                        </div>

                        <div className='col-md-6'>

                        <div className='form-group'>
                                        <div className='labeldiv'>

                                            <p>Execution</p>
                                            <p>{summary.execution}</p>
                                        </div> 
                                        {/* <input className='w-100' type="range" value="20" /> */}


                                        <progress className='w-100 execution' value={summary.execution} max={summary.total}></progress>

                                        

                                    </div>

                                    <div className='form-group'>
                                    <div className='labeldiv'>

                                            <p>Done</p>
                                            <p>{summary.completed}</p>
                                            </div> 
                                        {/* <input className='w-100' type="range" value="20" /> */}


                                        <progress className='w-100 complete' value={summary.completed} max={summary.total}></progress>

                                        

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