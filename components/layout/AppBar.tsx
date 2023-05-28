import React from "react";
import {
  AppBar,
  AppBarProps,
  Logout,
  UserMenu,
  useUserMenu,
  Toolbar,
  useGetIdentity,
  RefreshButton,
  LogoutProps,
  MenuItemLink,
  Title,
  useRedirect,
} from "react-admin";
import { Link } from "react-router-dom";
import {
  Avatar,
  Box,
  Button,
  IconButton,
  MenuItem,
  Tooltip,
  Typography,
  Menu,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import logo from "../../assets/images/logo.png";
import Image from "next/image";

import { faSignOut, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CustomLogoutButton = (props: LogoutProps) => {
  return (
    <Logout
      {...props}
      sx={{
        borderRadius: "20px",
      }}
      icon={<FontAwesomeIcon icon={faSignOut} color="#00C2CB" size="lg" />}
    />
  );
};

const Logo = () => (
  <Image src={logo} width={32} height={32} alt="MediReminder" />
);

const CustomAppBar = (props: AppBarProps) => {
  const redirect = useRedirect();
  return (
    <AppBar
      {...props}
      sx={{
        color: "black",
        background: "#F9FAFB",
        "& .RaAppBar-toolbar": { color: "#00C2CB" },
      }}
      userMenu={
        <UserMenu>
          <MenuItemLink
            sx={{
              borderRadius: "20px",
              "&.RaMenuItemLink-active": {
                border: "none",
                backgroundColor: "white",
              },
              "& .RaMenuItemLink-icon": {
                color: "#00C2CB",
              },
            }}
            to="/profile"
            primaryText="Profile"
            leftIcon={<FontAwesomeIcon icon={faUser} size="lg" />}
          />
          <CustomLogoutButton />
        </UserMenu>
      }>
      <Box display="flex" alignItems="center">
        <Button
          sx={{
            textTransform: "none",
            "&:hover": {
              backgroundColor: "#fff",
            },
          }}
          variant="text"
          onClick={() => {
            redirect("/");
          }}>
          <Logo />
          <Typography
            variant="h6"
            sx={{
              color: "#00C2CB",

              fontSize: "12px",
            }}>
            MediReminder
          </Typography>
        </Button>
      </Box>
      <Box component="span" flex={1} />
      <Box component="span" flex={1} />
    </AppBar>
  );
};

export default CustomAppBar;
