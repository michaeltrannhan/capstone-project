import React from "react";
import { InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { TextInput, usePermissions } from "react-admin";
type Props = {};

const ListFilters = (placeholder: string, label: string) => {
  return [
    <TextInput
      color="primary"
      placeholder={placeholder}
      key={1}
      source="q"
      variant="outlined"
      alwaysOn
      label={false}
      sx={{
        width: "100%",
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />,
  ];
};

export default ListFilters;
