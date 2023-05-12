import React from "react";
import { Typography } from "@mui/material";
import { Form, Create, TextInput, SaveButton, Edit } from "react-admin";

const DoctorEdit = () => {
  return (
    <Edit
      redirect="list"
      sx={{
        padding: "20px",
        marginTop: "5%",
        marginBottom: "10px",
        alignItems: "center",
        // textAlign: "center",
        width: "70%",
        flexDirection: "column",
        justifyContent: "center",
        alignContent: "center",
        justifyItems: "center",
        alignSelf: "center",
        "& .RaCreate-card	": {
          border: "1px solid rgba(224, 224, 224, 1)",
          borderRadius: "12px",
          padding: "24px",
        },
      }}>
      <Form>
        <Typography variant="h3" align="center">
          Edit Doctor Information
        </Typography>
        <br />
        <TextInput
          variant="outlined"
          label="Doctor First Name"
          source="firstName"
          fullWidth
        />
        <TextInput
          variant="outlined"
          label="Doctor Last Name"
          source="lastName"
          fullWidth
        />
        <TextInput
          variant="outlined"
          label="Doctor Email"
          source="email"
          fullWidth
        />
        <SaveButton />
      </Form>
    </Edit>
  );
};

export default DoctorEdit;
