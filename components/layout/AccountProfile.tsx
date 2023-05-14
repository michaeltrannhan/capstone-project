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
  const [imageToUpload, setImageToUpload] = React.useState<File | null>(null);
  const [selectedImage, setSelectedImage] = React.useState<string>(
    props.profile.attachment?.filePath ? props.profile.attachment.filePath : ""
  );
  const notify = useNotify();
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImageToUpload(e.target.files[0]);
      setSelectedImage(URL.createObjectURL(e.target.files[0]));
      const formData = new FormData();
      formData.append("file", e.target.files[0]);
      api
        .post(`attachments/upload/${props.profile.id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
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
        <input
          aria-label="upload picture"
          accept="image/*"
          type="file"
          name="file"
          onChange={handleImageChange}
        />
        {/* <Button
          type="submit"
          sx={{
            color: "#00C2CB",
            textAlign: "center",
            justifyContent: "center",
            alignItems: "center",
          }}
          fullWidth
          aria-label="upload-button">
          Submit
        </Button> */}
      </CardActions>
    </Card>
  );
};
