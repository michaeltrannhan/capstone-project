import { Typography } from "@mui/material";
import React from "react";
import { Create, Form, TextInput } from "react-admin";

type Props = {};

const PatientCreate = () => {
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
      sadasdasd
    </Create>
  );
};

export default PatientCreate;
