import React from 'react';

import './dashboard.css';

import { Link, useNavigate } from 'react-router-dom';

import logo from '../edo.png';
import { auth } from "../firebase";

import { useState , useEffect} from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import moment from 'moment';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import the styles


function Project(){

    const[mdaname, setMdaName] = useState("");
    const[email, setEmail] = useState("");
    const[mdasInitiatives , setMdasInitiatives] = useState([]);
    const[loading, setLoading] = useState(false);

    const navigate = useNavigate();


    React.useEffect(()=>{
        var docId = localStorage.getItem("mdasDocumentId");

        if(docId == null){
            navigate('/');
        }
        else{
            setMdaName(localStorage.getItem("mdasName"));
            setEmail(localStorage.getItem("email"));

       

            // if(mdaname){
            //     axios.get(`https://office.laurenparkerway.com/api/mdas/unique?mda=${mdaname}`)
            //     .then(response => {
            //       setMdasInitiatives(response.data);
            //       console.log('fetched');
            //       console.log(response.data);
            //       setLoading(false);
            //     })
            //     .catch(error => {
            //       console.log(error);
            //     });
            // }

           

            
            


        }
     

     
    },[]);

    const[dateEdit, setDateEdit]= useState("");
    const[budgetEdit, setBudgetEdit] = useState("");
    const[ownerEdit, setOwnerEdit] = useState("");
    const[supportEdit, setSupportEdit] = useState("");
    const[stageEdit, setStageEdit] = useState("");
    const[idEdit, setIdEdit] = useState("");
    const[statusEdit, setStatusEdit] = useState("");

    const[check, setChecked] = useState(false);



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


    

    

    // function getInitiatives(a){
    //     setLoading(true)
    //     axios.get(`https://office.laurenparkerway.com/api/mdas/unique?mda=${a}`)
    //     .then(response => {
    //       setMdasInitiatives(response.data);
    //       console.log('fetched');
    //       console.log(response.data);
    //       setLoading(false);
    //     })
    //     .catch(error => {
    //       console.log(error);
    //     });
    // }
    
    
   


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


    //   $table->string('objectives')->nullable();
    //   $table->string('mda')->nullable();
    //   $table->string('email')->nullable();
    //   $table->string('initiative')->nullable();
    //   $table->string('outcome')->nullable();
    //   $table->string('date')->nullable();
    //   $table->string('budget')->nullable();
    //   $table->string('owner')->nullable();
    //   $table->string('support')->nullable();
    //   $table->string('stage')->nullable()

    const[objectives, setObjectives] = useState("");
  
    
    const[initiative, setInitiative]= useState("");
    const[outcome, setOutcome]= useState("");
    const[date, setDate]= useState("");
    const[budget, setBudget] = useState("");
    const[owner, setOwner] = useState("");
    const[support, setSupport] = useState("");
    const[stage, setStage] = useState("");

    // update 


    const[updatedValue, setUpdateValues] = useState(null);
    const[changeId, setChangeId] = useState(0);


    const[comment, setComment] = useState("");
   


    async function handleSubmit(e){
        e.preventDefault();
    
        try {
            const response = await axios.post('https:/office.laurenparkerway.com/api/mdaintitiative', {
                objectives:objectives,
                mda:mdaname,
            email:email,
            initiative:initiative,
            outcome:outcome,
            date:date,
            budget:budget,
            owner:owner,
            support:support,
            stage:stage
            });
        
            // Handle success
            console.log('Data sent:', response.data);
    
            if(response.data.status == 200){
                console.log(response.data.message);

                // Swal.fire({
                //     position: "top-end",
                //     icon: "success",
                //     title: "Initiatives added successfully",
                //     showConfirmButton: false,
                //     timer: 1500
                //   });

                //   window.location.reload();

                alert('Initiative created successfully');
             setTimeout(() => {
               window.location.href = '/projects';
             }, 1000); 
    
    
                //window.location.href = 'https://auth.nelnet.com/Account/Login?ReturnUrl=%2Fconnect%2Fauthorize%2Fcallback%3Fresponse_type%3Dcode%26client_id%3Dmma%26state%3Da19PMjBIZEFFbC5SbUIuNDNuNXdJX29NTXZaU2lZeH5TS0l1d0pjRXFySU96semicolon%25252Fdashboard%26redirect_uri%3Dhttps%253A%252F%252Fsecure.nelnet.com%26scope%3Dopenid%2520offline_access%2520mma.api.read%2520mma.api.write%26code_challenge%3DrBGHOu1mH2Ol4dy6tCOUfJpd2g4oqZ9n6zbc8PmJXqE%26code_challenge_method%3DS256%26nonce%3Da19PMjBIZEFFbC5SbUIuNDNuNXdJX29NTXZaU2lZeH5TS0l1d0pjRXFySU96%26nds_client_id%3D1%26nds_application_id%3D1%26pid%3D_PENDO_T_vHYTKtaYEKy';
            }
          } catch (error) {
            // Handle error
            console.error('Error:', error);
          }
        
    }
    




    async function handleUpdate(e) {
        e.preventDefault();
    
        try {
            const response = await fetch('https://office.laurenparkerway.com/api/update/initiative', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: idEdit,
                    date: dateEdit,
                    budget: budgetEdit,
                    owner: ownerEdit,
                    support: supportEdit,
                    stage: stageEdit,
                    status: statusEdit,
                }),
            });
    
            // Parse JSON response
            const responseData = await response.json();
    
            // Handle success
            console.log('Data sent:', responseData);
    
            if (responseData) {
                console.log(responseData.message);
    
                alert('Initiative Updated Successfully.');
                setTimeout(() => {
                    window.location.reload(false);
                }, 1000); 
    
               
            }
        } catch (error) {
            // Handle error
            console.error('Error:', error);
        }
    }





    async function handleUpdateTwo(e) {
        e.preventDefault();
    
        try {
            const response = await fetch('https:/office.laurenparkerway.com/api/change', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: idEdit,
                    date: dateEdit,
                    budget: budgetEdit,
                    changer_email: localStorage.getItem('email'),
                    changer_name: localStorage.getItem('title'),
                    stage: stageEdit,
                    status: statusEdit,
                }),
            });
    
            // Parse JSON response
            const responseData = await response.json();
    
            // Handle success
            console.log('Data sent:', responseData);
    
            if (responseData) {
                console.log(responseData.message);
    
                alert('Updates has been sent for approval.');
                setTimeout(() => {
                    window.location.reload(false);
                }, 1000); 
    
               
            }
        } catch (error) {
            // Handle error
            console.error('Error:', error);
        }
    }



    async function handleUpdatePrimary(e) {
        e.preventDefault();
      
        try {
          const response = await fetch('https:/office.laurenparkerway.com/api/change', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              id: idEdit,
              date: dateEdit,
              budget: budgetEdit,
              changer_email: localStorage.getItem('email'),
              changer_name: localStorage.getItem('title'),
              stage: stageEdit,
              status: statusEdit,
            }),
          });
      
          // Handle success

          const responseData = await response.json();





            // Handle success
            console.log('Data sent:', responseData);
    
            if (responseData) {
                console.log(responseData.message);
    
                alert('Updates has been sent for approval.');
                setTimeout(() => {
                    window.location.reload(false);
                }, 1000); 
    
               
            }
        } catch (error) {
            // Handle error
            console.error('Error:', error);
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

            case 'Done':
            return 'bg-success text-light';

            case 'Overdue':
            return 'bg-danger text-light';
          // Add more cases for other stages if needed
          default:
            return 'bg-secondary'; // Default color for unknown stages
        }
      }


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
    


      const statusOptions =
      stageEdit === 'Initiation' || stageEdit === 'Planning'
      ? ['Not Started']
      : ['On Time', 'Completed'];




     
  

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

                        <Link to='/dashboard' className='slidelink ml-3 py-5' ><i className='fa fa-bar-chart icons px-2'></i>Dashboard</Link>

                        <hr className='line' />


                        <Link to='/projects' className='slidelink ml-3 py-5 font-weight-bold' ><i className='fa fa-clock icons px-2'></i>Key Initiatives</Link>

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

            <div className='col-md-9 full m-0 px-3 py-5'>
                <div className='flexdiv'>
                    <h3 className='intro py-3'>2024 Key Initiatives </h3>

                    {/* <button className='btn createbtn'type="button"data-toggle="modal" data-target="#exampleModalLong">Add New Initiative</button> */}

                    <button className='btn createbtn'onClick={function(e){
                        e.preventDefault();
                        alert("You are not authorized to make this request");
                    }}>Add New Initiative</button>
                </div>
                


                {/* activity count */}


                <div className='table-responsive tablediv'>

                    <table className='table table-striped table-hover table-borderless'>

                        <thead className=''>
                            <tr>
                                {/* <th>Objective</th> */}
                                <th>Key Initiatives</th>
                                {/* <th>Expected Outcome</th> */}
                                <th>Estimated Completion Date</th>
                                <th>Estimated Budget (NGN)</th>
                                <th>Owner</th>
                                <th>Supporting MDAs and Consultants</th>
                                <th>Stage</th>
                                <th>Status</th>
                                <th>Action</th>
                                {localStorage.getItem('type') == 'secondary' && <th>Updates</th> }
                            </tr>

                        </thead>

                        <tbody>
                            {/* <tr>
                                <td>Reduce out of pocket spending</td>
                                <td>Conduct PHC storms exercise</td>
                                <td>Increase in subscribers footfall at PHCs</td>
                                <td>June 2024</td>
                                <td>23M</td>
                                <td>EDHIC</td>
                                <td>EDSPHCDA</td>
                                <td>Planning</td>
                                
                            </tr> */}

                        

                          
                                        {/* <tr>
                                        <td>{m.objectives}</td>
                                <td>{m.initiative}</td>
                                <td>{m.outcome}</td>
                                <td>{m.date}</td>
                                <td>{m.budget}</td>
                                <td>{m.owner}</td>
                                <td>{m.support}</td>
                                <td>{m.stage}</td>
                                <td>
                                    
                                </td>
                                      
                                         </tr> */}


                        {mdasInitiatives && mdasInitiatives.map((m, index) => (
                            // Your rendering logic for each item goes here
                            <tr key={index}>
                                        {/* <td>{m.objectives}</td> */}
                                <td>{m.initiative}</td>
                                {/* <td>{m.outcome}</td> */}
                                <td>{moment(m.date).format('DD/MM/YYYY')}</td>
                                <td>{m.budget}</td>
                                <td>{m.owner}</td>
                                <td>{m.support}</td>
                                <td>
                                <span className={`badge ${getBadgeColor(m.stage)}`}>{m.stage}</span>
                                </td>

                                <td><span className={`badge ${getStatusColor(m.status)}`}>{m.status}</span></td>
                                <td>
                                    <a onClick={function(){
                                    setDateEdit(m.date);
                                    setBudgetEdit(m.budget);
                                    setOwnerEdit(m.owner);
                                    setSupportEdit(m.support);
                                    setStageEdit(m.stage);
                                    setIdEdit(m.id);
                                    setStatusEdit(m.status);
                                }}  className='btn btn-sm btn-warning text-dark'type="button"data-toggle="modal" data-target={`#exampleModalLong${index}`}>Edit</a>
                                </td>

                                {localStorage.getItem('type') == 'secondary' && <td>
                                    {m.flagged == 'pending' && <button onClick={async function(e){
                                        e.preventDefault();

                                        try {
                                            const response = await axios.get(`https://office.laurenparkerway.com/api/changes?id=${m.id}`);
                                        
                                            // Handle success
                                            console.log('Data sent:', response.data);
                                    
                                            if(response.data){
                                                //console.log(response.data.message);
                                
                                               setUpdateValues(response.data);
                                
                                                  
                                    
                                              
                                            }
                                          } catch (error) {
                                            // Handle error
                                            console.error('Error:', error);
                                          }
                                        
                                       
                                    }} type="button" data-toggle="modal" data-target={`#exampleModal${index}`} className='badge badge-info text-light font-weight-bold borderless'>Awaiting Approval</button>}
                                </td> }
                                

                                <div class="modal fade" id={`exampleModal${index}`} tabindex="-1" role="dialog" aria-labelledby={`exampleModalLabel${index}`}  aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">{m.initiative}</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">

          <table className='table table-striped borderless'>
              <thead>
                  <tr>
                      <th>Current Value</th>
                      <th>Update Value</th>
                  </tr>
              </thead>
              
              <tbody>

                  {
                      updatedValue &&  updatedValue.date != m.date && <tr>
                      <td>{m.date}</td>
                      <td>{updatedValue && updatedValue.date}</td>
                  </tr>
                  }
                  

                  {
                      updatedValue && updatedValue.budget != m.budget && <tr>
                      <td>{m.budget}</td>
                      <td>{updatedValue && updatedValue.budget}</td>
                  </tr>
                  }

{
                      updatedValue && updatedValue.stage != m.stage && <tr>
                      <td>{m.stage}</td>
                      <td>{updatedValue && updatedValue.stage}</td>
                  </tr>
                  }

{
                      updatedValue && updatedValue.status != m.status && <tr>
                      <td>{m.status}</td>
                      <td>{updatedValue && updatedValue.status}</td>
                  </tr>
                  }
              </tbody>

          </table>


          <hr />

<div className='form-group'>
    <input onChange={function(){
        setChecked(!check);
    }} type="checkbox"checked={check} /> <span className='px-2'>Add Comments</span>

    <br />

   {
       check && <textarea onChange={function(e){
           setComment(e.target.value);
       }} value={comment} className='form-control'row="5"placeholder='Enter Comments'></textarea>
   } 

</div>

      </div>

     
      <div class="modal-footer">
        <button onClick={ async function (e) {
  e.preventDefault();

  try {
    const response = await fetch('https://office.laurenparkerway.com/api/approve/change', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: m.id,
        comment: comment,
      }),
    });

    const responseData = await response.json();





    // Handle success
    console.log('Data sent:', responseData);

    if (responseData) {
        console.log(responseData.message);

        alert('Pending updates has been approved.');
        setTimeout(() => {
            window.location.reload(false);
        }, 1000); 

       
    }
} catch (error) {
    // Handle error
    console.error('Error:', error);
}

}

} class="btn btn-success btn-sm" >Approve Changes</button>
        <button 
        
        
        onClick={ async function (e) {
            e.preventDefault();
          
            try {
              const response = await fetch('https://office.laurenparkerway.com/api/reject/change', {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  id: m.id,
                  comment: comment,
                }),
              });

              const responseData = await response.json();





            // Handle success
            console.log('Data sent:', responseData);
    
            if (responseData) {
                console.log(responseData.message);
    
                alert('Pending update rejected.');
                setTimeout(() => {
                    window.location.reload(false);
                }, 1000); 
    
               
            }
        } catch (error) {
            // Handle error
            console.error('Error:', error);
        }
          
          
          }} 
        
        class="btn btn-danger btn-sm">Reject Changes</button>
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
                    <form onSubmit={localStorage.getItem('type') == 'secondary' ? handleUpdate : handleUpdateTwo}>
                       



                        <div className='form-group row'>
                        

                            <div className='col-md-6'>
                                <label>Estimated Completion Date</label>
                                <input onChange={function(e){
                                    setDateEdit(e.target.value);
                                }} type="date"value={dateEdit} className='form-control'placeholder='Estimated Completion Date'required/>
                            </div>

                            <div className='col-md-6'>
                                <label>Estimated Budget (NGN)</label>
                                <input onChange={function(e){
                                    setBudgetEdit(e.target.value);
                                }}  type="text"value={budgetEdit} className='form-control'placeholder='Expected Budget'required/>

                                
                            </div>
                        </div>


                        
                            

                          
                                <input onChange={function(e){
                                    setOwnerEdit(e.target.value);
                                }} type="hidden"value={ownerEdit} className='form-control'placeholder='Asignee/Owner'required/>
           

                            
                                <input onChange={function(e){
                                    setSupportEdit(e.target.value);
                                }} type="hidden"value={supportEdit} className='form-control'placeholder='Supporting MDAs/Consultants'required/>

                                
                            
                       

                        <div className='form-group row'>
                            

                            <div className='col-md-6'>
                                <label>Current Stage</label>
                                <select onChange={function(e){
                                    setStageEdit(e.target.value);
                                }} value={stageEdit}className='form-control'required>
                                    <option value="">Choose Stage</option>
                                    <option value="Initiation" >Initiation</option>
                                    <option value="Planning" >Planning</option>
                                    
                                    <option value="Execution" >Execution</option>
                                    <option value="Done" >Done</option>
                                    
                                </select>
                            </div>

                            <div className='col-md-6'>
                                <label>Status</label>
                                <select onChange={function(e){
                                    setStatusEdit(e.target.value);

                                   

                                }} value={statusEdit} disabled={statusEdit === 'Late'} className='form-control' required>
                                    <option value="">Choose Status</option>

                                    <option value="Late">Late</option>
                                    {statusOptions.map((option) => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                        ))}

                                        {/* <option value="Late">Late</option> */}
                                    
                                </select>
                            </div>

                            <input className='form-control'type="hidden"onChange={function(e){
                                setIdEdit(e.target.value);
                            }} value={idEdit}/>
                        </div>


                        

                        <div className='form-group'>
                            <button type='submit' className='btn btn-success text-center'>Update Initiative</button>
                        </div>
                    </form>
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

           

            <div class="modal fade" id="exampleModalLong" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
  <div class="modal-dialog modal-lg" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLongTitle">Add New Initiative</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
                    <form onSubmit={handleSubmit}>
                        <div className='form-group row'>
                            <div className='col-md-6'>
                                <label>Objective</label>

                                

                                <textarea  onChange={function(e){
                                    setObjectives(e.target.value);
                                }} value={objectives} className='form-control'row="5"> </textarea>

                                

                            </div>

                            <div className='col-md-6'>
                                <label>Key Initiative</label>
                                <input onChange={function(e){
                                    setInitiative(e.target.value);
                                }} value={initiative} type="text" className='form-control'placeholder='Key Initiative'required/>
                            </div>
                        </div>



                        <div className='form-group row'>
                            <div className='col-md-6'>
                                <label>Expected Outcome</label>
                                <textarea row="5" onChange={function(e){
                                    setOutcome(e.target.value);
                                }}  type="text"value={outcome} className='form-control'placeholder='Expected Outcome'required> </textarea>

                                
                            </div>

                            <div className='col-md-6'>
                                <label>Estimated Completion Date</label>
                                <input onChange={function(e){
                                    setDate(e.target.value);
                                }} type="date"value={date} className='form-control'placeholder='Estimated Completion Date'required/>
                            </div>
                        </div>


                        <div className='form-group row'>
                            <div className='col-md-6'>
                                <label>Estimated Budget (NGN)</label>
                                <input onChange={function(e){
                                    setBudget(e.target.value);
                                }}  type="text"value={budget} className='form-control'placeholder='Expected Budget'required/>

                                
                            </div>

                            <div className='col-md-6'>
                                <label>Owner</label>
                                <input onChange={function(e){
                                    setOwner(e.target.value);
                                }} type="text"value={owner} className='form-control'placeholder='Asignee/Owner'required/>
                            </div>
                        </div>

                        <div className='form-group row'>
                            <div className='col-md-6'>
                                <label>Supporting MDAs/Consultants</label>
                                <textarea row="5" onChange={function(e){
                                    setSupport(e.target.value);
                                }} type="text"value={support} className='form-control'placeholder='Supporting MDAs/Consultants'required></textarea>

                                
                                
                            </div>

                            <div className='col-md-6'>
                                <label>Current Stage</label>
                                <select onChange={function(e){
                                    setStage(e.target.value);
                                }} value={stage}className='form-control'required>
                                    <option value="">Choose Stage</option>
                                    <option value="Initiation" >Initiation</option>
                                    <option value="Planning" >Planning</option>
                                    
                                    <option value="Execution" >Execution</option>
                                    <option value="Done" >Done</option>
                                    
                                </select>
                            </div>
                        </div>

                        <div className='form-group'>
                            <button type='submit' className='btn btn-success text-center'>Create An Initiative</button>
                        </div>
                    </form>
      </div>
     
    </div>
  </div>
</div>


           

           

        </div>

        

    </>
    );
}


export default Project;