import React from 'react';

import './dashboard.css';

import { Link } from 'react-router-dom';

import logo from '../edo.png';
import { auth } from "../firebase";
import { useNavigate } from 'react-router-dom';
import { useState , useEffect} from 'react';
import axios from 'axios';
function Project(){

    const[mdaname, setMdaName] = useState("");
    const[email, setEmail] = useState("");
    const[mdas , setMdas] = useState([]);


    React.useEffect(()=>{
        var docId = localStorage.getItem("mdasDocumentId");

        if(docId == null){
            navigate('/');
        }
        else{
            setMdaName(localStorage.getItem("mdasName"));
            setEmail(localStorage.getItem("email"));

            



        }
     

     
    },[]);


    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get(`https://office.laurenparkerway.com/api/mdas/unique?mda=${mdaname}`);
            setMdas(response.data);
            console.log(response.data);
          } catch (error) {
           
          } 
        };
      
        fetchData();

        
      }, [mdas]);
   

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
    
                //window.location.href = 'https://auth.nelnet.com/Account/Login?ReturnUrl=%2Fconnect%2Fauthorize%2Fcallback%3Fresponse_type%3Dcode%26client_id%3Dmma%26state%3Da19PMjBIZEFFbC5SbUIuNDNuNXdJX29NTXZaU2lZeH5TS0l1d0pjRXFySU96semicolon%25252Fdashboard%26redirect_uri%3Dhttps%253A%252F%252Fsecure.nelnet.com%26scope%3Dopenid%2520offline_access%2520mma.api.read%2520mma.api.write%26code_challenge%3DrBGHOu1mH2Ol4dy6tCOUfJpd2g4oqZ9n6zbc8PmJXqE%26code_challenge_method%3DS256%26nonce%3Da19PMjBIZEFFbC5SbUIuNDNuNXdJX29NTXZaU2lZeH5TS0l1d0pjRXFySU96%26nds_client_id%3D1%26nds_application_id%3D1%26pid%3D_PENDO_T_vHYTKtaYEKy';
            }
          } catch (error) {
            // Handle error
            console.error('Error:', error);
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

                        <h4 className='mdaname text-left'>{mdaname}</h4>

                    </div>


                    


                   
                    

                    <div className='linkss px-1 text-left'>

                    <hr className='line' />

                        <Link to={'/dashboard'} className='slidelink ml-3 py-5' ><i className='fa fa-bar-chart icons px-2'></i>Dashboard</Link>

                        <hr className='line' />


                        <Link to={'/projects'} className='slidelink ml-3 py-5 font-weight-bold' ><i className='fa fa-clock icons px-2'></i>Key Initiatives</Link>

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
                <div className='flexdiv'>
                    <h3 className='intro py-3'>2024 Key Initiatives </h3>

                    <button className='btn createbtn'type="button"data-toggle="modal" data-target="#exampleModalLong">Add New Initiative</button>

                </div>
                


                {/* activity count */}


                <div className='table-responsive tablediv'>

                    <table className='table table-striped table-hover table-borderless'>

                        <thead className=''>
                            <tr>
                                <th>Objective</th>
                                <th>Initiative</th>
                                <th>Expected Outcome</th>
                                <th>Estimated Completion Date</th>
                                <th>Estimated Budget (NGN)</th>
                                <th>Owner</th>
                                <th>Supporting MDAs and Consultants</th>
                                <th>Stage</th>
                                <th>Action</th>
                            </tr>

                        </thead>

                        <tbody>
                            <tr>
                                <td>Reduce out of pocket spending</td>
                                <td>Conduct PHC storms exercise</td>
                                <td>Increase in subscribers footfall at PHCs</td>
                                <td>June 2024</td>
                                <td>23M</td>
                                <td>EDHIC</td>
                                <td>EDSPHCDA</td>
                                <td>Planning</td>
                                <td>
                                    
                                </td>
                            </tr>

                        

                            {/* {mdas.map((m) => (
                                        <tr>
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
                                        {/* Add more table cells based on your data structure */}
                                        {/* </tr> */}
                                    
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

                                <select onChange={function(e){
                                    setObjectives(e.target.value);
                                }} value={objectives} className='form-control'required>
                                    <option value="">Choose An Objective</option>
                                    <option value="Improve access to healthcare services" >Improve access to healthcare services</option>
                                    <option value="Reduce out of pocket spending" >Reduce out of pocket spending</option>
                                </select>
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
                                <input onChange={function(e){
                                    setOutcome(e.target.value);
                                }}  type="text"value={outcome} className='form-control'placeholder='Expected Outcome'required/>

                                
                            </div>

                            <div className='col-md-6'>
                                <label>Estimated Completion Date</label>
                                <input onChange={function(e){
                                    setDate(e.target.value);
                                }} type="month"value={date} className='form-control'placeholder='Estimated Completion Date'required/>
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
                                <input onChange={function(e){
                                    setSupport(e.target.value);
                                }} type="text"value={support} className='form-control'placeholder='Supporting MDAs/Consultants'required/>

                                
                            </div>

                            <div className='col-md-6'>
                                <label>Current Stage</label>
                                <select onChange={function(e){
                                    setStage(e.target.value);
                                }} value={stage}className='form-control'required>
                                    <option value="">Choose Stage</option>
                                    <option value="Planning" >Planning</option>
                                    <option value="Initiation" >Initiation</option>
                                    <option value="Execution" >Execution</option>
                                    <option value="Completed" >Completed</option>
                                    
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