import axios from "axios";

export const updateTask = async (email, taskID, isCompleted, dispatch) => {
  try {
    dispatch({ type: "CALL_API" });
    const res = await axios.put(
      `${process.env.REACT_APP_SERVER_API}/updateTask/${email}`,
      {
        taskID,
        isCompleted,
      }
    );
    dispatch({
      type: "COMPLETE_TASK",
      payload: res.data,
    });
    //return;
  } catch (err) {
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
    return;
  }
};

export const deletedTask = async (email, taskID, dispatch) => {
  try {
    dispatch({ type: "CALL_API" });
    const res = await axios.delete(
      `${process.env.REACT_APP_SERVER_API}/deleteTask/${email}`,
      {
        data: {
          taskID,
        },
      }
    );
    dispatch({
      type: "DELETE_TASK",
      payload: res.data,
    });
    return;
  } catch (err) {
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
    return;
  }
};

export const addTask = async (email, task, dueDateTime, dispatch) => {
  dispatch({
    type: "CALL_API",
  });
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_SERVER_API}/addTask`,
      {
        email,
        task,
        dueDateTime,
      }
    );
    dispatch({
      type: "ADD_NEW_TASK",
      payload: res.data,
    });
  } catch (err) {
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
    return;
  }
};
