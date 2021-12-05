import React, { useState, useContext, useEffect } from "react";
import { toast } from "react-toastify";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import CreateIcon from "@mui/icons-material/Create";
import { registerUser } from "../functions/userFunctions";
import { TodoContext } from "../App.js";

const regexForEmail = /^[a-zA-Z0-9_]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/;

export default function Register() {
  //useContext
  const { state, dispatch } = useContext(TodoContext);

  const navigate = useNavigate();

  const [registerEmail, setRegisterEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    //call to backend login
    if (validEmail) {
      const res = await registerUser(registerEmail, dispatch);
      if (res.status === 200) {
        toast.success(res.data.message, {
          position: toast.POSITION.TOP_CENTER,
          theme: "colored",
        });
      } else {
        toast.error(res.response.data.error, {
          position: toast.POSITION.TOP_CENTER,
          theme: "colored",
        });
      }
    }
  };

  const handleEmail = (e) => {
    setRegisterEmail(e.target.value);
    setValidEmail(regexForEmail.test(e.target.value));
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
          <CreateIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Register
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
            autoFocus
            onChange={(e) => handleEmail(e)}
            error={registerEmail.length > 0 && !validEmail}
            helperText={
              registerEmail.length > 0 && !validEmail ? "Invalid Email" : ""
            }
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={!validEmail}
          >
            Register
          </Button>
          <Grid container>
            <Grid item xs>
              <RouterLink to="/login">
                <Link variant="body2">
                  {"Already have an account? Sign In"}
                </Link>
              </RouterLink>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
