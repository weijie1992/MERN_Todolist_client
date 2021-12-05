import axios from "axios";

export const retrieveUserTask = (email, dispatch) => {
  dispatch({
    type: "CALL_API",
  });
  axios
    .get(`${process.env.REACT_APP_SERVER_API}/getTaskByUserID/${email}`)
    .then((res) => {
      dispatch({
        type: "LOGIN",
        payload: res.data,
      });
      return;
    })
    .catch((err) => {
      dispatch({
        type: "FINISH_API",
      });
      if (err.response.status === 401 || err.response.status === 403) {
        //remove token from localstorage
        localStorage.removeItem("token");
        //Redirect
        window.location.href = "/login";
      } else {
        return err;
      }
    });
  return;
};

export const registerUser = async (email, dispatch) => {
  dispatch({
    type: "CALL_API",
  });

  return await axios
    .post(`${process.env.REACT_APP_SERVER_API}/Register`, { email })
    .then((res) => {
      dispatch({
        type: "FINISH_API",
      });
      return res;
    })
    .catch((err) => {
      // console.log(err.response.data.error);
      dispatch({
        type: "FINISH_API",
      });
      return err;
    });
};

export const activateAccount = async (jwtToken, dispatch) => {
  dispatch({
    type: "CALL_API",
  });
  return await axios
    .get(`${process.env.REACT_APP_SERVER_API}/activateAccount/${jwtToken}`)
    .then((res) => {
      dispatch({
        type: "FINISH_API",
      });
      return res;
    })
    .catch((err) => {
      dispatch({
        type: "FINISH_API",
      });

      return err;
    });
};

export const createUserAccount = async (password, jwtToken, dispatch) => {
  dispatch({
    type: "CALL_API",
  });
  return await axios
    .post(`${process.env.REACT_APP_SERVER_API}/createUserAccount`, {
      password,
      jwtToken,
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: "FINISH_API",
      });
      return res;
    })
    .catch((err) => {
      dispatch({
        type: "FINISH_API",
      });
      return err;
    });
};

export const loginViaPassword = async (email, password, dispatch) => {
  dispatch({
    type: "CALL_API",
  });
  return axios
    .post(`${process.env.REACT_APP_SERVER_API}/loginViaPassword`, {
      email,
      password,
    })
    .then((res) => {
      dispatch({
        type: "FINISH_API",
      });
      return res;
    })
    .catch((err) => {
      dispatch({
        type: "FINISH_API",
      });
      return err;
    });
};

export const logout = async (dispatch) => {
  dispatch({
    type: "LOGOUT",
  });
  //Redirect
  return true;
};

export const forgetPassword = async (email, dispatch) => {
  dispatch({
    type: "CALL_API",
  });
  return await axios
    .get(`${process.env.REACT_APP_SERVER_API}/forgetPassword/${email}`)
    .then((res) => {
      dispatch({
        type: "FINISH_API",
      });
      return res;
    })
    .catch((err) => {
      dispatch({
        type: "FINISH_API",
      });
      return err;
    });
};

export const resetPasswordJWTCheck = async (jwtToken, dispatch) => {
  dispatch({
    type: "CALL_API",
  });
  return await axios
    .get(
      `${process.env.REACT_APP_SERVER_API}/resetPasswordJWTCheck/${jwtToken}`
    )
    .then((res) => {
      dispatch({
        type: "FINISH_API",
      });
      return res;
    })
    .catch((err) => {
      dispatch({
        type: "FINISH_API",
      });
      return err;
    });
};
export const resetPassword = async (jwtToken, updatedPassword, dispatch) => {
  dispatch({
    type: "CALL_API",
  });
  return await axios
    .post(`${process.env.REACT_APP_SERVER_API}/resetPassword`, {
      jwtToken,
      updatedPassword,
    })
    .then((res) => {
      dispatch({ type: "FINISH_API" });
      return res;
    })
    .catch((err) => {
      dispatch({
        type: "FINISH_API",
      });
      return err;
    });
};
