import React, { useState, useEffect } from "react";
import { TextField, Box } from "@mui/material";
import api from "../../services";
import { getAuthorizationHeader } from "../../services/index";

export type DebouncedInputProps = {
  onChange: (value: any) => void;
};

export default function DebouncedInput({ onChange }: DebouncedInputProps) {
  const [inputValue, setInputValue] = useState<string>("");

  useEffect(() => {
    const fetchUser = setTimeout(() => {
      if (inputValue.length > 0) {
        api
          .get(`/patients/byphone/${inputValue}`)
          .then((res) => {
            onChange(res.data);
          })
          .catch((err) => console.log(err));
      }
    }, 300);
    return () => clearTimeout(fetchUser);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue]);
  return (
    <Box sx={{ width: "100%" }}>
      <TextField
        variant="outlined"
        fullWidth
        id="debounced-input"
        label="Search Patient"
        value={inputValue || ""}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setInputValue(e.target.value)
        }></TextField>
    </Box>
  );
}
