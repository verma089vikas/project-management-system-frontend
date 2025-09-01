import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  Paper,
  Typography,
  IconButton,
  TextField,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

export default function SortableTask({
  id,
  task,
  editId,
  setEditId,
  editValue,
  setEditValue,
  handleEdit,
  dispatch,
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.8 : 1,
    cursor: "grab",
    userSelect: "none",
    marginBottom: 8,
  };

  return (
    <Paper
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      sx={{
        p: 1,
        bgcolor: "white",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 1,
      }}
    >
      {editId === id ? (
        <>
          <TextField
            size="small"
            fullWidth
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
          />
          <Button size="small" onClick={() => handleEdit(id)}>
            Save
          </Button>
        </>
      ) : (
        <>
          <Typography sx={{ flexGrow: 1 }}>{task.projectName}</Typography>
          <IconButton
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              setEditId(id);
              setEditValue(task.projectName);
            }}
          >
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton
            size="small"
            onClick={(e) => {
              // e.stopPropagation();
              console.log("Delete", id);
              // dispatch({ type: "kanban/deleteTask", payload: id });
            }}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </>
      )}
    </Paper>
  );
}
