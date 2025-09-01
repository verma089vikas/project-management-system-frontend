"use client";

import React, { useEffect, useState } from "react";
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
import {
  deleteProject,
  fetchProjectById,
  fetchProjectByUserId,
  fetchProjects,
  fetchProjectsById,
} from "../slice/projectSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { roRO } from "@mui/x-date-pickers/locales";
import { useRouter } from "next/navigation";

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
  const [open, onClose] = useState(false);
  const dispatch = useDispatch();
    const router = useRouter();
  const [modifyproject, setModifyProject] = useState(false);
  const { projects, userProjects } = useSelector((state) => state.projects);
  const [selectedProject,setSelectedProject] = useState(null);

  // const projects = [
  //   { name: "Ncl Lead Ingestion", completion: "98" },
  //   { name: "Marketing Dashboard", completion: "88" },
  //   { name: "Sales Analysis Tool", completion: "78" },
  //   { name: "Customer CRM", completion: "93" },
  //   { name: "Data Sync Engine", completion: "67" },
  //   { name: "User Behavior Tracker", completion: "85" },
  //   { name: "AI Chatbot Dev", completion: "72" },
  // ];

  const user = JSON.parse(localStorage.getItem("user"));

  const handleModify = (project) => {
    setSelectedProject(project);
    // alert(`Modify ${name}`);
    setModifyProject(true);
  };

  useEffect(() => {
    if (user.role === "ADMIN") dispatch(fetchProjects());
    else dispatch(fetchProjectByUserId(user.id));
  }, []);
  const handleDelete = (id) => {
    dispatch(deleteProject(id)).then(()=>{
    if (user.role === "ADMIN") dispatch(fetchProjects());
    else dispatch(fetchProjectByUserId(user.id));
    });  
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
              {((user.role=== "ADMIN")? projects:userProjects)?.map((project, index) => (
                <ListItem key={index} disablePadding sx={{ mb: 2 }}>
                  <Box sx={{ width: "100%" }}>
                    <ListItemButton
                      onClick={() => {
                        localStorage.setItem("project", JSON.stringify(project))
                        router.push("/tasks");
                        }}
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
                        <AnimatedProgressBar target={project.completionPercentage} />
                      </Box>

                      {/* Modify & Delete Buttons */}
                      { user.role === "ADMIN" &&
                      <Stack
                        direction="row"
                        spacing={2}
                        sx={{ mt: 2, alignSelf: "flex-end" }}
                      >
                        <Button
                          variant="contained"
                          size="small"
                          color="primary"
                          onClick={() => handleModify(project)}
                          startIcon={<EditIcon fontSize="inherit" />}
                        >
                          Modify
                        </Button>
                        <Button
                          variant="outlined"
                          size="small"
                          color="error"
                          onClick={() => handleDelete(project.id)}
                          startIcon={<DeleteIcon fontSize="inherit" />}
                        >
                          Delete
                        </Button>
                      </Stack>
              }
                    </ListItemButton>
                  </Box>
                </ListItem>
              ))}
            </List>
          </Box>

          {/* Create New Project Button */}
          { user.role === "ADMIN" &&
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
          }
        </Grid>
      </Grid>
      <ProjectDialog
        open={open}
        onClose={onClose}
        onSubmit={(data) => console.log(data)}
      />
      <ModifyProjectDialog
        open={modifyproject}
        onClose={setModifyProject}
        project={selectedProject}
      />
    </Paper>
  );
};

export default Project;

// export default Project;
