import { configureStore } from '@reduxjs/toolkit';
import kanbanReducer from '../slice/kanbanSlice';

export const store = configureStore({
  reducer: {
    kanban: kanbanReducer,
  },
});
