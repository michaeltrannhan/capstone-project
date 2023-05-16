import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Box,
  Card,
  Divider,
  IconButton,
  ListItem,
  ListItemText,
  Modal,
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
  const [openPlan, setOpenPlan] = React.useState<boolean>(false);
  const handlePlanOpen = () => setOpenPlan(true);
  const handlePlanClose = () => setOpenPlan(false);
  return (
    <Modal
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description">
      <Card
        sx={{
          position: "absolute" as "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 1080,
          bgcolor: "background.paper",
          border: "1px solid #00C2CB",
          borderRadius: "20px",
          p: 4,
        }}>
      
        {props.children}
      </Card>
    </Modal>
  );
};

export default CustomModal;
