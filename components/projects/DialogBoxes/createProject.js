// ProjectDialog.jsx
import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Stack
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

const ProjectDialog = ({ open, onClose, onSubmit }) => {
  const [projectName, setProjectName] = useState('');
  const [deadline, setDeadline] = useState(null);
  const [description, setDescription] = useState('');

  const handleSubmit = () => {
    if (!projectName || !deadline) {
      alert("Please fill all required fields.");
      return;
    }

    const data = {
      name: projectName,
      deadline: deadline.toISOString(),
      description,
    };

    onSubmit(data);
    onClose();
  };

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
            onChange={(newValue) => dayjs(setDeadline(newValue)).format('YYYY-MM-DD')}
            disablePast
            slotProps={{
              textField: { fullWidth: true, required: true },
            }}
          />
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
        <Button onClick={()=>onClose(false)} color="inherit">Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
    </LocalizationProvider>
  );
};

export default ProjectDialog;
