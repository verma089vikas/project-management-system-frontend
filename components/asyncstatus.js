// src/components/AsyncStatus.jsx
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearStatus } from "../slice/projectSlice";

const AsyncStatus = () => {
  const { loading, error, success } = useSelector((state) => state.projects);
  const dispatch = useDispatch();

  if (loading) return <p style={{ color: "blue" }}>Loading...</p>;
  if (error)
    return (
      <div style={{ color: "red" }}>
        Error: {error}{" "}
        <button onClick={() => dispatch(clearStatus())}>Clear</button>
      </div>
    );
  if (success)
    return (
      <div style={{ color: "green" }}>
        {success} <button onClick={() => dispatch(clearStatus())}>Clear</button>
      </div>
    );

  return null;
};

export default AsyncStatus;
