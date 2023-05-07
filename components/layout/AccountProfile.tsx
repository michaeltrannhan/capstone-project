import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { Profile } from "../utils/commons";

const FileInput = () => {
  const [selectedImage, setSelectedImage] = React.useState(null);
  const [imageUrl, setImageUrl] = React.useState(null);

  React.useEffect(() => {
    if (selectedImage) {
      setImageUrl(URL.createObjectURL(selectedImage));
    }
  }, [selectedImage]);

  return (
    <>
      <input
        accept="image/*"
        type="file"
        id="select-image"
        style={{ display: "none" }}
        onChange={(e) => setSelectedImage(e.target.files[0])}
      />
      <label htmlFor="select-image">
        <Button variant="contained" color="primary" component="span">
          Upload Image
        </Button>
      </label>
      {imageUrl && selectedImage && (
        <Box mt={2} textAlign="center">
          <div>Image Preview:</div>
          <img src={imageUrl} alt={selectedImage.name} height="100px" />
        </Box>
      )}
    </>
  );
};

interface AccountProfileProps {
  profile: Profile;
}

export const AccountProfile = (props: AccountProfileProps) => {
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
          <Typography color="magenta" variant="button">
            User ID : {props.profile.id}
          </Typography>
          <Typography gutterBottom variant="h5">
            {props.profile.firstName} {props.profile.lastName}
          </Typography>
          <Typography color="primary" variant="body1">
            Profile Role:{" "}
            {props.profile.role.name.replace("_", " ").toUpperCase()}
          </Typography>
          <Typography color="secondary" variant="body2">
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
