// import logo from './logo.svg';
// import './App.css';
import React from 'react';
import {
  HashRouter,
  Routes,
  Route,
} from "react-router-dom";

import Login from './auth/login';
import Help from './help';
import Dashboard from './user/dashboard';
import Project from './user/projects';

function App() {
  return (
    <>
       <HashRouter>
    <Routes>
      <Route path="/" element={<Login />}/>
      <Route path="/dashboard" element={<Dashboard />}/>
      <Route path="/projects" element={<Project />}/>

      <Route path="/help" element={<Help />}/>
      


     


    

      
        
    </Routes>
  </HashRouter>


    </>
     
  );
}

export default App;
