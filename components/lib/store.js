import { configureStore } from "@reduxjs/toolkit";
import kanbanReducer from "../slice/kanbanSlice";
import usersReducer from "../slice/userSlice";
import projectReducer from "../slice/projectSlice";
export const store = configureStore({
  reducer: {
    kanban: kanbanReducer,
    users: usersReducer,
    projects: projectReducer,
  },
});
