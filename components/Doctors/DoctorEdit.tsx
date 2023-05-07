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
          Create new doctor
        </Typography>
        <br />
        Doctor
        <TextInput
          variant="outlined"
          label="Doctor First Name"
          source="firstName"
          fullWidth
        />
        Doctor First Name
        <TextInput
          variant="outlined"
          label="Doctor Last Name"
          source="lastName"
          fullWidth
        />
        Dcotor Last Name
        <TextInput
          variant="outlined"
          label=""
          source=""
          fullWidth
        />
        <SaveButton />
      </Form>
    </Edit>
  );
};

export default DoctorEdit;
