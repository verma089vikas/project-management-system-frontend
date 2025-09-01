"use client";
import React, { useEffect } from "react";
import { Avatar, Grid, Typography, Box, Container, Paper } from "@mui/material";
import { deepPurple, teal, orange, blue } from "@mui/material/colors";
import { useRouter } from "next/navigation";
import { fetchUsers } from "../slice/userSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

// const users = [
//   { name: "Alice", role: "Admin", color: deepPurple[500] },
//   { name: "Bob", role: "Developer", color: teal[500] },
//   { name: "Charlie", role: "Developer", color: orange[500] },
//   { name: "Diana", role: "Admin", color: blue[500] },
// ];

// const users = [
//   {
//     id: 2,
//     name: "Admin",
//     email: "admin@example.com",
//     role: "ADMIN",
//     color: deepPurple[500],
//   },
//   {
//     id: 3,
//     name: "Vikas",
//     email: "vikas@example.com",
//     role: "DEVELOPER",
//     color: teal[500],
//   },
//   {
//     id: 4,
//     name: "Rahul",
//     email: "rahul@example.com",
//     role: "DEVELOPER",
//     color: orange[500],
//   },
//   {
//     id: 5,
//     name: "Madhu",
//     email: "madhu@example.com",
//     role: "DEVELOPER",
//     color: blue[500],
//   },
// ];
const colors = [deepPurple[500], teal[500], orange[500], blue[500], "#FF5722", "#4CAF50", "#2196F3", "#9C27B0"];
const ProfilesPage = () => {
  const router = useRouter();

 const { users, loading, error } = useSelector(state => state.users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleClick = (user) => {
    console.log(user);
    localStorage.setItem("user", JSON.stringify(user));
    router.push("/projects"); // Navigate to user profile page
  };
  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #141e30, #243b55)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 4,
      }}
    >
      <Container maxWidth="md">
        <Typography
          variant="h4"
          align="center"
          color="white"
          gutterBottom
          sx={{ mb: 4 }}
        >
          Who's using ?
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          {users.map((user, index) => (
            <Grid item xs={6} sm={4} md={3} key={index}>
              <Paper
                onClick={() => handleClick(user)}
                elevation={6}
                sx={{
                  backgroundColor: "rgba(255,255,255,0.08)",
                  padding: 2,
                  borderRadius: 3,
                  textAlign: "center",
                  color: "white",
                  transition: "transform 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.08)",
                    cursor: "pointer",
                  },
                }}
              >
                <Avatar
                  sx={{
                    bgcolor: colors[index % colors.length],
                    width: 80,
                    height: 80,
                    margin: "auto",
                    fontSize: 32,
                  }}
                >
                  {user.name.charAt(0)}
                </Avatar>
                <Typography variant="h6" sx={{ mt: 1 }}>
                  {user.name}
                </Typography>
                <Typography variant="body2" sx={{ color: "gray.300" }}>
                  {user.role}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default ProfilesPage;
