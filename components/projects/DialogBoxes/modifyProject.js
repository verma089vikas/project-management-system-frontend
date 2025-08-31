import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Stack,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import dayjs from 'dayjs';

const statusOptions = ['todo', 'inprogress', 'completed'];

const ModifyProjectDialog = ({ open, onClose, initialData = {}, onSubmit }) => {
  const validationSchema = Yup.object({
    name: Yup.string().required('Project name is required'),
    deadline: Yup.date()
      .min(new Date(), 'Deadline must be in the future')
      .required('Deadline is required'),
    status: Yup.string().oneOf(statusOptions).required('Status is required'),
  });

  const defaultValues = {
    name: initialData.name || '',
    deadline: initialData.deadline ? dayjs(initialData.deadline) : null,
    status: initialData.status || 'todo',
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Modify Project</DialogTitle>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Formik
          initialValues={defaultValues}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            onSubmit({
              ...values,
              deadline: values.deadline.toISOString(),
            });
            onClose();
          }}
        >
          {({ values, handleChange, setFieldValue, touched, errors }) => (
            <Form>
              <DialogContent>
                <Stack spacing={3}>
                  <TextField
                    label="Project Name"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    error={touched.name && Boolean(errors.name)}
                    helperText={touched.name && errors.name}
                    fullWidth
                    required
                  />

                  <DatePicker
                    label="Deadline"
                    value={values.deadline}
                    onChange={(value) => setFieldValue('deadline', value)}
                    disablePast
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        error: touched.deadline && Boolean(errors.deadline),
                        helperText: touched.deadline && errors.deadline,
                        required: true,
                      },
                    }}
                  />

                  <TextField
                    select
                    label="Status"
                    name="status"
                    value={values.status}
                    onChange={handleChange}
                    error={touched.status && Boolean(errors.status)}
                    helperText={touched.status && errors.status}
                    fullWidth
                    required
                  >
                    {statusOptions.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option.charAt(0).toUpperCase() + option.slice(1)}
                      </MenuItem>
                    ))}
                  </TextField>
                </Stack>
              </DialogContent>

              <DialogActions>
                <Button onClick={()=>onClose(false)}>Cancel</Button>
                <Button type="submit" variant="contained" color="primary">
                  Save Changes
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </LocalizationProvider>
    </Dialog>
  );
};

export default ModifyProjectDialog;
