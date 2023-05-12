import React from "react";
import { Typography, Alert } from "@mui/material";
import {
  List,
  TextField,
  EditActions,
  Datagrid,
  usePermissions,
  Create,
  Form,
  SaveButton,
  TextInput,
  useCreate,
  useRedirect,
  useGetIdentity,
} from "react-admin";
import { useLocation } from "react-router-dom";
import { Role, User } from "../utils/commons";
import api from "../../services";
import { useNotify } from "react-admin";
import { type } from "os";

const DoctorCreate = () => {
  const { permissions } = usePermissions();
  const rawAuth = localStorage.getItem("auth");
  const auth = JSON.parse(rawAuth || "");
  const hospitalID = auth.operatorAccount.hospitalId;
  const [create, { error, isLoading }] = useCreate();
  const redirect = useRedirect();
  const notify = useNotify();
  const doctorCreate = (data: any) => {
    create("auth/operator/register", { data });
    if (error) {
      return notify(
        <Alert severity="error">
          An <>{error}</> occured, please try again
        </Alert>
      );
    }
    if (!isLoading) {
      redirect("list", "doctors");
      notify(<Alert severity="success">New doctor added</Alert>);
    }
  };

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
          borderRadius: "20px",
          padding: "24px",
        },
      }}>
      <Form onSubmit={doctorCreate}>
        <Typography variant="h3" align="center">
          Create new doctor account
        </Typography>
        <br />
        First Name
        <TextInput
          variant="outlined"
          label="First Name"
          source="firstName"
          fullWidth
        />
        Last Name
        <TextInput
          variant="outlined"
          label="Last Name"
          source="lastName"
          fullWidth
        />
        Hospital ID
        <TextInput
          variant="outlined"
          label="Hospital ID"
          source="hospitalId"
          value={hospitalID}
          defaultValue={hospitalID}
          disabled
          fullWidth
        />
        Role
        <TextInput
          variant="outlined"
          label="Role"
          source="role"
          fullWidth
          defaultValue="DOCTOR"
          value="DOCTOR"
          disabled
        />
        <SaveButton />
      </Form>
    </Create>
  );
};
export default DoctorCreate;
