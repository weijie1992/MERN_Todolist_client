import React, { useContext } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import { TodoContext } from "../App";
import { updateTask, deletedTask } from "../functions/taskFunctions";
import { Typography } from "@mui/material";

const ShowTask = ({ todo }) => {
  console.log(`Rendering ShowTask`);
  const { state, dispatch } = useContext(TodoContext);
  const { _id, task, dueDateTime, isCompleted, isDeleted } = todo;
  return (
    <div>
      <ListItem
        key={_id}
        secondaryAction={
          <IconButton
            edge="end"
            aria-label="comments"
            onClick={() => {
              deletedTask(state.email, _id, dispatch);
            }}
          >
            <DeleteIcon />
          </IconButton>
        }
        disablePadding
      >
        <ListItemButton
          role={undefined}
          onClick={() => {
            updateTask(state.email, _id, !isCompleted, dispatch);
          }}
          dense
        >
          <ListItemIcon>
            <Checkbox
              edge="start"
              checked={isCompleted}
              tabIndex={-1}
              disableRipple
              // inputProps={{ "aria-labelledby": labelId }}
            />
            <ListItemText
              style={{ paddingTop: "7px" }}
              primary={
                <Typography variant="h6" style={{ color: "#000" }}>
                  {task}
                </Typography>
              }
              secondary={
                <Typography variant="subtitle2" style={{ color: "#808080" }}>
                  {dueDateTime.split("T")[1]}
                </Typography>
              }
            ></ListItemText>
          </ListItemIcon>
        </ListItemButton>
      </ListItem>
    </div>
  );
};

export default ShowTask;
