// import { createSlice, nanoid } from '@reduxjs/toolkit';

// const initialState = {
//   tasks: [
//     { id: 'task-1', name: 'Setup project', status: 'todo', priority: 'high' },
//     { id: 'task-2', name: 'Design UI', status: 'todo', priority: 'medium' },
//     { id: 'task-3', name: 'Build components', status: 'in-progress', priority: 'low' },
//   ],
//   columns: ['todo', 'in-progress', 'done'],
// };

// const kanbanSlice = createSlice({
//   name: 'kanban',
//   initialState,
//   reducers: {
//     addTask: {
//       reducer: (state, action) => {
//         state.tasks.push(action.payload);
//       },
//       prepare: ({ name, status = 'todo', priority = 'medium' }) => {
//         return {
//           payload: {
//             id: nanoid(),
//             name,
//             status,
//             priority,
//           },
//         };
//       },
//     },

//     deleteTask: (state, action) => {
//       const id = action.payload;
//       state.tasks = state.tasks.filter((task) => task.id !== id);
//     },

//     updateTask: (state, action) => {
//       const { id, updates } = action.payload;
//       const task = state.tasks.find((t) => t.id === id);
//       if (task) {
//         Object.assign(task, updates);
//       }
//     },

//     moveTask: (state, action) => {
//       const { id, newStatus } = action.payload;
//       const task = state.tasks.find((t) => t.id === id);
//       if (task) {
//         task.status = newStatus;
//       }
//     },

//     reorderTasks: (state, action) => {
//       const { sourceIndex, destinationIndex, status } = action.payload;

//       // Get tasks in the current column
//       const columnTasks = state.tasks.filter((t) => t.status === status);
//       const taskIds = columnTasks.map((t) => t.id);

//       // Reorder
//       const [removed] = taskIds.splice(sourceIndex, 1);
//       taskIds.splice(destinationIndex, 0, removed);

//       // Update original task array to reflect this new order
//       const reorderedTasks = [];
//       state.tasks.forEach((t) => {
//         if (t.status === status) {
//           reorderedTasks.push(
//             state.tasks.find((x) => x.id === taskIds.shift())
//           );
//         } else {
//           reorderedTasks.push(t);
//         }
//       });

//       state.tasks = reorderedTasks;
//     },
//   },
// });

// export const { addTask, deleteTask, updateTask, moveTask, reorderTasks } = kanbanSlice.actions;
// export default kanbanSlice.reducer;

// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// // Fetch tasks from backend
// export const fetchTasks = createAsyncThunk('kanban/fetchTasks', async () => {
//   const res = await fetch('/api/tasks');
//   return await res.json();
// });

// // Update task status
// export const updateTaskStatus = createAsyncThunk(
//   'kanban/updateTaskStatus',
//   async ({ id, status }) => {
//     await fetch('/api/tasks', {
//       method: 'PATCH',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ id, updates: { status } }),
//     });

//     return { id, status };
//   }
// );

// const kanbanSlice = createSlice({
//   name: 'kanban',
//   initialState: {
//     tasks: [],
//     loading: false,
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchTasks.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchTasks.fulfilled, (state, action) => {
//         state.loading = false;
//         state.tasks = action.payload;
//       })
//       .addCase(fetchTasks.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message;
//       })

//       .addCase(updateTaskStatus.fulfilled, (state, action) => {
//         const { id, status } = action.payload;
//         const task = state.tasks.find(t => t.id === id);
//         if (task) task.status = status;
//       });
//   },
// });

// export default kanbanSlice.reducer;

// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   tasks: [
//     { id: '1', name: 'Design UI', status: 'todo', priority: 'high' },
//     { id: '2', name: 'Setup Redux', status: 'in-progress', priority: 'medium' },
//     { id: '3', name: 'Connect DnD', status: 'done', priority: 'low' },
//   ],
// };

// const kanbanSlice = createSlice({
//   name: 'kanban',
//   initialState,
//   reducers: {
//     moveTask: (state, action) => {
//       const { id, newStatus } = action.payload;
//       const task = state.tasks.find((t) => t.id === id);
//       if (task) task.status = newStatus;
//     },
//   },
// });

// export const { moveTask } = kanbanSlice.actions;
// export default kanbanSlice.reducer;
import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  tasks: [
    { id: "1", name: "Design UI", status: "todo", priority: "high" },
    { id: "2", name: "Setup Redux", status: "in-progress", priority: "medium" },
    { id: "3", name: "Connect DnD", status: "done", priority: "low" },
  ],
};

const kanbanSlice = createSlice({
  name: "kanban",
  initialState,
  reducers: {
    addTask: {
      reducer: (state, action) => {
        state.tasks.push(action.payload);
      },
      prepare: ({ name, status, priority }) => ({
        payload: {
          id: nanoid(),
          name,
          status,
          priority,
        },
      }),
    },

    moveTask: (state, action) => {
      const { id, sourceStatus, destStatus, sourceIndex, destIndex } = action.payload;

      // Get the task to move
      const taskToMove = state.tasks.find((t) => t.id === id);
      if (!taskToMove) return;

      const sourceTasks = state.tasks.filter((t) => t.status === sourceStatus && t.id !== id);
      const destTasks = state.tasks.filter((t) => t.status === destStatus);

      // If moving within same column → reorder
      if (sourceStatus === destStatus) {
        const columnTasks = [...destTasks];
        const [removed] = columnTasks.splice(sourceIndex, 1);
        columnTasks.splice(destIndex, 0, removed);

        // Rebuild full task list
        const newTasks = state.tasks.filter((t) => t.status !== sourceStatus);
        state.tasks = [...newTasks, ...columnTasks];
        return;
      }

      // Moving across columns → update status and insert into destination
      taskToMove.status = destStatus;

      // Insert at destination index
      const insertAt = Math.max(0, Math.min(destIndex, destTasks.length));
      destTasks.splice(insertAt, 0, taskToMove);

      // Rebuild task list: exclude moved task from old column, insert into new column
      const newTasks = state.tasks.filter((t) => t.id !== id && t.status !== destStatus);
      state.tasks = [...newTasks, ...destTasks];
    },

    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((t) => t.id !== action.payload);
    },

    editTask: (state, action) => {
      const { id, name } = action.payload;
      const task = state.tasks.find((t) => t.id === id);
      if (task) {
        task.name = name;
      }
    },
  },
});

export const { addTask, moveTask, deleteTask, editTask } = kanbanSlice.actions;
export default kanbanSlice.reducer;
