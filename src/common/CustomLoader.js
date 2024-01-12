import React from "react";
import { CircularProgress } from "@material-ui/core";

const CustomLoader = ({ style, size = 40 }) => {
  return (
    <CircularProgress
      style={{
        margin: "auto",
        color: "var(--progress-color)",
        height: `${size}px`,
        width: `${size}px`,
        ...style,
      }}
      thickness={5}
    />
  );
};

export default CustomLoader;
