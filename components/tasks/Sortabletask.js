// import React from "react";
// import { useSortable } from "@dnd-kit/sortable";
// import { CSS } from "@dnd-kit/utilities";
// import {
//   Paper,
//   Typography,
//   IconButton,
//   TextField,
//   Button,
// } from "@mui/material";
// import DeleteIcon from "@mui/icons-material/Delete";
// import EditIcon from "@mui/icons-material/Edit";

// export default function SortableTask({
//   id,
//   task,
//   editId,
//   setEditId,
//   editValue,
//   setEditValue,
//   handleEdit,
//   dispatch,
// }) {
//   const {
//     attributes,
//     listeners,
//     setNodeRef,
//     transform,
//     transition,
//     isDragging,
//   } = useSortable({ id });
//   const style = {
//     transform: CSS.Transform.toString(transform),
//     transition,
//     opacity: isDragging ? 0.8 : 1,
//     cursor: "grab",
//     userSelect: "none",
//     marginBottom: 8,
//   };

//   return (
//     <Paper
//       ref={setNodeRef}
//       style={style}
//       {...attributes}
//       {...listeners}
//       sx={{
//         p: 1,
//         bgcolor: "white",
//         display: "flex",
//         justifyContent: "space-between",
//         alignItems: "center",
//         gap: 1,
//       }}
//     >
//       {editId === id ? (
//         <>
//           <TextField
//             size="small"
//             fullWidth
//             value={editValue}
//             onChange={(e) => setEditValue(e.target.value)}
//           />
//           <Button size="small" onClick={() => handleEdit(id)}>
//             Save
//           </Button>
//         </>
//       ) : (
//         <>
//           <Typography sx={{ flexGrow: 1 }}>{task.title}</Typography>
//           <IconButton
//             size="small"
//             onClick={(e) => {
//               e.stopPropagation();
//               setEditId(id);
//               setEditValue(task.projectName);
//             }}
//           >
//             <EditIcon fontSize="small" />
//           </IconButton>
//           <IconButton
//             size="small"
//             onClick={(e) => {
//               e.stopPropagation();
//               console.log("Delete", id);

//             }}
//           >
//             <DeleteIcon fontSize="small" />
//           </IconButton>
//         </>
//       )}
//     </Paper>
//   );
// }
import React, { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  Paper,
  Typography,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import { deleteTask } from "../slice/taskSlice";

export default function SortableTask({
  id,
  task,
  dispatch,
  form,
  setForm,
  open,
  onClose,
  setSelectedAction,
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editValue, setEditValue] = useState(task.name);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.8 : 1,
    userSelect: "none",
    marginBottom: 8,
    cursor: "default", // prevent whole card from being draggable
  };

  const handleDelete = async () => {
    dispatch(deleteTask(id));
  };

  const handleEdit = async () => {
    if (!editValue.trim()) return;
    dispatch(editTask({ id, name: editValue.trim() }));
    setEditDialogOpen(false);
  };

  return (
    <>
      <Paper
        ref={setNodeRef}
        style={style}
        sx={{
          p: 1.5,
          bgcolor: "white",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 1,
        }}
      >
        {/* Drag Handle */}
        <Box
          {...attributes}
          {...listeners}
          sx={{
            display: "flex",
            alignItems: "center",
            cursor: "grab",
            pr: 1,
          }}
        >
          <DragIndicatorIcon sx={{ color: "#888" }} />
        </Box>

        {/* Task Name */}
        <Typography sx={{ flexGrow: 1 }}>{task.title}</Typography>

        {/* Edit Button */}
        <IconButton
          size="small"
          onClick={(e) => {
            e.stopPropagation();
            setEditValue(task.name);
            setForm({
              title: task.title,
              description: task.description,
              status: task.status,
              priority: task.priority,
              estimatedHours: task.estimatedHours,
              assigneeId: task.assigneeId ? task.assigneeId : "",
              id: task.id,
              projectId: task.projectId,

            });
            setSelectedAction("edit");
            // setEditDialogOpen(true);
            onClose(true);
          }}
        >
          <EditIcon fontSize="small" />
        </IconButton>

        {/* Delete Button */}
        <IconButton
          size="small"
          onClick={(e) => {
            e.stopPropagation();
            handleDelete();
          }}
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      </Paper>

      {/* Edit Dialog */}
      <Dialog
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Edit Task</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            autoFocus
            margin="dense"
            label="Task Name"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleEdit}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
