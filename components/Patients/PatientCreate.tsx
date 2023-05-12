import { Alert, Typography } from "@mui/material";
import Head from "next/head";
import React from "react";
import {
  Create,
  Form,
  SaveButton,
  TextInput,
  useCreate,
  useNotify,
  useRedirect,
} from "react-admin";

type Props = {};

const PatientCreate = () => {
  const [create, { error }] = useCreate();
  const redirect = useRedirect();
  const notify = useNotify();
  const patientCreate = (data: any) => {
    create("auth/patient/register", { data });
    if (error) {
      return notify(<Alert severity="error">New patient added</Alert>);
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
        <Form onSubmit={patientCreate}>
          <Typography variant="h3" align="center">
            Create a patient account
          </Typography>
          <br />
          Patient phone number
          <TextInput
            variant="outlined"
            label="Phone Number"
            source="phoneNumber"
            fullWidth
          />
          Patient Password
          <TextInput
            variant="outlined"
            label="Password"
            source="password"
            fullWidth
            type="password"
          />
          <SaveButton />
        </Form>
      </Create>
    </>
  );
};

export default PatientCreate;
