import React, { Fragment, useContext, useEffect, useRef } from "react";
import ShowTask from "./ShowTask";
import { TodoContext } from "../App";
import { retrieveUserTask } from "../functions/userFunctions";
import jwt from "jsonwebtoken";
import isDeepEqual from "fast-deep-equal/react";
import CircularProgress from "@mui/material/CircularProgress";
import addJWTToken from "../middleware/addJWTToken";

const ShowTaskByDay = () => {
  console.log(`Rendering ShowTaskByDay`);

  const { state, dispatch } = useContext(TodoContext);

  const stateRef = useRef(state);

  if (state && state.email) {
    if (!isDeepEqual(stateRef.current.email, state.email)) {
      stateRef.current.email = state.email;
    }
  }

  //get token from state, else get from localstorage.
  //dependency - if email changed, useeffect will call
  useEffect(() => {
    console.log("In ShowTaskByDay useeffect");
    // addJWTToken(localStorage.getItem("token"));
    if (state && state.email) {
      retrieveUserTask(state.email, dispatch, localStorage.getItem("token"));
    } else if (localStorage.getItem("token")) {
      const { email } = jwt.decode(localStorage.getItem("token"));
      retrieveUserTask(email, dispatch, localStorage.getItem("token"));
    }
  }, []);

  const upcomingTodos =
    state &&
    state.todos &&
    state.todos.length > 0 &&
    state.todos.filter((t) => {
      return !t.isDeleted && !t.isCompleted;
    });
  const completedTodos =
    state &&
    state.todos &&
    state.todos.length > 0 &&
    state.todos.filter((t) => {
      return t.isCompleted;
    });
  return (
    <>
      {state && state.loading && state.loading === true ? (
        <CircularProgress size={100} />
      ) : (
        (upcomingTodos || completedTodos) && (
          <>
            <h3>Upcoming Task: {upcomingTodos.length}</h3>
            {(upcomingTodos || upcomingTodos.length > 0) &&
              upcomingTodos.map((t, i, a) => {
                return (
                  <Fragment key={i}>
                    {i === 0 ? (
                      <div>{t.dueDateTime.split("T")[0]}</div>
                    ) : (
                      t.dueDateTime.split("T")[0] !==
                        a[i - 1].dueDateTime.split("T")[0] && (
                        <div>{t.dueDateTime.split("T")[0]}</div>
                      )
                    )}
                    <ShowTask key={i} todo={t} />
                  </Fragment>
                );
              })}
            {completedTodos && completedTodos.length > 0 && (
              <h3>Completed Task: {completedTodos.length}</h3>
            )}
            {completedTodos &&
              completedTodos.length > 0 &&
              completedTodos.map((t, i, a) => {
                return (
                  <Fragment key={i}>
                    {i === 0 ? (
                      <div>{t.dueDateTime.split("T")[0]}</div>
                    ) : (
                      t.dueDateTime.split("T")[0] !==
                        a[i - 1].dueDateTime.split("T")[0] && (
                        <div>{t.dueDateTime.split("T")[0]}</div>
                      )
                    )}
                    <ShowTask key={i} todo={t} />
                  </Fragment>
                );
              })}
          </>
        )
      )}
    </>
  );
};

export default React.memo(ShowTaskByDay);
