// eslint-disable-next-line no-unused-vars
import React from "react";
// import auth from '../components/auth';
import {useNavigate} from 'react-router-dom'

const Dashboard = () => {

  let auth = JSON.parse(localStorage.getItem("auth"))
  const navigate = useNavigate()
  const handleLogout = () => {
    localStorage.removeItem('auth');
    navigate("/")
  };

  return (
    <div>
      <div>
        {auth?.username ? <h3>Hello, {auth?.username}</h3> : <h3>Hello user</h3>}
      </div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
