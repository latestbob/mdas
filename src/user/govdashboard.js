import React from 'react';

import './dashboard.css';

import { Link } from 'react-router-dom';

import logo from '../edo.png';
import { auth } from "../firebase";
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';


function GovDashboard(){

    const[mdaname, setMdaName] = useState("");
    // const[summary, setSummary] = useState("");

    React.useEffect(()=>{
        var docId = localStorage.getItem("authid");

        if(docId == null){
            navigate('/');
        }
        
     

     
    },[]);



    React.useEffect(()=>{
       
        axios.get('https://office.laurenparkerway.com/api/completionrate')
        .then(response => {
         
            setSummary(response.data);
          //console.log('fetched');
          console.log(response.data);
          
        })
        .catch(error => {
          console.log(error);
        });
     

     
    },[]);

    
    const navigate = useNavigate();

    const handleSignOut = () => {
        auth.signOut()
          .then(() => {
            // Sign-out successful.
            console.log("User signed out");

            localStorage.removeItem("authid");
            localStorage.removeItem("authemail");

         
            navigate('/');

        
          })
          .catch((error) => {
            // An error happened.
            console.error("Error signing out:", error);
          });
      };


      const[summary, setSummary] = useState(null);


      React.useEffect(()=>{
       
        
     

     
    },[]);



    return (

        
        <>

        <div className='main row'>
            <div className='col-md-3 third 'style={{
                background:"#293D34",
            }}>

                <div className='text-center py-5'>

                    <div className='flexdiv px-2'>
                            <img src={logo} className="logo mr-4"/>

                        <h4 className='mdaname text-left'>
                            {localStorage.getItem('authemail') == "excellency@mdamonitor.com" ? 'Welcome Your Excellency' : 'Admin Dashboard'}
                        </h4>

                    </div>


                    


                    <hr className='line' />
                    

                    <div className='linkss px-1 text-left'>

                  

                        {/* <Link className='slidelink ml-3 py-5 font-weight-bold' to='/dashboard' ><i className='fa fa-bar-chart icons px-2'></i>Dashboard</Link>

                        <hr className='line' />


                        <Link className='slidelink ml-3 py-5' to='/projects' ><i className='fa fa-clock icons px-2'></i>Key Initiatives</Link> */}

             

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
                         <div className='col-md-6 mb-3'>
                            <div className='counttwo rounded px-1'>


                                <h3 className='mainhead mb-5 text-center'>State Ministry of Health <br/>(SMoH)</h3>



                                <div className='viewflex'>

                                   
                                    <Link className='btn maincolor'>Completion Rate - {summary ? summary.smoh_completion_rate : ''}%</Link>

                                    <Link  className='completion btn'style={{
                                        visibility:"hidden",
                                    }}>More </Link>

                                    <Link onClick={function(e){
                                        
                                       e.preventDefault();

                                        
                                         navigate('/executive/mda',{state:{mdaname:'State Ministry of Health'}});
                                    }} className='completion btn btn-sm'>View Initiatives </Link>
                                    

                                </div>

                               
                                
                            </div>
                        </div>


                        <div className='col-md-6 mb-3'>
                            <div className='counttwo rounded px-3'>

                            <h3 className='mainhead mb-5'>Edo State Hospitals Management Agency  <br/>(HMA)</h3>

                            <div className='viewflex'>

                                   
                                    <Link className='btn maincolor'>Completion Rate - {summary ? summary.hma_completion_rate : ''}%</Link>

                                    <Link className='completion btn'style={{
                                        visibility:"hidden",
                                    }}>More </Link>

                                    <Link onClick={function(e){
                                         e.preventDefault();

                                        
                                         navigate('/executive/mda',{state:{mdaname:'Edo State Hospitals Management Agency'}});
                                    }} className='completion btn btn-sm'>View Initiatives</Link>
                                    

                                </div>
                                
                            </div>
                        </div>

                </div>



                <div className='row mt-5'>
                         <div className='col-md-6 mb-3'>
                            <div className='counttwo rounded px-3'>

                            <h3 className='mainhead mb-5'>Edo State Health Insurance Commission  <br/>(EDHIC)</h3>

                            <div className='viewflex'>

                                   
                                    <Link className='btn maincolor'>Completion Rate - {summary ? summary.edihic_completion_rate : ''}%</Link>

                                    <Link className='completion btn'style={{
                                        visibility:"hidden",
                                    }}>More </Link>

                                    <Link onClick={function(e){
                                          e.preventDefault();

                                        
                                          navigate('/executive/mda',{state:{mdaname:'Edo State Health Insurance Commission'}});
                                    }}  className='completion btn btn-sm'>View Initiatives </Link>
                                    

                                </div>
                                
                            </div>
                        </div>


                        <div className='col-md-6 mb-3'>
                            <div className='counttwo rounded px-3'>

                            <h3 className='mainhead mb-5'>Edo State Primary Health Care Development Agency <br/>(EDSPHCDA)</h3>

                            <div className='viewflex'>

                                   
                                    <Link className='btn maincolor'>Completion Rate - {summary ? summary.edihic_completion_rate : ''}%</Link>

                                    <Link className='completion btn'style={{
                                        visibility:"hidden",
                                    }}>More </Link>

                                    <Link  onClick={function(e){
                                         e.preventDefault();

                                        
                                         navigate('/executive/mda',{state:{mdaname:'Edo State Primary Health Care Development Agency'}});
                                    }} className='completion btn btn-sm'>View Initiatives </Link>
                                    

                                </div>

                               
                                
                            </div>
                        </div>

                </div>

                

                



                   



                {/* end of activity count */}




              




                   
            
            </div>


           




        </div>
        

    </>
    );
}


export default GovDashboard;
