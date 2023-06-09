import { Alert, Typography } from "@mui/material";
import Head from "next/head";
import React from "react";
import {
  Create,
  DateInput,
  Form,
  SaveButton,
  SelectInput,
  TextInput,
  useCreate,
  useNotify,
  useRedirect,
} from "react-admin";

const PatientCreate = () => {
  const [create, { error }] = useCreate();
  const redirect = useRedirect();
  const notify = useNotify();
  const patientCreate = (data: any) => {
    // console.log(data);
    create("patients", { data });
    if (error) {
      return notify(
        <Alert severity="error">
          <>Error creating account: {error}</>
        </Alert>
      );
    }
    redirect("list", "patients");
    notify(<Alert severity="success">New patient added</Alert>);
  };
  return (
    <>
      <Head>
        <title>Create Patient</title>
      </Head>
      <Create
        redirect="list"
        sx={{
          padding: "10px",
          // marginTop: "5%",
          marginBottom: "10px",
          alignItems: "center",
          // textAlign: "center",
          width: "40%",
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
        <Form onSubmit={patientCreate}>
          <Typography variant="h3" align="center">
            Create a patient account
          </Typography>
          <br />
          <TextInput
            variant="outlined"
            label="Phone Number"
            source="phoneNumber"
            required
            fullWidth
          />
          <TextInput
            variant="outlined"
            label="First Name"
            source="firstName"
            required
            fullWidth
          />
          <TextInput
            variant="outlined"
            label="Last Name"
            source="lastName"
            required
            fullWidth
          />
          <TextInput
            variant="outlined"
            source="address"
            label="Address"
            required
            fullWidth
          />
          <SelectInput
            source="gender"
            choices={[
              { id: "MALE", name: "Male" },
              { id: "FEMALE", name: "Female" },
              { id: "OTHER", name: "Other" },
            ]}
          />
          <TextInput
            variant="outlined"
            source="socialSecurityNumber"
            label="SSN"
            fullWidth
          />
          <TextInput
            variant="outlined"
            source="nationality"
            label="Nationality"
            fullWidth
          />
          <DateInput
            variant="outlined"
            source="birthday"
            label="Birthday"
            parse={(value) => new Date(value).toISOString()}
            fullWidth
          />
          <SaveButton />
        </Form>
      </Create>
    </>
  );
};

export default PatientCreate;
