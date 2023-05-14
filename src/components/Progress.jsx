import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function Progress(props) {
  return (
    <Box>
      <CircularProgress color="warning" size={"20px"} />
    </Box>
  );
}
