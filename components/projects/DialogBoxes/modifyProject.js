// import React from 'react';
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Button,
//   TextField,
//   MenuItem,
//   Stack,
// } from '@mui/material';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import { LocalizationProvider } from '@mui/x-date-pickers';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { Formik, Form } from 'formik';
// import * as Yup from 'yup';
// import dayjs from 'dayjs';
// import { useDispatch } from 'react-redux';
// import { fetchProjectByUserId, fetchProjects, updateProject } from '@/components/slice/projectSlice';

// const statusOptions = ['PLANNED', 'ACTIVE', 'COMPLETED', 'ON-HOLD', 'CANCELLED'];

// const ModifyProjectDialog = ({ open, onClose, project}) => {
//   const validationSchema = Yup.object({
//     name: Yup.string().required('Project name is required'),
//     deadline: Yup.date()
//       .min(new Date(), 'Deadline must be in the future')
//       .required('Deadline is required'),
//     status: Yup.string().oneOf(statusOptions).required('Status is required'),
//   });
// const dispatch = useDispatch();
//   const defaultValues = {
//     name: project?.name || '',
//     deadline: project?.deadline ? dayjs(project.deadline) : null,
//     status: project?.status || 'todo',
//   };
//  const user = JSON.parse(localStorage.getItem("user"));
//   return (
//     <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
//       <DialogTitle>Modify Project</DialogTitle>

//       <LocalizationProvider dateAdapter={AdapterDayjs}>
//         <Formik
//           initialValues={defaultValues}
//           validationSchema={validationSchema}
//           onSubmit={(values) => {

//              const body ={
//                     name: values.name,
//                     description: values.description,
//                     deadline: values.deadline.toISOString(),
//                     status: values.status,
//                     ownerId: values.ownerId,
//                     id:project.id,
//                   }
//                   dispatch(updateProject(body)).then(()=>{
//                       if (user.role === "ADMIN") dispatch(fetchProjects());
//                         else dispatch(fetchProjectByUserId(user.id));
//                          onClose(false);
//                   });

//           }}
//         >
//           {({ values, handleChange, setFieldValue, touched, errors }) => (
//             <Form>
//               <DialogContent>
//                 <Stack spacing={3}>
//                   <TextField
//                     label="Project Name"
//                     name="name"
//                     value={values.name}
//                     onChange={handleChange}
//                     error={touched.name && Boolean(errors.name)}
//                     helperText={touched.name && errors.name}
//                     fullWidth
//                     required
//                   />

//                   <DatePicker
//                     label="Deadline"
//                     value={values.deadline}
//                     onChange={(value) => setFieldValue('deadline', value)}
//                     disablePast
//                     slotProps={{
//                       textField: {
//                         fullWidth: true,
//                         error: touched.deadline && Boolean(errors.deadline),
//                         helperText: touched.deadline && errors.deadline,
//                         required: true,
//                       },
//                     }}
//                   />

//                   <TextField
//                     select
//                     label="Status"
//                     name="status"
//                     value={values.status}
//                     onChange={handleChange}
//                     error={touched.status && Boolean(errors.status)}
//                     helperText={touched.status && errors.status}
//                     fullWidth
//                     required
//                   >
//                     {statusOptions.map((option) => (
//                       <MenuItem key={option} value={option}>
//                         {option.charAt(0).toUpperCase() + option.slice(1)}
//                       </MenuItem>
//                     ))}
//                   </TextField>
//                 </Stack>
//               </DialogContent>

//               <DialogActions>
//                 <Button onClick={()=>onClose(false)}>Cancel</Button>
//                 <Button type="button" variant="contained" color="primary" onClick={() => {
//                    console.log("values",values);
//                   const body ={
//                     name:values.name,
//                     description: values.description,
//                     deadline: values.deadline.toISOString(),
//                     status: values.status,
//                     ownerId: values.ownerId,
//                     id:project.id,
//                   }
//                   dispatch(updateProject(body)).then(()=>{
//                       if (user.role === "ADMIN") dispatch(fetchProjects());
//                         else dispatch(fetchProjectByUserId(user.id));
//                          onClose(false);
//                   });
//                 }
//                 }>
//                   Save Changes
//                 </Button>
//               </DialogActions>
//             </Form>
//           )}
//         </Formik>
//       </LocalizationProvider>
//     </Dialog>
//   );
// };

// export default ModifyProjectDialog;

import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Stack,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import {
  fetchProjectByUserId,
  fetchProjects,
  updateProject,
} from "@/components/slice/projectSlice";
import { useSelector } from "react-redux";

const statusOptions = [
  "PLANNED",
  "ACTIVE",
  "COMPLETED",
  "ON-HOLD",
  "CANCELLED",
];

const ModifyProjectDialog = ({ open, onClose, project }) => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));
  const { users } = useSelector((state) => state.users);
  console.log("users",users)
  const defaultValues = {
    name: project?.name || "",
    description: project?.description || "",
    deadline: project?.deadline ? dayjs(project.deadline) : null,
    status: project?.status || "PLANNED",
    ownerId: project?.ownerId || user?.id || "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Project name is required"),
    description: Yup.string().required("Description is required"),
    deadline: Yup.date()
      .nullable()
      .min(new Date(), "Deadline must be in the future")
      .required("Deadline is required"),
    status: Yup.string().oneOf(statusOptions).required("Status is required"),
  });

  return (
    <Dialog open={open} onClose={() => onClose(false)} maxWidth="sm" fullWidth>
      <DialogTitle>Modify Project</DialogTitle>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Formik
          initialValues={defaultValues}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              const body = {
                id: project.id,
                name: values.name,
                description: values.description,
                deadline: values.deadline?.toISOString(),
                status: values.status,
                ownerId: values.ownerId,
              };

              console.log("Submitting project update:", body);

              await dispatch(updateProject(body));

              if (user?.role === "ADMIN") {
                dispatch(fetchProjects());
              } else {
                dispatch(fetchProjectByUserId(user?.id));
              }

              onClose(false);
            } catch (err) {
              console.error("Update failed:", err);
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({
            values,
            handleChange,
            setFieldValue,
            touched,
            errors,
            isSubmitting,
          }) => (
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

                  <TextField
                    label="Description"
                    name="description"
                    value={values.description}
                    onChange={handleChange}
                    error={touched.description && Boolean(errors.description)}
                    helperText={touched.description && errors.description}
                    fullWidth
                    required
                  />
                  <FormControl fullWidth margin="normal">
                    <InputLabel id="user-select-label">Select Owner</InputLabel>
                    <Select
                      labelId="user-select-label"
                      id="user-select"
                      value={values.ownerId}
                      label="Select User"
                      onChange={(e) => setFieldValue("ownerId", e.target.value)}
                    >
                      {users.map((user) => (
                        <MenuItem key={user.id} value={user.id}>
                          {user.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <DatePicker
                    label="Deadline"
                    value={values.deadline}
                    onChange={(value) => setFieldValue("deadline", value)}
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
                <Button onClick={() => onClose(false)} disabled={isSubmitting}>
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    console.log("ownerid",values.ownerId)
                    const body = {
                      id: project.id,
                      name: values.name,
                      description: values.description,
                      deadline: dayjs(values.deadline).format("YYYY-MM-DD"),
                      status: values.status,
                      ownerId: values.ownerId,
                    };

                    console.log("Submitting project update:", body);

                    dispatch(updateProject(body));

                    if (user?.role === "ADMIN") {
                      dispatch(fetchProjects());
                    } else {
                      dispatch(fetchProjectByUserId(user?.id));
                    }

                    onClose(false);
                  }}
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                >
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
