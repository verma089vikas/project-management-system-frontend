// src/features/projects/projectSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const BASE_URL = "http://localhost:8080/api/v1/projects";

// --- ASYNC THUNKS ---

export const fetchProjects = createAsyncThunk(
  "projects/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(BASE_URL);
      if (!res.ok) throw new Error("Failed to fetch projects");
      return await res.json();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
export const fetchProjectByUserId = createAsyncThunk(
  'projects/fetchById',
  async (userId, { rejectWithValue }) => {
    try {
      const res = await fetch(`${BASE_URL}/user/${userId}`);
      if (!res.ok) throw new Error('Failed to fetch project by ID');
      return await res.json();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const createProject = createAsyncThunk(
  "projects/create",
  async (projectData, { rejectWithValue }) => {
    try {
      const res = await fetch(BASE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(projectData),
      });
      if (!res.ok) throw new Error("Failed to create project");
      return await res.json();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const updateProject = createAsyncThunk(
  "projects/update",
  async (body, { rejectWithValue }) => {
    try {
        console.log("hello")
      const res = await fetch(`${BASE_URL}/${body?.id}`, {
        method: "PUT",
       // headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error("Failed to update project");
      return await res.json();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const deleteProject = createAsyncThunk(
  "projects/delete",
  async (id, { rejectWithValue }) => {
    try {
      const res = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete project");
      return id; // Return id so we can remove from state
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// --- SLICE ---

const projectSlice = createSlice({
  name: "projects",
  initialState: {
    projects: [],
    userProjects: [],
    loading: false,
    error: null,
    success: null,
  },
  reducers: {
    clearStatus: (state) => {
      state.loading = false;
      state.error = null;
      state.success = null;
    },
  },
  extraReducers: (builder) => {
    // 📦 Reusable builder function
    const setPending = (state) => {
      state.loading = true;
      state.error = null;
      state.success = null;
    };
    const setRejected = (state, action) => {
      state.loading = false;
      state.error = action.payload || "Something went wrong";
    };

    builder
      // FETCH
      .addCase(fetchProjects.pending, setPending)
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = action.payload;
        state.success = "Fetched successfully";
      })
      .addCase(fetchProjects.rejected, setRejected)

      //FetchuserById
      .addCase(fetchProjectByUserId.pending, setPending)
      .addCase(fetchProjectByUserId.fulfilled, (state, action) => {
        state.loading = false;
        state.userProjects = action.payload;
        state.success = "Project fetched successfully";
      })
      .addCase(fetchProjectByUserId.rejected, setRejected)

      // CREATE
      .addCase(createProject.pending, setPending)
      .addCase(createProject.fulfilled, (state, action) => {
        state.loading = false;
        state.projects.push(action.payload);
        state.success = "Project created successfully";
      })
      .addCase(createProject.rejected, setRejected)

      // UPDATE
      .addCase(updateProject.pending, setPending)
      .addCase(updateProject.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = state.projects.map((p) =>
          p.id === action.payload.id ? action.payload : p
        );
        state.success = "Project updated successfully";
      })
      .addCase(updateProject.rejected, setRejected)

      // DELETE
      .addCase(deleteProject.pending, setPending)
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = state.projects.filter((p) => p.id !== action.payload);
        state.success = "Project deleted successfully";
      })
      .addCase(deleteProject.rejected, setRejected);
  },
});

export const { clearStatus } = projectSlice.actions;
export default projectSlice.reducer;
