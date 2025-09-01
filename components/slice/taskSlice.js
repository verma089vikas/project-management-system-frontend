import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Base API URL
const API_URL = "http://localhost:8080/api/v1/tasks"; // ← Replace with real URL

export const fetchTasks = createAsyncThunk(
  "tasks/fetchTasks",
  async (id, thunkAPI) => {
    try {
      const res = await axios.get(`${API_URL}/project/${id}`,{
        method: 'GET',
         headers: { "Content-Type": "application/json" }
      });
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);
export const updateTaskStatus = createAsyncThunk(
  "tasks/updateTaskStatus",
  async (body, thunkAPI) => {
    try {
      const res = await axios.put(`${API_URL}/${body.id}/status?status=${body.status}`,{
        method: 'PUT',
         headers: { "Content-Type": "application/json" }
      });
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const createTask = createAsyncThunk(
  "tasks/createTask",
  async (taskData, thunkAPI) => {
    try {
      const res = await axios.post(API_URL, taskData,{
          headers: { "Content-Type": "application/json" }
      });
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async (taskData, thunkAPI) => {
    try {
      const res = await axios.put(`${API_URL}/${taskData?.id}`,  taskData,{
          headers: { "Content-Type": "application/json" }
      });
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (id, thunkAPI) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      return id;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);


export const createTaskDependency = createAsyncThunk(
  "tasks/createDependency",
  async ({ taskId, dependsOnTaskId }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/api/v1/dependencies?taskId=${taskId}&dependsOnTaskId=${dependsOnTaskId}`,
        {}, // Empty body because params are passed in URL
        { headers: { "Content-Type": "application/json" } }
      );
      return response.data; // TaskDependency object
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to create task dependency"
      );
    }
  }
);

// ------------------
// Initial State
// ------------------

const initialState = {
  tasks: [],
  loading: false,
  error: null,
  dependency: null,

  fetchStatus: {
    loading: false,
    success: false,
    error: null,
  },
  createStatus: {
    loading: false,
    success: false,
    error: null,
  },
  updateStatus: {
    loading: false,
    success: false,
    error: null,
  },
  deleteStatus: {
    loading: false,
    success: false,
    error: null,
  },
};

// ------------------
// Slice
// ------------------

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    resetStatus: (state) => {
      state.createStatus = initialState.createStatus;
      state.updateStatus = initialState.updateStatus;
      state.deleteStatus = initialState.deleteStatus;
    },
  },
  extraReducers: (builder) => {
    builder

      // ───── FETCH TASKS ─────
      .addCase(fetchTasks.pending, (state) => {
        state.fetchStatus = { loading: true, success: false, error: null };
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.fetchStatus = { loading: false, success: true, error: null };
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.fetchStatus = {
          loading: false,
          success: false,
          error: action.payload,
        };
      })

      // ───── CREATE TASK ─────
      .addCase(createTask.pending, (state) => {
        state.createStatus = { loading: true, success: false, error: null };
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.createStatus = { loading: false, success: true, error: null };
        state.tasks.push(action.payload);
      })
      .addCase(createTask.rejected, (state, action) => {
        state.createStatus = {
          loading: false,
          success: false,
          error: action.payload,
        };
      })

      // ───── UPDATE TASK ─────
      .addCase(updateTask.pending, (state) => {
        state.updateStatus = { loading: true, success: false, error: null };
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.updateStatus = { loading: false, success: true, error: null };
        const updated = action.payload;
        const index = state.tasks.findIndex((t) => t.id === updated.id);
        if (index !== -1) {
          state.tasks[index] = updated;
        }
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.updateStatus = {
          loading: false,
          success: false,
          error: action.payload,
        };
      })

      // ───── DELETE TASK ─────
      .addCase(deleteTask.pending, (state) => {
        state.deleteStatus = { loading: true, success: false, error: null };
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.deleteStatus = { loading: false, success: true, error: null };
        state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.deleteStatus = {
          loading: false,
          success: false,
          error: action.payload,
        };
      }) 
      .addCase(createTaskDependency.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTaskDependency.fulfilled, (state, action) => {
        state.loading = false;
        state.dependency = action.payload;
      })
      .addCase(createTaskDependency.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetStatus } = taskSlice.actions;
export default taskSlice.reducer;
