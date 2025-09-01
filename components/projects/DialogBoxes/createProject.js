// ProjectDialog.jsx
import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import { createProject, fetchProjectByUserId, fetchProjects } from "@/components/slice/projectSlice";
import { useDispatch } from "react-redux";

const ProjectDialog = ({ open, onClose, onSubmit }) => {
  const [projectName, setProjectName] = useState("");
  const [deadline, setDeadline] = useState(null);
  const [description, setDescription] = useState("");
  const [selectedUserId, setSelectUserId] = useState("");
  const { users } = useSelector((state) => state.users);


  const dispatch = useDispatch();
   const user = JSON.parse(localStorage.getItem("user"));
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle>Project</DialogTitle>
        <DialogContent>
          <Stack spacing={3} mt={1}>
            <TextField
              label="Project Name"
              fullWidth
              required
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
            />
            <DatePicker
              label="Deadline"
              value={deadline}
              onChange={(newValue) =>
                dayjs(setDeadline(newValue)).format("YYYY-MM-DD")
              }
              disablePast
              slotProps={{
                textField: { fullWidth: true, required: true },
              }}
            />
            <FormControl fullWidth margin="normal">
              <InputLabel id="user-select-label">Select Owner</InputLabel>
              <Select
                labelId="user-select-label"
                id="user-select"
                value={selectedUserId}
                label="Select User"
                onChange={(e) => setSelectUserId(e.target.value)}
              >
                {users.map((user) => (
                  <MenuItem key={user.id} value={user.id}>
                    {user.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="Description (optional)"
              multiline
              minRows={3}
              fullWidth
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => onClose(false)} color="inherit">
            Cancel
          </Button>
          <Button onClick={()=>{
            const body={
              name: projectName,
              description: description,
              deadline: deadline.toISOString(),
              status:"PLANNED",
              ownerId: selectedUserId,
            }
            dispatch(createProject(body)).then(()=>{
                      if (user.role === "ADMIN") dispatch(fetchProjects());
                        else dispatch(fetchProjectByUserId(user.id));
                        onClose(false);
                  });
            

            }
          } variant="contained" color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </LocalizationProvider>
  );
};

export default ProjectDialog;
