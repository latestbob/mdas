import React from 'react';

import './dashboard.css';

import { Link } from 'react-router-dom';

import logo from '../edo.png';
import { auth } from "../firebase";
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

import { useLocation } from 'react-router-dom';


function UniqueDashboard(){

   
    // const[summary, setSummary] = useState("");

    const[summary, setSummary] = useState("");

    const location = useLocation();
    const[mdaname, setMdaName] = useState(location.state.mdaname);
    const[mdasInitiatives , setMdasInitiatives] = useState([]);

    React.useEffect(()=>{
        var docId = localStorage.getItem("authid");

        if(docId == null){
            navigate('/');
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


      useEffect(() => {
        console.log('working');

        if(mdaname != ""){
        
               axios.get(`https://office.laurenparkerway.com/api/mdas/unique?mda=${mdaname}`)
                .then(response => {
                 
                    setMdasInitiatives(response.data);
                  console.log('fetched');
                  console.log(response.data);
                    console.log(response.data.length);
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

            localStorage.removeItem("authid");

         
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

                        <h4 className='mdaname text-left'>Executive Dashboard</h4>

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

<Link style={{
                        textDecoration:"none",
                    }} to={'/executive/dashboard'}>
                    <p className='font-weight-bold py-1 mx-2 my-3 hoverme rounded'>Health MDAs</p>
                    </Link>

                    <br/>
                    <button onClick={handleSignOut} className='btn btn-danger text-light font-weight-bold'>Logout</button>

             

           

   



                </div>




            </div>

            <div className='col-md-9 full m-0 px-5 py-5'>

                <h3 className='intro py-3'>{location.state.mdaname}</h3>


                {/* activity count */}



                <div className='row'>
                        <div className='col-md-6 mb-3'>
                            <div className='count bg-danger rounded px-3'>

                                <div>
                                    <p className='title'>Late <br/> <span className='figure'>{summary.late_percent}%</span></p>

                                   
                                </div>

                                <i className='fa fa-exclamation-triangle icontwo text-light'></i>
                                
                            </div>
                        </div>

                        <div className='col-md-6 mb-3'>
                            <div className='count bg-secondary rounded px-3'>
                            <div>
                                    <p className='title'>Not Started <br/> <span className='figure'>{summary.notstarted_percent}%</span></p>

                                   
                                </div>

                                <i className='fa fa-clock icontwo text-light'></i>
                                
                              
                            </div>
                        </div>

                        

                       
                    </div>








<div className='row'>
                        <div className='col-md-6 mb-3'>
                            <div className='count bg-warning rounded px-3'>

                                <div>
                                    <p className='titledark'>On Time <br/> <span className='figuredark'>{summary.ontime_percent}%</span></p>

                                   
                                </div>

                                <i className='fa fa-gear icontwo text-dark'></i>
                                
                            </div>
                        </div>

                        <div className='col-md-6 mb-3'>
                            <div className='count bg-success rounded px-3'>
                            <div>
                                    <p className='title'>Completed <br/> <span className='figure'>{summary.complete_percent}%</span></p>

                                   
                                </div>

                                <i className='fa fa-check icontwo text-light'></i>
                                
                              
                            </div>
                        </div>

                        

                    </div>


                


                
                

                
                    <div className='table-responsive tablediv'>

                        <table className='table table-striped table-hover table-borderless'>

                            <thead className=''>
                                <tr>
                                    
                                    <th>Initiative</th>
                                    
                                    <th>Estimated Completion Date</th>
                                    <th>Estimated Budget (NGN)</th>
                                  
                                    
                                    <th>Stage</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>

                            </thead>


                            <tbody>
                            


                        {mdasInitiatives && mdasInitiatives.map((m, index) => (
                            // Your rendering logic for each item goes here
                            <tr key={index}>
                                        
                                <td>{m.initiative}</td>
                               
                                <td>{m.date}</td>
                                <td>{m.budget}</td>
                                
                              
                                <td>
                                <span>{m.stage}</span>
                                </td>

                                <td>
                                <span>{m.status}</span>
                                </td>
                                <td>
                                   
                                </td>

                                <div class="modal fade" id={`exampleModalLong${index}`} tabindex="-1" role="dialog" aria-labelledby={`exampleModalLongTitle${index}`} aria-hidden="true">
  <div class="modal-dialog modal-lg" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLongTitle">Edit {m.initiative}</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
                   
      </div>
     
    </div>
  </div>
</div>


           
                                      
                                         </tr> 

                                // Edit modal

                                



                                //end of edit modal
                        ))

                        }

                                    
                        </tbody>


                        </table>

                    </div>


                   



                {/* end of activity count */}




              




                   
            
            </div>


           




        </div>
        

    </>
    );
}


export default UniqueDashboard;
