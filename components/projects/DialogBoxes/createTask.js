import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { createTask } from "@/components/slice/taskSlice";

// Dropdown options
const taskStatusOptions = ["TODO", "IN_PROGRESS", "DONE"];
const taskPriorityOptions = ["LOW", "MEDIUM", "HIGH", "CRITICAL"];

// Mocked dropdown data
const mockProjects = [
  { id: 1, name: "Project Alpha" },
  { id: 2, name: "Project Beta" },
];

const mockUsers = [
  { id: 101, name: "Alice" },
  { id: 102, name: "Bob" },
];

export default function TaskDialog({ open, onClose, onSave, initialData }) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "TODO",
    priority: "LOW",
    estimatedHours: "",
    project: "",
    assignee: "",
  });

  useEffect(() => {
    if (initialData) {
      setForm({ ...initialData });
    } else {
      setForm({
        title: "",
        description: "",
        status: "TODO",
        priority: "LOW",
        estimatedHours: "",
        project: 2,
        assignee: "",
      });
    }
  }, [initialData]);

  const handleChange = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value });
  };

  const handleSave = () => {
    const task = {
      ...form,
      assignee:2,
      estimatedHours:Number(form.estimatedHours)
    };
    dispatch(createTask(task));
    onClose(false);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen={fullScreen}
      fullWidth
    //   maxWidth="sm"
      PaperProps={{
        sx: {
          borderRadius: 3,
          p: 2,
          bgcolor: "#f9f9f9",
        },
      }}
    >
      <DialogTitle
        sx={{
          fontWeight: "bold",
          color: "#1976d2",
        }}
      >
        {initialData ? "Edit Task" : "Create Task"}
      </DialogTitle>

      <DialogContent dividers>
        <Grid container spacing={2}>
          {/* Title */}
          <Grid item xs={12} md={6}>
            <TextField
              label="Title"
              fullWidth
              sx={{minWidth:"250px"}} 
              value={form.title}
              onChange={handleChange("title")}
              required
              variant="outlined"
              size="small"
            />
          </Grid>

          {/* Status */}
          <Grid item xs={12} md={6}>
            <FormControl sx={{minWidth:"250px"}} fullWidth  size="small">
              <InputLabel>Status</InputLabel>
              <Select
                value={form.status}
                onChange={handleChange("status")}
                label="Status"
                fullWidth
              >
                {taskStatusOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option.replace("_", " ")}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Priority */}
          <Grid item xs={12} md={6}>
            <FormControl fullWidth sx={{minWidth:"250px"}} size="small">
              <InputLabel>Priority</InputLabel>
              <Select
                value={form.priority}
                onChange={handleChange("priority")}
                label="Priority"
                fullWidth
              >
                {taskPriorityOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Estimated Hours */}
          <Grid item xs={12}>
            <TextField
              label="Estimated Hours"
              type="number"
              fullWidth
              sx={{minWidth:"250px"}}
              value={form.estimatedHours}
              onChange={handleChange("estimatedHours")}
              variant="outlined"
              size="small"
              inputProps={{ min: 0 }}
            />
          </Grid>

          {/* Project */}
          <Grid item xs={12}>
            <FormControl fullWidth sx={{minWidth:"250px"}} size="small">
              <InputLabel>Project</InputLabel>
              <Select
                value={form.project}
                onChange={handleChange("project")}
                label="Project"
                fullWidth
              >
                {mockProjects.map((p) => (
                  <MenuItem key={p.id} value={p.id}>
                    {p.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Assignee */}
          <Grid item xs={12}>
            <FormControl fullWidth sx={{minWidth:"250px"}} size="small">
              <InputLabel>Assignee</InputLabel>
              <Select
                value={form.assignee}
                onChange={handleChange("assignee")}
                label="Assignee"
              >
                {mockUsers.map((u) => (
                  <MenuItem key={u.id} value={u.id}>
                    {u.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Description at bottom */}
          <Grid item xs={12}>
            <TextField
              label="Description"
              multiline
              rows={2}
              fullWidth
              sx={{minWidth:"518px"}}
              value={form.description}
              onChange={handleChange("description")}
              variant="outlined"
              size="small"
            />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions
        sx={{
          px: 3,
          py: 2,
          justifyContent: "space-between",
        }}
      >
        <Button
          onClick={() => onClose(false)}
          variant="outlined"
          color="secondary"
          sx={{ textTransform: "none" }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          variant="contained"
          sx={{
            bgcolor: "#1976d2",
            textTransform: "none",
            "&:hover": {
              bgcolor: "#115293",
            },
          }}
        >
          {initialData ? "Update Task" : "Create Task"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
