import React, { useState, useEffect, useContext } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import RedoIcon from "@mui/icons-material/Redo";
import { useNavigate, useParams } from "react-router-dom";
import { TodoContext } from "../App.js";
import {
  resetPasswordJWTCheck,
  resetPassword,
} from "../functions/userFunctions";
import { toast } from "react-toastify";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import { Link as RouterLink } from "react-router-dom";

const passwordRegex = new RegExp(
  "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,64})"
);

const ResetPassword = () => {
  const { state, dispatch } = useContext(TodoContext);

  const navigate = useNavigate();

  const { jwtToken } = useParams();

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);

  const [confirmPassword, setConfirmPassword] = useState("");
  const [validConfirmPassword, setValidConfirmPassword] = useState(false);

  useEffect(() => {
    const resetPasswordJWTCheckfn = async () => {
      const res = await resetPasswordJWTCheck(jwtToken, dispatch);
      if (res && res.status !== 201) {
        console.log(res);
        toast.error(res.response.data.error, {
          position: toast.POSITION.TOP_CENTER,
          theme: "colored",
        });
        navigate("/forgetPasword");
      }
    };
    resetPasswordJWTCheckfn();
  }, [jwtToken]);

  const handlePassword = (e) => {
    setValidPassword(passwordRegex.test(e.target.value));
    setValidConfirmPassword(e.target.value === confirmPassword);
    setPassword(e.target.value);
  };

  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
    setValidConfirmPassword(e.target.value === password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await resetPassword(jwtToken, password, dispatch);
    if (res.status === 201) {
      toast.success("Password Updated Successful", {
        position: toast.POSITION.TOP_CENTER,
        theme: "colored",
      });
      navigate("/login");
    } else {
      toast.error(res.response.data.error, {
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
          <RedoIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Reset Password
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
            Reset Pasword
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

export default ResetPassword;
