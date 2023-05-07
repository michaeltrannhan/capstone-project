import React from "react";
import { useParams, useNavigate } from "react-router-dom";

import {
  useGetOne,
  useUpdate,
  Title,
  SimpleForm,
  TextInput,
  SelectInput,
  RichTextField,
  Form,
  DateInput,
  SaveButton,
  Create,
} from "react-admin";
import { Card, Grid, Typography } from "@mui/material";
import { RichTextInput } from "ra-input-rich-text";

const MedicationCreate = () => {
  const { id } = useParams();
  return (
    <Create
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
          Create new medication
        </Typography>
        <br />
        Medication UID
        <TextInput
          variant="outlined"
          label="Medication UID"
          source="code"
          fullWidth
        />
        Medication Name
        <TextInput
          variant="outlined"
          label="Medication Name"
          source="name"
          fullWidth
        />
        Medication Description
        <TextInput
          variant="outlined"
          label="Medication Description"
          source="description"
          fullWidth
        />
        <SaveButton />
      </Form>
    </Create>
  );
};

export default MedicationCreate;
