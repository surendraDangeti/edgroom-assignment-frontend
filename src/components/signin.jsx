// eslint-disable-next-line no-unused-vars
import React, { useRef, useState, useEffect } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  CssBaseline,
} from "@mui/material";
import { Link } from "react-router-dom";
import PostApi from './PostApi'; 
import {useNavigate} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import auth from "./auth";

const SignInComponent = () => {
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const [error, setError] = useState("");
  const [redirectPage, setRedirectPage] = useState(false)
  const navigate = useNavigate();

  useEffect(()=>{
    if(redirectPage){
      if(JSON.parse(localStorage.getItem("auth"))){
        // setTimeout(()=>{
          navigate('/dashboard')
        // },[1000])  
        setRedirectPage(false)
      // }else{
      //  if( JSON.parse(localStorage.getItem("auth"))){
      //     navigate('/dashboard')
      //  }
      //  setRedirectPage(true)
      }
    }
   
  },[redirectPage, JSON.parse(localStorage.getItem("auth"))])

 

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;
  
    if (!username || !password) {
      setError("Username and password are required.");
      return;
    }
  
    const formData = {
      username,
      password,
    };
  
    try {
      const apiUrl = 'auth/signin';
      const { response, error } = await PostApi(apiUrl, formData);
    
      if (error) {
        console.error("Error:", error.message);
      } else {
        localStorage.setItem("auth", JSON.stringify(response));
        setRedirectPage(true)
          
      }
  
    } catch (error) {
      console.log("Unexpected Error:", error.message);
      toast.success(error.message ? error.message : "Unexpected error. Please try again later.");
    }
    
  };
  

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <ToastContainer />
      
      <div>
        <Typography variant="h5" align="center" gutterBottom>
          SignIn
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Username"
            inputRef={usernameRef}
            variant="outlined"
            margin="normal"
            required
          />

          <TextField
            fullWidth
            label="Password"
            type="password"
            inputRef={passwordRef}
            variant="outlined"
            margin="normal"
            required
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3 }}
          >
            Login
          </Button>
          {error && (
            <Typography color="error" align="center" sx={{ mt: 2 }}>
              {error}
            </Typography>
          )}
        </form>
        <Typography variant="body1" sx={{ mt: 2 }}>
          Don't have an account? <Link to="/signup">Sign up</Link>
        </Typography>
      </div>
    </Container>
  );
};

export default SignInComponent;
