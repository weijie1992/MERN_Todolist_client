import "./App.css";
import React, {
  createContext,
  useState,
  useMemo,
  useReducer,
  useEffect,
} from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./CustomStyle.css";
import TodoReducer, { initialState } from "./Reducers/TodoReducer";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import ActivateAccount from "./pages/activateAccount";
import Main from "./pages/main";
import ForgetPassword from "./pages/forgetPassword";
import ResetPassword from "./pages/resetPassword";

export const initialNewTaskState = {
  task: "",
  dueDateTime: "",
  isCompleted: false,
  isDeleted: false,
};

export const TodoContext = createContext();
export const NewTaskContext = createContext();

function App() {
  const [state, dispatch] = useReducer(TodoReducer, initialState);

  return (
    <>
      {/* <BrowserRouter> */}
      <ToastContainer autoClose={10000} />
      <TodoContext.Provider value={{ state, dispatch }}>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgetPasword" element={<ForgetPassword />} />
          <Route path="/resetPassword/:jwtToken" element={<ResetPassword />} />
          <Route
            path="/activateAccount/:jwtToken"
            element={<ActivateAccount />}
          />
          <Route path="/" element={<Main />}></Route>
        </Routes>
      </TodoContext.Provider>
      {/* </BrowserRouter> */}
    </>
  );
}

export default App;
