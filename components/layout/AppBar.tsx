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
    <Logout {...props} icon={<FontAwesomeIcon icon={faSignOut} size="lg" />} />
  );
};

const Logo = () => (
  <Image src={logo} width={32} height={32} alt="MediReminder" />
);

const CustomAppBar = (props: AppBarProps) => {
  const { data, isLoading, error } = useGetIdentity();
  // console.log(data?.id);
  return (
    <AppBar
      {...props}
      sx={{
        color: "black",
        background: "#F9FAFB",
      }}
      userMenu={
        <UserMenu >
          <MenuItemLink
            to="/profile"
            primaryText="Profile"
            leftIcon={<FontAwesomeIcon icon={faUser} size="lg" />}
          />
          <CustomLogoutButton />
        </UserMenu>
      }>
      {/* <Box component="span" flex={1}></Box> */}
      <Logo />
      <Typography variant="h6">MediReminder</Typography>
      <Box component="span" flex={1} />
      <Box component="span" flex={1} />
    </AppBar>
  );
};

export default CustomAppBar;
