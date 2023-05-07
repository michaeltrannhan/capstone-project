import React from "react";
import {
  Edit,
  SimpleForm,
  TextInput,
  DateInput,
  ReferenceManyField,
  Datagrid,
  TextField,
  DateField,
  EditButton,
  required,
  Form,
  SaveButton,
} from "react-admin";
import { Grid } from "@mui/material";
import { RichTextInput } from "ra-input-rich-text";
import { useParams } from "react-router-dom";
type Props = {};

const MedicationEdit = () => {
  const { id } = useParams();
  return (
    <Edit>
      <Form>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextInput source="code" />
          </Grid>
          <Grid item xs={6}>
            <TextInput source="name" />
          </Grid>
          <Grid item xs={12}>
            <RichTextInput source="description" />
          </Grid>
        </Grid>
        <SaveButton />
      </Form>
    </Edit>
  );
};

export default MedicationEdit;
