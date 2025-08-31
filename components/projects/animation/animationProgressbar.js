import { LinearProgress, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

const AnimatedProgressBar = ({ target }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const value = parseInt(target);
    const interval = setInterval(() => {
      setProgress((old) => {
        if (old >= value) {
          clearInterval(interval);
          return value;
        }
        return old + 1;
      });
    }, 10); // Adjust speed here
    return () => clearInterval(interval);
  }, [target]);

  return (
    <>
      <LinearProgress
        variant="determinate"
        value={progress}
        sx={{
          height: 10,
          borderRadius: 5,
          backgroundColor: "#e0e0e0",
          "& .MuiLinearProgress-bar": {
            backgroundColor: "#3f51b5",
          },
        }}
      />
      <Typography
        sx={{
          mt: 1,
          fontSize: "0.85rem",
          color: "#555",
          textAlign: "right",
        }}
      >
        {progress}% completed
      </Typography>
    </>
  );
};
export default AnimatedProgressBar; 
