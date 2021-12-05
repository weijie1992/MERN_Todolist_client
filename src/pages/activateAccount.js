import React, { useEffect, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { activateAccount } from "../functions/userFunctions";
import { toast } from "react-toastify";
import { TodoContext } from "../App.js";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Link as RouterLink } from "react-router-dom";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createUserAccount } from "../functions/userFunctions";
import { useNavigate } from "react-router-dom";

const passwordRegex = new RegExp(
  "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,64})"
);
export default function ActiviateAccount() {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(TodoContext);

  const { jwtToken } = useParams();

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);

  const [confirmPassword, setConfirmPassword] = useState("");
  const [validConfirmPassword, setValidConfirmPassword] = useState(false);

  useEffect(() => {
    activateAccount(jwtToken, dispatch).then((res) => {
      if (res.status !== 201) {
        toast.error(res.response.data.error, {
          position: toast.POSITION.TOP_CENTER,
          theme: "colored",
        });
        navigate("/register");
      }
    });
  }, [jwtToken, dispatch]);

  const handlePassword = (e) => {
    setPassword(e.target.value);
    setValidPassword(passwordRegex.test(e.target.value));
    setValidConfirmPassword(e.target.value === confirmPassword);
  };

  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
    setValidConfirmPassword(e.target.value === password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //call to backend login, send password
      const res = await createUserAccount(password, jwtToken, dispatch);
      //success, redirect to login page
      if (res.status === 201) {
        navigate("/login");
        toast.success("Successfully Registered, try your new login password", {
          position: toast.POSITION.TOP_CENTER,
          theme: "colored",
        });
        return;
      }
      //fail, redirect to register page show toast
      navigate("/register");
      toast.error(res.response.data.error, {
        position: toast.POSITION.TOP_CENTER,
        theme: "colored",
      });
    } catch (err) {
      //fail, redirect to register page show toast
      navigate("/register");
      toast.error("An unexpected error occured, please try to register again", {
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
          Sign Up
        </Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            autoFocus
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="new-password"
            onChange={handlePassword}
            error={password.length > 0 && !validPassword}
            helperText={
              password.length > 0 && !validPassword
                ? "Password must be 8 to 64 characters, contain 1 upper, 1 lower, 1 numberic and a special character "
                : ""
            }
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="confirm-password"
            label="Confirm Password"
            type="password"
            id="confirm-password"
            autoComplete="new-password"
            onChange={handleConfirmPassword}
            error={confirmPassword.length > 0 && !validConfirmPassword}
            helperText={
              confirmPassword.length > 0 && !validConfirmPassword
                ? "Confirm Password and Password does not match"
                : ""
            }
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={
              !(password.length !== "" && validPassword && validConfirmPassword)
            }
          >
            Sign Up
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
