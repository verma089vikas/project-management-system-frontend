"use client";

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTask, deleteTask, editTask, moveTask } from "../slice/kanbanSlice";

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from "@dnd-kit/core";

import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { Box, Paper, Typography, Button, TextField, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import SortableTask from "./SortableTask"; // We'll create this below

const statuses = ["todo", "in-progress", "done"];

// Allowed moves map
const allowedMoves = {
  todo: ["in-progress"],
  "in-progress": ["done"],
  done: [],
};

export default function Tasks() {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.kanban.tasks);

  const [newTaskName, setNewTaskName] = useState("");
  const [editId, setEditId] = useState(null);
  const [editValue, setEditValue] = useState("");

  // For drag overlay display
  const [activeId, setActiveId] = useState(null);

  // Setup sensors for mouse/touch/keyboard
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Group tasks by status for rendering
  const groupedTasks = statuses.reduce((acc, status) => {
    acc[status] = tasks.filter((task) => task.status === status);
    return acc;
  }, {});

  // Handlers

  // Create new task (always todo)
  const handleCreate = () => {
    if (!newTaskName.trim()) return;
    dispatch(
      addTask({
        name: newTaskName.trim(),
        status: "todo",
        priority: "low",
      })
    );
    setNewTaskName("");
  };

  // Edit task name
  const handleEdit = (id) => {
    if (!editValue.trim()) return;
    dispatch(editTask({ id, name: editValue }));
    setEditId(null);
    setEditValue("");
  };

  // Handle drag start to set active task id
  const handleDragStart = ({ active }) => {
    setActiveId(active.id);
  };

  // Handle drag end
  const handleDragEnd = ({ active, over }) => {
    setActiveId(null);

    if (!over) return;

    // active.id = dragged task id
    // over.id = the task (or droppable) over which the item was dropped

    // Find dragged task & target task
    const draggedTask = tasks.find((t) => t.id === active.id);
    if (!draggedTask) return;

    // Determine source and destination statuses
    const sourceStatus = draggedTask.status;

    // If dropped on a task, get its status
    let destStatus = null;
    let destIndex = -1;

    // Find which column the drop target belongs to and index
    for (const status of statuses) {
      const list = groupedTasks[status];
      const foundIndex = list.findIndex((t) => t.id === over.id);
      if (foundIndex !== -1) {
        destStatus = status;
        destIndex = foundIndex;
        break;
      }
    }

    if (!destStatus) {
      // Dropped outside a task (maybe empty space), ignore
      return;
    }

    // Disallow invalid moves:

    // Can't move if destStatus === sourceStatus and dropped in same position
    if (sourceStatus === destStatus && active.id === over.id) return;

    // Validate allowed moves (todo -> in-progress, in-progress -> done)
    const allowedDest = allowedMoves[sourceStatus];
    if (!allowedDest.includes(destStatus) && sourceStatus !== destStatus) return;

    // If moving within same column: reorder tasks in that column
    if (sourceStatus === destStatus) {
      const currentTasks = groupedTasks[sourceStatus];
      const oldIndex = currentTasks.findIndex((t) => t.id === active.id);
      const newIndex = destIndex;

      if (oldIndex !== newIndex) {
        const newOrder = arrayMove(currentTasks, oldIndex, newIndex);
        // Dispatch reorder action
        dispatch(
          moveTask({
            id: active.id,
            sourceStatus,
            destStatus,
            sourceIndex: oldIndex,
            destIndex: newIndex,
          })
        );
      }
      return;
    }

    // Moving across columns (todo -> in-progress or in-progress -> done)

    // Insert dragged task at destIndex in destStatus column
    dispatch(
      moveTask({
        id: active.id,
        sourceStatus,
        destStatus,
        sourceIndex: groupedTasks[sourceStatus].findIndex((t) => t.id === active.id),
        destIndex,
      })
    );
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
        <TextField
          size="small"
          label="New Task"
          value={newTaskName}
          onChange={(e) => setNewTaskName(e.target.value)}
        />
        <Button variant="contained" onClick={handleCreate}>
          Add Task
        </Button>
      </Box>

      <Box sx={{ display: "flex", gap: 2 }}>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          {statuses.map((status) => {
            const tasksInStatus = groupedTasks[status];
            const ids = tasksInStatus.map((t) => t.id);

            return (
              <Paper
                key={status}
                sx={{
                  width: 300,
                  minHeight: 400,
                  p: 2,
                  bgcolor: "#f5f5f5",
                  flexShrink: 0,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Typography variant="h6" sx={{ mb: 2 }}>
                  {status.toUpperCase()}
                </Typography>

                <SortableContext
                  items={ids}
                  strategy={verticalListSortingStrategy}
                >
                  {tasksInStatus.map((task, index) => (
                    <SortableTask
                      key={task.id}
                      id={task.id}
                      task={task}
                      editId={editId}
                      setEditId={setEditId}
                      editValue={editValue}
                      setEditValue={setEditValue}
                      handleEdit={handleEdit}
                      dispatch={dispatch}
                    />
                  ))}
                </SortableContext>
              </Paper>
            );
          })}

          <DragOverlay>
            {activeId ? (
              <Paper
                sx={{
                  p: 1,
                  bgcolor: "white",
                  boxShadow: 3,
                  width: 280,
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <Typography>
                  {tasks.find((t) => t.id === activeId)?.name || ""}
                </Typography>
              </Paper>
            ) : null}
          </DragOverlay>
        </DndContext>
      </Box>
    </Box>
  );
}

