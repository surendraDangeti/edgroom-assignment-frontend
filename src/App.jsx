// eslint-disable-next-line no-unused-vars
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import SignInComponent from './components/signin';
import SignUpComponent from './components/signup';
import Dashboard from './components/Dashboard';
import ProtectedRoute from './ProctedRoutes/index';


function App() {
  return (
    
      <div>
        <Router>
         <Routes>
         <Route path="/" element={<SignInComponent />} />
          <Route path="/signup" element={<SignUpComponent />} />
          <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
          </Routes>
           </Router>
      </div>
  );
}

export default App;
