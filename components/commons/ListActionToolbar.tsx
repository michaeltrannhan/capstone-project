import React from "react";
import { IconButton, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

interface ActionToolbarProps {
  children?: React.ReactNode;
  props: any;
}

const ActionToolbar = ({ children, ...props }: any) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const ITEM_HEIGHT = 48;

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        sx={{
          // padding: 0,
          margin: 0,
        }}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        sx={{ alignItems: "center", display: "flex", padding: 0, margin: 0 }}>
        {children.map((child: any, index: number) => (
          <MenuItem
            key={index}
            onClick={handleClose}
            // id={child.label}
            sx={{
              padding: 0,
              margin: "10px",
            }}>
            {child}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default ActionToolbar;
