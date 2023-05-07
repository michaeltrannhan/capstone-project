import { EditButton, Show, TextField, useRecordContext } from "react-admin";
import React from "react";
import { Typography } from "@mui/material";

interface CustomShowProps {
  children: React.ReactNode;
  title: string;
  //   resource: string;
}

// const;

const CustomShow = (props: CustomShowProps) => {

  return (
    <Show
      sx={{
        width: "100%",
        // padding: "20px",
        justifyContent: "center",
        justifyItems: "center",
        "& .RaShow-main	": {
          padding: "20px",
        },
        "& .RaShow-card": {
          padding: "20px",
        },
        // paddingBottom: "20px",
      }}
      actions={false}>
      <Typography
        sx={{
          textAlign: "center",
          marginBottom: "20px",
        }}>
        {props.title}
      </Typography>
      {props.children}
      <EditButton />
    </Show>
  );
};
export default CustomShow;
