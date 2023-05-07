import { Typography } from "@mui/material";
import React from "react";
import DebouncedInput from "../form-components/DebouncedInput";
import { getAuthorizationHeader } from "../../services";

export default function Dashboard() {
  return (
    <>
      <Typography>
        This is the dashboard! As empty as my ideas for this project.
      </Typography>

      {/* {localStorage.getItem("auth")} */}
      <Typography
        variant="h4"
        sx={{
          wordBreak: "break-word",
        }}>
        {getAuthorizationHeader()}
      </Typography>
    </>
  );
}
