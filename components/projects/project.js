"use client";
// import { Grid, List, ListItem, Paper, Typography } from "@mui/material";
// import { keyframes } from "@emotion/react";
// import React from "react";

// const Project = () => {
//   const fadeIn = keyframes`
//   from {
//     opacity: 0;
//     transform: translateY(10px);
//   }
//   to {
//     opacity: 1;
//     transform: translateY(0);
//   }
// `;
//   const project = [
//     {
//       name: "Ncl Lead Ingestion",
//       completion: "98%",
//     },
//     {
//       name: "Ncl Lead Ingestion",
//       completion: "88%",
//     },
//     {
//       name: "Ncl Lead Ingestion",
//       completion: "78%",
//     },
//   ];

//   return (
//     <div>
//       <Paper
//         elevation={5}
//         sx={{
//           m: 3,
//           p: 3,
//           backgroundColor: "yellow",
//           border: "1px solid black",
//         }}
//       >
//         <Grid
//           container
//           sx={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//           }}
//         >
//           <Grid item xs={12} sm={6} sx={{ backgroundColor: "green", p: 3 }}>
//             <Typography
//               variant="h4"
//               sx={{ fontFamily: "-moz-initial", fontSize: 70 }}
//             >
//               Welcome{" "}
//             </Typography>
//             <Typography
//               sx={{
//                 ml: 2,
//                 fontFamily: "cursive",
//                 animation: `${fadeIn} 3s ease-in-out`,
//                 fontSize: 40,
//               }}
//             >
//               Vikas verma
//             </Typography>
//           </Grid>
//           <Grid item xs={12} sm={6} sx={{ backgroundColor: "blue" }}>
//             <Typography
//               variant="h5"
//               sx={{ fontFamily: "sans-serif", ml: 5, p: 10 }}
//             >
//               Projects
//             </Typography>
//             <List>
//               {project.map((pr, i) => (
//                 <ListItem
//                   key={i}
//                     sx={{
//                       display: "flex",
//                       justifyContent: "space-between",
//                       alignItems: "center",
//                     }}
//                 >
//                   <Typography sx={{ backgroundColor: "red" }}>
//                     {pr.name}{" "}
//                   </Typography>
//                   <Typography>{pr.completion}</Typography>
//                 </ListItem>
//               ))}
//             </List>
//           </Grid>
//         </Grid>
//       </Paper>
//     </div>
//   );
// };
// import React from "react";
//  import { LinearProgress } from "@mui/material"; // make sure to import this
// import {
//   Paper,
//   Grid,
//   Typography,
//   List,
//   ListItem,
//   ListItemButton,
//   ListItemText,
//   Box,
// } from "@mui/material";
// import { keyframes } from "@emotion/react";
// // import { useNavigate } from "react-router-dom";

// const fadeIn = keyframes`
//   from {
//     opacity: 0;
//     transform: translateY(30px);
//   }
//   to {
//     opacity: 1;
//     transform: translateY(0);
//   }
// `;

// const Project = () => {
//   // const navigate = useNavigate();

//   const projects = [
//     { name: "Ncl Lead Ingestion", completion: "98%" },
//     { name: "Marketing Dashboard", completion: "88%" },
//     { name: "Sales Analysis Tool", completion: "78%" },
//     { name: "Customer CRM", completion: "93%" },
//     { name: "Data Sync Engine", completion: "67%" },
//     { name: "User Behavior Tracker", completion: "85%" },
//     { name: "AI Chatbot Dev", completion: "72%" },
//   ];

//   // const handleProjectClick = (name) => {
//   //   navigate(`/project/${encodeURIComponent(name)}`);
//   // };

//   return (
//     <Paper
//       elevation={4}
//       sx={{
//         height: "100vh",
//         width: "100vw",
//         m: 0,
//         p: 0,
//         borderRadius: 0,
//         background: "linear-gradient(to right, #a4ebdfff, #FFF9C4)",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         animation: `${fadeIn} 1.5s ease-in-out`,
//       }}
//     >
//       <Grid
//         container
//         sx={{
//           height: "90%",
//           width: "90%",
//           boxShadow: 3,
//           borderRadius: 4,
//           overflow: "hidden",
//         }}
//       >
//         {/* Left Side - Welcome */}
//         <Grid
//           item
//           xs={12}
//           md={6}
//           sx={{
//             background: "linear-gradient(to bottom, #af4ca2ff, #2E7D32)",
//             color: "white",
//             p: 6,
//             display: "flex",
//             flexDirection: "column",
//             justifyContent: "flex",
//             animation: `${fadeIn} 2s`,
//             width: "50%",
//           }}
//         >
//           <Typography
//             variant="h2"
//             sx={{
//               fontFamily: "monospace",
//               fontWeight: "bold",
//               mb: 2,
//               textShadow: "2px 2px 4px #000",
//             }}
//           >
//             Welcome
//           </Typography>
//           <Typography
//             variant="h4"
//             sx={{
//               fontFamily: "cursive",
//               animation: `${fadeIn} 2.5s ease-in-out`,
//               textShadow: "1px 1px 3px #000",
//             }}
//           >
//             Vikas Verma
//           </Typography>
//         </Grid>

//         {/* Right Side - Projects */}
//         <Grid
//           item
//           xs={12}
//           md={6}
//           sx={{
//             background: "linear-gradient(to bottom, #e6c890ff, #1976D2)",
//             color: "white",
//             p: 4,
//             animation: `${fadeIn} 2s`,
//             overflow: "auto",
//             width: "50%",
//           }}
//         >
//           <Typography
//             variant="h4"
//             sx={{
//               fontFamily: "sans-serif",
//               fontWeight: "bold",
//               mb: 3,
//               textAlign: "center",
//               textShadow: "1px 1px 3px #000",
//             }}
//           >
//             Projects
//           </Typography>

//           <Box
//             sx={{
//               maxHeight: "70vh",
//               overflowY: projects.length > 6 ? "auto" : "visible",
//               backgroundColor: "rgba(255, 255, 255, 0.1)",
//               p: 1,
//               borderRadius: 2,
//             }}
//           >
//             <List>

// {projects.map((project, index) => (
//   <ListItem key={index} disablePadding sx={{ mb: 2 }}>
//     <Box sx={{ width: "100%" }}>
//       <ListItemButton
//         // onClick={() => handleProjectClick(project.name)}
//         sx={{
//           backgroundColor: "white",
//           borderRadius: 2,
//           flexDirection: "column",
//           alignItems: "flex-start",
//           p: 2,
//           "&:hover": {
//             backgroundColor: "#BBDEFB",
//           },
//         }}
//       >
//         <Typography
//           sx={{
//             fontWeight: "bold",
//             color: "#303f9f",
//             mb: 1,
//             fontSize: "1.1rem",
//           }}
//         >
//           {project.name}
//         </Typography>

//         {/* Progress Bar with Label */}
//         <Box sx={{ width: "100%" }}>
//           <LinearProgress
//             variant="determinate"
//             value={parseInt(project.completion)}
//             sx={{
//               height: 10,
//               borderRadius: 5,
//               backgroundColor: "#e0e0e0",
//               "& .MuiLinearProgress-bar": {
//                 backgroundColor: "#3f51b5",
//               },
//             }}
//           />
//           <Typography
//             sx={{
//               mt: 1,
//               fontSize: "0.85rem",
//               color: "#555",
//               textAlign: "right",
//             }}
//           >
//             {project.completion} completed
//           </Typography>
//         </Box>
//       </ListItemButton>
//     </Box>
//   </ListItem>
// ))}

//             </List>
//           </Box>
//         </Grid>
//       </Grid>
//     </Paper>
//   );
// };

// export default Project;

import React, { useState } from "react";
import {
  Paper,
  Grid,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Box,
  LinearProgress,
  Button,
  Stack,
  IconButton,
} from "@mui/material";
import { keyframes } from "@emotion/react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AnimatedProgressBar from "./animation/animationProgressbar";
import ProjectDialog from "./DialogBoxes/createProject";
import ModifyProjectDialog from "./DialogBoxes/modifyProject";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Project = () => {
  const [open,onClose] = useState(false);
  const[modifyproject,setModifyProject]=useState(false);
  const projects = [
    { name: "Ncl Lead Ingestion", completion: "98" },
    { name: "Marketing Dashboard", completion: "88" },
    { name: "Sales Analysis Tool", completion: "78" },
    { name: "Customer CRM", completion: "93" },
    { name: "Data Sync Engine", completion: "67" },
    { name: "User Behavior Tracker", completion: "85" },
    { name: "AI Chatbot Dev", completion: "72" },
  ];

  const user = JSON.parse(localStorage.getItem('user'));
  console.log("user",user);
  const handleModify = (name) => {
    // alert(`Modify ${name}`);
    setModifyProject(true);
  };

  const handleDelete = (name) => {
    alert(`Delete ${name}`);
  };

  const handleCreateProject = () => {
    console.log("Create New Project");
    onClose(true);
  };

  return (
    <Paper
      elevation={4}
      sx={{
        height: "100vh",
        width: "100vw",
        m: 0,
        p: 0,
        borderRadius: 0,
        background: "linear-gradient(to right, #a4ebdf, #FFF9C4)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        animation: `${fadeIn} 1.5s ease-in-out`,
      }}
    >
      <Grid
        container
        sx={{
          height: "90%",
          width: "90%",
          boxShadow: 3,
          borderRadius: 4,
          overflow: "hidden",
        }}
      >
        {/* Left Side - Welcome */}
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            background: "#020316ff",
            color: "white",
            p: 6,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            animation: `${fadeIn} 2s`,
            width: "50%",
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontFamily: "monospace",
              fontWeight: "bold",
              mb: 2,
              textShadow: "2px 2px 4px #000",
            }}
          >
            Welcome
          </Typography>
          <Typography
            variant="h4"
            sx={{
              fontFamily: "cursive",
              animation: `${fadeIn} 2.5s ease-in-out`,
              textShadow: "1px 1px 3px #000",
            }}
          >
            {user ? user.name : "Guest User"}
          </Typography>
        </Grid>

        {/* Right Side - Projects */}
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            background: "linear-gradient(to bottom, #e6c890, #1976D2)",
            color: "white",
            p: 4,
            animation: `${fadeIn} 2s`,
            overflowY: "auto",
            width: "50%",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontFamily: "sans-serif",
              fontWeight: "bold",
              mb: 3,
              textAlign: "center",
              textShadow: "1px 1px 3px #000",
            }}
          >
            Projects
          </Typography>

          <Box
            sx={{
              maxHeight: "65vh",
              overflowY: "auto",
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              p: 1,
              borderRadius: 2,
            }}
          >
            <List>
              {projects.map((project, index) => (
                <ListItem key={index} disablePadding sx={{ mb: 2 }}>
                  <Box sx={{ width: "100%" }}>
                    <ListItemButton
                    onClick={() => console.log(`Clicked on ${project.name}`)}
                      sx={{
                        backgroundColor: "white",
                        borderRadius: 2,
                        flexDirection: "column",
                        alignItems: "flex-start",
                        p: 2,
                        "&:hover": {
                          backgroundColor: "#BBDEFB",
                        },
                      }}
                    >
                      <Typography
                        sx={{
                          fontWeight: "bold",
                          color: "#303f9f",
                          mb: 1,
                          fontSize: "1.1rem",
                        }}
                      >
                        {project.name}
                      </Typography>

                      {/* Progress Bar */}
                     
                      <Box sx={{ width: "100%" }}>
                        <AnimatedProgressBar target={project.completion} />
                      </Box>

                      {/* Modify & Delete Buttons */}
                      <Stack
                        direction="row"
                        spacing={2}
                        sx={{ mt: 2, alignSelf: "flex-end" }}
                      >
                        <Button
                          variant="contained"
                          size="small"
                          color="primary"
                          onClick={() => handleModify(project.name)}
                          startIcon={<EditIcon fontSize="inherit" />}
                        >
                          Modify
                        </Button>
                        <Button
                          variant="outlined"
                          size="small"
                          color="error"
                          onClick={() => handleDelete(project.name)}
                          startIcon={<DeleteIcon fontSize="inherit" />}
                        >
                          Delete
                        </Button>
                      </Stack>
                    </ListItemButton>
                  </Box>
                </ListItem>
              ))}
            </List>
          </Box>

          {/* Create New Project Button */}
          <Box sx={{ mt: 4, textAlign: "center" }}>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleCreateProject}
              sx={{
                fontWeight: "bold",
                px: 4,
                py: 1,
                textTransform: "none",
                backgroundColor: "#7b1fa2",
                "&:hover": {
                  backgroundColor: "#9c27b0",
                },
              }}
            >
              ➕ Create New Project
            </Button>
          </Box>
        </Grid>
      </Grid>
      <ProjectDialog open={open} onClose={onClose} onSubmit={(data) => console.log(data)} />
      <ModifyProjectDialog open={modifyproject} onClose={setModifyProject} onSubmit={(data) => console.log(data)} />
    </Paper>
  );
};

export default Project;

// export default Project;
