import React from 'react';

import './dashboard.css';

import { Link } from 'react-router-dom';

import logo from '../edo.png';
import { auth } from "../firebase";
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

import { useLocation } from 'react-router-dom';
import moment from 'moment';


function UniqueDashboard(){

   
    // const[summary, setSummary] = useState("");

    const[summary, setSummary] = useState("");

    const location = useLocation();
    const[mdaname, setMdaName] = useState(location.state.mdaname);
    const[mdasInitiatives , setMdasInitiatives] = useState([]);
    const[changes, setChanges] = useState([]);

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
            localStorage.removeItem("authemail");

         
            navigate('/');

        
          })
          .catch((error) => {
            // An error happened.
            console.error("Error signing out:", error);
          });
      };



      function getStatusColor(stage) {
        switch (stage) {
          case 'Late':
            return 'bg-danger text-light';
          case 'Not Started':
            return 'bg-secondary text-light';

            case 'On Time':
            return 'bg-warning text-dark';

            case 'Completed':
            return 'bg-success text-light';

            
          // Add more cases for other stages if needed
          default:
            return 'bg-primary'; // Default color for unknown stages
        }
      }



    function getBadgeColor(stage) {
        switch (stage) {
          case 'Initiation':
            return 'bg-warning text-dark';
          case 'Planning':
            return 'bg-info text-light';

            case 'Execution':
            return 'bg-primary text-light';

            case 'Completed':
            return 'bg-success text-light';

            case 'Overdue':
            return 'bg-danger text-light';
          // Add more cases for other stages if needed
          default:
            return 'bg-secondary text-light'; // Default color for unknown stages
        }
      }

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

<Link style={{
                        textDecoration:"none",
                    }} to={'/executive/dashboard'}>
                    <p className='font-weight-bold py-1 mx-2  hoverme rounded'>Health MDAs</p>
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
                                    <p className='title'>Late <br/> <span className='figure'>{Math.round(summary.late_percent)}%</span></p>

                                   
                                </div>

                                <i className='fa fa-exclamation-triangle icontwo text-light'></i>
                                
                            </div>
                        </div>

                        <div className='col-md-6 mb-3'>
                            <div className='count bg-secondary rounded px-3'>
                            <div>
                                    <p className='title'>Not Started <br/> <span className='figure'>{Math.round(summary.notstarted_percent)}%</span></p>

                                   
                                </div>

                                <i className='fa fa-clock icontwo text-light'></i>
                                
                              
                            </div>
                        </div>

                        

                       
                    </div>








<div className='row'>
                        <div className='col-md-6 mb-3'>
                            <div className='count bg-warning rounded px-3'>

                                <div>
                                    <p className='titledark'>On Time <br/> <span className='figuredark'>{Math.round(summary.ontime_percent)}%</span></p>

                                   
                                </div>

                                <i className='fa fa-gear icontwo text-dark'></i>
                                
                            </div>
                        </div>

                        <div className='col-md-6 mb-3'>
                            <div className='count bg-success rounded px-3'>
                            <div>
                                    <p className='title'>Completed <br/> <span className='figure'>{Math.round(summary.complete_percent)}%</span></p>

                                   
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
                               
                                <td>{moment(m.date).format('DD/MM/YYYY')}</td>
                                <td>{m.budget}</td>
                                
                              
                                <td>
                                <span className={`badge ${getBadgeColor(m.stage)}`}>{m.stage}</span>
                                </td>

                                <td>
                                <span className={`badge ${getStatusColor(m.status)}`}>{m.status}</span>
                                </td>
                                <td >

                                <a onClick={function(e){
                                  e.preventDefault();

                                  axios.get(`https://office.laurenparkerway.com/api/change/unique?id=${m.id}`)
                .then(response => {
                 
                    setChanges(response.data);
                 
                })
                .catch(error => {
                  console.log(error);
                });
                                }} type="button"  data-toggle="modal" data-target={`#exampleModal${m.id}`} className='btn text-info'style={{
                                  fontSize:'12px',
                                  fontWeight:'bold'
                                }}>View Audit Log</a>  {m.status == 'Late' ? <button onClick={async function(e){
                                  e.preventDefault();

                                  ///

                                  try {
                                    const response = await axios.get(`https://office.laurenparkerway.com/api/late/email?owner=${m.owner}&initiative=${m.initiative}&date=${m.date}`);
                                
                                    // Handle success
                                    console.log('Data sent:', response.data);
                            
                                    if(response.data){
                                        //console.log(response.data.message);
                        
                                        alert('Late Attention called successful.');
                                setTimeout(() => {
                                  window.location.reload(false);
                                }, 1000);
                        
                                          
                            
                                      
                                    }
                                  } catch (error) {
                                    // Handle error
                                    console.error('Error:', error);
                                  }

                                  

                                  ////
                                }} className='btn btn-sm btn-danger'>Call Attention</button> : <button style={{
                                  visibility:"hidden",
                                }}>Call Attention</button>}
                                   
                                </td>

                                <div class="modal fade" id={`exampleModal${m.id}`} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">{m.initiative}</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
                                <table className='table table-striped table-borderless table-hover'>
                                  <thead>
                                      <tr>
                                          <th>Estimated Date</th>
                                          <th>Budget</th>
                                          <th>Stage</th>
                                          <th>Status</th>
                                          <th>Outcome</th>
                                          <th>Update At</th>
                                          
      
                                      </tr>
                                  </thead>

                                  <tbody>

                                    

                                  {changes && changes.map((m, index) => (
                            // Your rendering logic for each item goes here
                            <tr key={index}>
                                        
                              
                               
                                <td>{m.date && moment(m.date).format('DD/MM/YYYY')}</td>
                                <td>{m.budget}</td>
                                
                              
                                <td>
                                <span className=''>{m.stage}</span>
                                </td>

                                <td>
                                <span className=''>{m.status}</span>
                                </td>
                               

                               <td>
                                 {
                                   

                                   m.isApproved === true
                                   ? <p className='badge badge-success'>approved</p>
                                   : m.isApproved === false
                                     ? <p className='badge badge-danger'>rejected</p>
                                     : <p className='badge badge-warning'>pending</p>
                                 }
                               </td>

                               <td>
                                 {moment(m.created_at).format('DD/MM/YYYY HH:mm:ss')}
                               </td>



                               


           
                                      
                                         </tr> 

                                // Edit modal

                                



                                //end of edit modal
                        ))

                        }

                       


                                  </tbody>

                                </table>

                                {changes.length == 0 && <div className='py-5 text-center'>

<h5 className='text-center'>No recent changes have been made</h5>



</div>}
      </div>
      
    </div>
  </div>
</div>

                                

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
