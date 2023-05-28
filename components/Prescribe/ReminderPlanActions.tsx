import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, IconButton, Divider, Tooltip } from "@mui/material";
import React from "react";

type Props = {
  editHandler: () => void;
  deleteHandler: () => void;
};

const ReminderPlanActions = (props: Props) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        width: "fit-content",
        bgcolor: "background.paper",
        color: "text.secondary",
        borderRadius: "5px",
      }}>
      <Tooltip title="Edit Reminder Plan" placement="top-start">
        <IconButton
          edge="start"
          aria-label="edit"
          onClick={props.editHandler}
          sx={{
            "&:hover": {
              color: "#00C2CB",
              borderRadius: "5px",
            },
          }}>
          <FontAwesomeIcon icon={faPenToSquare} />
        </IconButton>
      </Tooltip>
      <Divider orientation="vertical" variant="middle" flexItem />
      <Tooltip title="Delete Reminder Plan" placement="top-start">
        <IconButton
          edge="end"
          aria-label="delete"
          onClick={props.deleteHandler}
          sx={{
            "&:hover": {
              color: "#00C2CB",
              borderRadius: "5px",
            },
          }}>
          <FontAwesomeIcon icon={faTrash} />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default ReminderPlanActions;
