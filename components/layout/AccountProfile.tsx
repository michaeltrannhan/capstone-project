import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { Profile } from "../utils/commons";
interface AccountProfileProps {
  profile: Profile;
  // loading: boolean;
}

export const AccountProfile = (props: AccountProfileProps) => {
  // if (!props.profile.attachment) return <CircularProgress />;
  return (
    <Card>
      <CardContent>
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
          }}>
          <Avatar
            src={
              props.profile.attachment?.filePath
                ? props.profile.attachment.filePath
                : ""
            }
            sx={{
              height: 120,
              mb: 2,
              width: 120,
              borderRadius: props.profile.attachment?.filePath ? "20px" : "50%",
            }}
            variant={
              props.profile.attachment?.filePath ? "square" : "circular"
            }>
            {props.profile.attachment?.filePath
              ? ""
              : props.profile.firstName.charAt(0).toUpperCase() +
                props.profile.lastName.charAt(0).toUpperCase()}
          </Avatar>
          <Typography
            sx={{
              color: "#00C2CB",
            }}
            variant="button">
            User ID : {props.profile.id}
          </Typography>
          <Typography
            gutterBottom
            sx={{
              color: "#00C2CB",
            }}
            variant="h5">
            {props.profile.firstName} {props.profile.lastName}
          </Typography>
          <Typography
            sx={{
              color: "#00C2CB",
            }}
            variant="body1">
            Profile Role:{" "}
            {props.profile.role.name.replace("_", " ").toUpperCase()}
          </Typography>
          <Typography
            color={(theme) => theme.palette.success.darker}
            variant="body2">
            UUID: {props.profile.code}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        <Button fullWidth variant="text">
          Upload picture
        </Button>
      </CardActions>
    </Card>
  );
};
