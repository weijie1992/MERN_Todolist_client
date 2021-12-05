import React, { useState, useContext } from "react";
import { toast } from "react-toastify";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import HelpCenterIcon from "@mui/icons-material/HelpCenter";
import { TodoContext } from "../App";
import { forgetPassword } from "../functions/userFunctions";
import { Link as RouterLink } from "react-router-dom";

const regexForEmail = /^[a-zA-Z0-9_]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/;

const ForgetPassword = () => {
  const { state, dispatch } = useContext(TodoContext);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);

  const handleForgetPassword = async (e) => {
    e.preventDefault();
    console.log("1!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    const res = await forgetPassword(email, dispatch);

    if (res && res.status === 200) {
      toast.success(res.data.message, {
        position: toast.POSITION.TOP_CENTER,
        theme: "colored",
      });
    } else {
      //error
      toast.error(res.response.data.error, {
        position: toast.POSITION.TOP_CENTER,
        theme: "colored",
      });
    }
  };

  const handleChange = (e) => {
    setValidEmail(regexForEmail.test(e.target.value));
    setEmail(e.target.value);
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
          <HelpCenterIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Forget Password
        </Typography>
        <Box
          component="form"
          onSubmit={handleForgetPassword}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={handleChange}
            error={email.length > 0 && !validEmail}
            helperText={email.length > 0 && !validEmail ? "Invalid Email" : ""}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={!validEmail}
          >
            NEXT
          </Button>
          <Grid container>
            <Grid item xs>
              <RouterLink to="/login">
                <Link variant="body2">Sign in</Link>
              </RouterLink>
            </Grid>
            <Grid item>
              <RouterLink to="/register">
                <Link variant="body2">Register</Link>
              </RouterLink>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default ForgetPassword;
