// eslint-disable-next-line no-unused-vars
import React, { useRef, useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  CssBaseline,
} from "@mui/material";
import { Link , useNavigate } from "react-router-dom";
import usePostApi from './PostApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUpComponent = () => {
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const reEnterPasswordRef = useRef(null);
  const emailRef = useRef(null);

  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [reEnterPasswordError, setReEnterPasswordError] = useState("");
  const navigate = useNavigate();
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const usernameRegex = /^[a-zA-Z0-9_-]{3,}$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

  const isValidEmail = (useremail) => {
    return emailRegex.test(useremail);
  };

  const isValidUserName = (username) => {
    return usernameRegex.test(username);
  };

  const isValidPassword = (pass) => {
    return passwordRegex.test(pass);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const username = usernameRef.current.value;
    const password = passwordRef.current.value;
    const email = emailRef.current.value;
    const reEnterPassword = reEnterPasswordRef.current.value;

    setUsernameError("");
    setEmailError("");
    setPasswordError("");
    setReEnterPasswordError("");

    if (!isValidUserName(username)) {
      setUsernameError(
        "Invalid username. Please use at least 3 alphanumeric characters."
      );
      return;
    }

    if (!isValidEmail(email)) {
      setEmailError("Invalid email address.");
      return;
    }

    if (!isValidPassword(password)) {
      setPasswordError(
        "Invalid password. Password must contain at least 8 characters, including letters, numbers, and special characters."
      );
      return;
    }

    if (password !== reEnterPassword) {
      setReEnterPasswordError("Passwords do not match.");
      return;
    }

    const formData = {
      username,
      password,
      email,
    };

    try {
      const apiUrl = 'auth/signup'; // Replace with your actual API URL
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { response, error } = await usePostApi(apiUrl, formData);

      if (error) {
        console.error("Error:", error.message);
      } else {
        toast.success(response);
        usernameRef.current.value = "";
        passwordRef.current.value= "";
        emailRef.current.value= "";
        reEnterPasswordRef.current.value= "";
        navigate('/')
      }
    } catch (error) {
      console.log("Unexpected Error:", error.message);
      toast.error(error.message ? error.message : "Unexpected error. Please try again later.");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <ToastContainer/>
      <div>
        <Typography variant="h5" align="center" gutterBottom>
          SignUp
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
          
          {usernameError && (
            <Typography color="error" align="left" sx={{ mt: 1 }}>
              {usernameError}
            </Typography>
          )}


          <TextField
            fullWidth
            label="Email"
            inputRef={emailRef}
            variant="outlined"
            margin="normal"
            required
          />
          {emailError && (
            <Typography color="error" align="left" sx={{ mt: 1 }}>
              {emailError}
            </Typography>
          )}



          <TextField
            fullWidth
            label="Password"
            type="password"
            inputRef={passwordRef}
            variant="outlined"
            margin="normal"
            required
          />
          {passwordError && (
            <Typography color="error" align="left" sx={{ mt: 1 }}>
              {passwordError}
            </Typography>
          )}

          <TextField
            fullWidth
            label="Re-Enter Password"
            type="password"
            inputRef={reEnterPasswordRef}
            variant="outlined"
            margin="normal"
            required
          />
          {reEnterPasswordError && (
            <Typography color="error" align="left" sx={{ mt: 1 }}>
              {reEnterPasswordError}
            </Typography>
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3 }}
          >
            SignUp
          </Button>
        </form>

        <Typography variant="body1" sx={{ mt: 2 }}>
          Already have an account? <Link to="/">Signin</Link>
        </Typography>
      </div>
    </Container>
  );
};

export default SignUpComponent;
