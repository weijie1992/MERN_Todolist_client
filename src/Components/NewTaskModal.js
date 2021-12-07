import React, { useState, useContext } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import MobileDateTimePicker from "@mui/lab/MobileDateTimePicker";
import TextField from "@mui/material/TextField";
import Fab from "@mui/material/Fab";
import CheckIcon from "@mui/icons-material/Check";
import { initialNewTaskState, TodoContext } from "../App";
import { addTask } from "../functions/taskFunctions";
import { DisplayModalContext } from "../pages/main";

const style = {
  display: "block",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  // width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const NewTaskModal = () => {
  console.log(`Rendering NewTaskModal`);
  const { state, dispatch } = useContext(TodoContext);
  const { showModalOpen, setShowModalOpen } = useContext(DisplayModalContext);

  const [newTask, setNewTask] = useState({ task: "", dueDateTime: "" });

  const { task, dueDateTime } = newTask;

  const DatePickerComponent = (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <MobileDateTimePicker
        // label="Select Date Time"
        value={dueDateTime || new Date()}
        onOpen={
          dueDateTime === ""
            ? setNewTask({
                ...newTask,
                dueDateTime: new Date().toLocaleString("sv").replace(" ", "T"),
              })
            : null
        }
        onChange={(newDateTime) => {
          setNewTask({
            ...newTask,
            dueDateTime: newDateTime.toLocaleString("sv").replace(" ", "T"),
          });
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );

  const addNewTaskBtn = () => {
    addTask(
      state.email,
      task,
      dueDateTime.toLocaleString("sv").replace(" ", "T"),
      dispatch
    );
    setShowModalOpen(false);
    //reset newTask initial state
    setNewTask(initialNewTaskState);
  };

  return (
    <Modal
      open={showModalOpen}
      onClose={() => setShowModalOpen(!showModalOpen)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div>
          <TextareaAutosize
            value={task}
            onChange={(e) => {
              setNewTask({ ...newTask, task: e.target.value });
            }}
            minRows={8}
            placeholder="Enter your task"
            style={{ width: "100%" }}
          />
        </div>
        <p>Completed By:</p>
        <div style={{ color: "black" }}>{DatePickerComponent}</div>
        <Fab
          style={{ background: "#00C851", marginTop: "15px", float: "right" }}
          aria-label="sucess"
        >
          <CheckIcon onClick={addNewTaskBtn} />
        </Fab>
      </Box>
    </Modal>
  );
};

export default React.memo(NewTaskModal);
