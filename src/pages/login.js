import React, { useState, useContext, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Link as RouterLink } from "react-router-dom";
import { loginViaPassword } from "../functions/userFunctions";
import { TodoContext } from "../App";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import jwt from "jsonwebtoken";

const regexForEmail = /^[a-zA-Z0-9_]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/;
const passwordRegex = new RegExp(
  "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,64})"
);

export default function Login() {
  const navigate = useNavigate();

  const { state, dispatch } = useContext(TodoContext);

  const [loginEmail, setLoginEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);

  const [loginPassword, setLoginPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);

  const handleEmail = (e) => {
    setLoginEmail(e.target.value);
    setValidEmail(regexForEmail.test(e.target.value));
  };

  const handlePrefill = () => {
    if (localStorage.getItem("email")) {
      setLoginEmail(localStorage.getItem("email"));
    }
  };

  const handlePassword = (e) => {
    setLoginPassword(e.target.value);
    setValidPassword(passwordRegex.test(e.target.value));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //call to backend login
    const res = await loginViaPassword(loginEmail, loginPassword, dispatch);
    console.log(res.data);
    if (res.data && res.data.token.length > 0) {
      //store in localstorage
      // const {email} = jwt.decode(res.data.token);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("email", jwt.decode(res.data.token).email);
      navigate("/");
    } else {
      const errorMessage =
        res.response.data.error ||
        "An Unexpected Error Occured please try again";
      toast.error(errorMessage, {
        position: toast.POSITION.TOP_CENTER,
        theme: "colored",
      });
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            // value={handlePrefill||loginEmail}
            autoFocus
            onChange={
              localStorage.getItem("token") ? handlePrefill : handleEmail
            }
            error={loginEmail.length > 0 && !validEmail}
            helperText={
              loginEmail.length > 0 && !validEmail ? "Invalid Email" : ""
            }
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handlePassword}
            error={loginPassword.length > 0 && !validPassword}
            helperText={
              loginPassword.length > 0 && !validPassword
                ? "Invalid Password"
                : ""
            }
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={!(validPassword && validEmail)}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <RouterLink to="/forgetPasword">
                <Link variant="body2">Forgot password?</Link>
              </RouterLink>
            </Grid>
            <Grid item>
              <RouterLink to="/register">
                <Link variant="body2"> {"Don't have an account? Sign Up"}</Link>
              </RouterLink>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
