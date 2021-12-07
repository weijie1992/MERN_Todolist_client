import React, {
  useState,
  useEffect,
  useContext,
  createContext,
  useRef,
  useMemo,
} from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import ShowTaskByDayComponent from "../Components/ShowTaskByDay";
import NewTaskContextComponent from "../Components/NewTaskModal";
import { useNavigate } from "react-router-dom";
import { TodoContext } from "../App";
import isDeepEqual from "fast-deep-equal/react";
import addJWTToken from "../middleware/addJWTToken";
import Header from "../Components/Header";

export const DisplayModalContext = createContext();

export default function Main() {
  console.log("Rendering Main");

  const navigate = useNavigate();

  const { state, dispatch } = useContext(TodoContext);
  const [render, setRender] = useState(false);
  const stateRef = useRef(state);
  if (state && state.email) {
    if (!isDeepEqual(stateRef.current.email, state.email)) {
      stateRef.current.email = state.email;
    }
  }

  //check if user exist, if does not exist redirect to login page
  useEffect(() => {
    console.log("In Main useeffect");
    addJWTToken(localStorage.getItem("token"));
    if (
      !localStorage.getItem("token") ||
      localStorage.getItem("token").length <= 0
    ) {
      navigate("/login");
    } else {
      addJWTToken(localStorage.getItem("token"));
      setRender(true);
    }
  }, []);

  const [showModalOpen, setShowModalOpen] = useState(false);

  const ShowTaskByDayMemo = useMemo(() => {
    return <ShowTaskByDayComponent />;
  }, [dispatch]);

  const NewTaskContextComponentMemo = useMemo(() => {
    return (
      <DisplayModalContext.Provider value={{ showModalOpen, setShowModalOpen }}>
        <NewTaskContextComponent />
      </DisplayModalContext.Provider>
    );
  }, [showModalOpen]);

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          bgcolor: "#cfe8fc",
          height: "100vh",
          position: "relative",
          bgcolor: "#FFF",
        }}
      >
        {render && (
          <>
            <Header />
            <div
              style={{
                float:"right",
                // position: "absolute",
                top: "0px",
                right: "0px",
              }}
            >
              <Fab color="primary" aria-label="add" style={{marginTop:"10px"}}>
                <AddIcon onClick={() => setShowModalOpen(!showModalOpen)} />
              </Fab>
              {NewTaskContextComponentMemo}
            </div>
            {ShowTaskByDayMemo}
          </>
        )}
      </Box>
    </Container>
  );
}
