
import {
  Box,
  Card,
  Divider,
  IconButton,
  ListItem,
  ListItemText,
  Modal,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";

type Props = {
  children?: React.ReactNode;
  open: boolean;
  handleClose: () => void;
  medicationName?: string;
};

const CustomModal = (props: Props) => {
  return (
    <Modal
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description">
      <Paper
        sx={{
          position: "absolute" as "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "1080px",
          bgcolor: "background.paper",
          //   border: "1px solid #00C2CB",
          borderRadius: "20px",
          p: 4,
        }}
        elevation={3}
        >
        {props.children}
      </Paper>
    </Modal>
  );
};

export default CustomModal;
