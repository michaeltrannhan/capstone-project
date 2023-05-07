import * as React from "react";
import {
  Show,
  SimpleShowLayout,
  TextField,
  DateField,
  RichTextField,
  DeleteButton,
} from "react-admin";

const MedicationShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="code" label="Medication UID" />
      <RichTextField source="name" label="Medication Name" />
      <RichTextField label="Medication Description" source="description" />
    </SimpleShowLayout>
    <DeleteButton />
  </Show>
);
export default MedicationShow;