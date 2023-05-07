import React from "react";
import {
  DateField,
  ImageField,
  Show,
  SimpleShowLayout,
  TextField,
  useRecordContext,
} from "react-admin";
import CustomShow from "../commons/customShow";
import {
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Typography,
} from "@mui/material";

const DoctorShow = () => {
  return (
    <CustomShow title="Doctor Show">
      {/* <SimpleShowLayout> */}
      <Card
        sx={{
          // maxWidth: "345px",
          justifyContent: "center",
          justifyItems: "center",
          textAlign: "center",
        }}>
        <CardActionArea
          sx={{
            textAlign: "center",
          }}>
          <CardMedia>
            <ImageField source="attachment.filePath" title="Image file path" />
          </CardMedia>
          <CardContent>
            <SimpleShowLayout>
              <TextField source="id" />
              <TextField source="code" />
              <TextField source="firstName" />
              <TextField source="lastName" />
              <TextField source="operatorAccount.username" />
              <DateField source="createdAt" />
              <DateField source="updatedAt" />
            </SimpleShowLayout>
          </CardContent>
        </CardActionArea>
      </Card>

      {/* </SimpleShowLayout> */}
    </CustomShow>
  );
};

export default DoctorShow;
