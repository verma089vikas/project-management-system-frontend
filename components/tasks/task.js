"use client";

import { useEffect, useState } from "react";
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

import {
  Box,
  Paper,
  Typography,
  Button,
  TextField,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import SortableTask from "./Sortabletask"; // We'll create this below
import TaskDialog from "../projects/DialogBoxes/createTask";
import { fetchTasks, updateTaskStatus } from "../slice/taskSlice";

const statuses = ["TODO", "IN_PROGRESS", "DONE"];

// Allowed moves map
const allowedMoves = {
TODO: ["IN_PROGRESS"],
  "IN_PROGRESS": ["DONE"],
  DONE: [],
};

export default function Tasks() {
  const dispatch = useDispatch();
  const {tasks} = useSelector((state) => state.tasks);

  const [newTaskName, setNewTaskName] = useState("");
  const [editId, setEditId] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [open, onClose] = useState(false);
  const [selectedAction, setSelectedAction] = useState(null);
  const projectDetails= JSON.parse(localStorage.getItem("project"));
  useEffect(()=>{
    dispatch(fetchTasks(projectDetails.id));
  },[])
  const [form, setForm] = useState({
    id:"",
    title: "",
    description: "",
    status: "TODO",
    priority: "LOW",
    estimatedHours: "",
    projectId: projectDetails.id,
    assigneeId: "",
  });


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
        status: "TODO",
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

    // Validate allowed moves (todo -> IN_PROGRESS, IN_PROGRESS -> DONE)
   
    const allowedDest = allowedMoves[sourceStatus];
    if (!allowedDest.includes(destStatus) && sourceStatus !== destStatus)
      return;

    // If moving within same column: reorder tasks in that column
    if (sourceStatus === destStatus) {
      const currentTasks = groupedTasks[sourceStatus];
      const oldIndex = currentTasks.findIndex((t) => t.id === active.id);
      const newIndex = destIndex;
      

      if (oldIndex !== newIndex) {
        const newOrder = arrayMove(currentTasks, oldIndex, newIndex);
        // Dispatch reorder action
        // dispatch(
        //   moveTask({
        //     id: active.id,
        //     sourceStatus,
        //     destStatus,
        //     sourceIndex: oldIndex,
        //     destIndex: newIndex,
        //   })
        // );
        const body={
          status:destStatus,
          id:active.id
        }
        
       dispatch(updateTaskStatus(body)).then(()=>dispatch(fetchTasks(projectDetails.id)))
      }
      return;
    }

    // Moving across columns (todo -> IN_PROGRESS or IN_PROGRESS -> DONE)
    // Insert dragged task at destIndex in destStatus column
    const body={
          status:destStatus,
          id:active.id
        }
        
       dispatch(updateTaskStatus(body)).then((res)=>
       {
        if(res.meta.requestStatus==="fulfilled")
        dispatch(fetchTasks(projectDetails.id))
      }
      )
    // dispatch(
    //   moveTask({
    //     id: active.id,
    //     sourceStatus,
    //     destStatus,
    //     sourceIndex: groupedTasks[sourceStatus].findIndex(
    //       (t) => t.id === active.id
    //     ),
    //     destIndex,
    //   })
    // );
  };
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        bgcolor: "#eaeff1",
      }}
    >
      <Paper
        elevation={10}
        sx={{
          height: "95vh",
          width: "80vw",
          m: 2,
          borderRadius: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "#b7dee7ff",
        }}
      >
        <Typography
          variant="h4"
          sx={{ p: 2, fontWeight: "bold", color: "#424242" }}
        >
          Task Management
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            variant="h5"
            sx={{ p: 2, fontWeight: "bold", color: "#1021b9ff" }}
          >
            Project - {projectDetails?.name}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() =>{
              setSelectedAction("create"); 
              onClose(true)}}
            sx={{ m: 2, height: 30 }}
          >
            Create Task
          </Button>
        </Box>

        <Box
          sx={{
            flex: 1,
            display: "flex",
            gap: 2,
            overflowX: "auto",
            p: 2,
          }}
        >
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          >
            {statuses.map((status) => {
              const tasksInStatus = groupedTasks[status];
              const ids = tasksInStatus.map((t) => t.id);

              const columnColors = {
                TODO: "#fff3e0", // light orange
                IN_PROGRESS: "#e3f2fd", // light blue
                DONE: "#e8f5e9", // light green
              };

              return (
                <Paper
                  key={status}
                  sx={{
                    width: 320,
                    minWidth: 300,
                    flexShrink: 0,
                    p: 2,
                    bgcolor: columnColors[status],
                    borderRadius: 2,
                    boxShadow: 3,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      textTransform: "uppercase",
                      mb: 2,
                      fontWeight: "bold",
                      color: "#424242",
                    }}
                  >
                    {status.replace("_", " ")}
                  </Typography>

                  <SortableContext
                    items={ids}
                    strategy={verticalListSortingStrategy}
                  >
                    {tasksInStatus.map((task) => (
                      <SortableTask
                        key={task.id}
                        id={task.id}
                        task={task}
                        editId={editId}
                        setEditId={setEditId}
                        editValue={editValue}
                        handleCreate={handleCreate}
                        setEditValue={setEditValue}
                        handleEdit={handleEdit}
                        dispatch={dispatch}
                        form={form}
                        setForm={setForm}
                        open={open}
                        onClose={onClose}
                        setSelectedAction={setSelectedAction}
                      />
                    ))}
                  </SortableContext>
                </Paper>
              );
            })}

            {/* Drag Overlay Styling */}
            <DragOverlay>
              {activeId ? (
                <Paper
                  sx={{
                    p: 1,
                    bgcolor: "white",
                    boxShadow: 5,
                    width: 280,
                    borderRadius: 1,
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
        <TaskDialog
          open={open}
          onClose={onClose}
          initialData={null}
          onSave={(task) => dispatch(addTask(task))}
          form={form}
          setForm={setForm}
          selectedAction={selectedAction}
        />
      </Paper>
    </Box>
  );
}
