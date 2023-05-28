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
import { type } from "os";
import api, { getAuthorizationHeader } from "../../services";

import axios from "axios";
import { useNotify } from "react-admin";
interface AccountProfileProps {
  profile: Profile;
  // loading: boolean;
}

export const AccountProfile = (props: AccountProfileProps) => {
  const [selectedImage, setSelectedImage] = React.useState<string>(
    props.profile.attachment?.filePath ? props.profile.attachment.filePath : ""
  );
  const notify = useNotify();
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedImage(URL.createObjectURL(e.target.files[0]));
      const formData = new FormData();
      formData.append("file", e.target.files[0]);
      notify("Uploading profile picture", { type: "info" });
      api
        .post(`attachments/upload/${props.profile.id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          localStorage.setItem("avatar", res.data.downloadUrl);
          notify("Profile picture updated", { type: "success" });
        })
        .catch((err) => {
          notify("Profile picture update failed", { type: "error" });
        });
    }
  };
  React.useEffect(() => {
    return () => URL.revokeObjectURL(selectedImage);
  }, [selectedImage]);
  if (!props.profile.attachment) return <CircularProgress />;
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
            src={selectedImage}
            sx={{
              height: 240,
              mb: 2,
              width: 240,
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
        <Button
          // type="submit"
          sx={{
            color: "#00C2CB",
            textAlign: "center",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "20px",
          }}
          component="label"
          fullWidth
          aria-label="upload-button">
          Change Avatar
          <input
            aria-label="upload picture"
            accept="image/png, image/jpeg, image/jpg"
            type="file"
            name="file"
            hidden
            onChange={handleImageChange}
          />
        </Button>
      </CardActions>
    </Card>
  );
};
