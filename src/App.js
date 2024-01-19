// import logo from './logo.svg';
// import './App.css';
import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Login from './auth/login';
import Dashboard from './user/dashboard';
import Project from './user/projects';
import GovDashboard from './user/govdashboard';
import UniqueDashboard from './user/unique';
function App() {
  return (
    <>
       <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />}/>
      <Route path="/dashboard" element={<Dashboard />}/>
      <Route path="/projects" element={<Project />}/>
      <Route path="/executive/dashboard" element={<GovDashboard />}/>

      <Route path="/executive/mda" element={<UniqueDashboard />}/>

      


     


    

      
        
    </Routes>
  </BrowserRouter>


    </>
     
  );
}

export default App;
