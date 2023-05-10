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
          .get(`/patients?keyword=${inputValue}`)
          .then((res) => {
            onChange(res.data.data[0]);
          })
          .catch((err) => console.log(err));
      }
    }, 1000);
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
        // defaultValue={"0"}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setInputValue(e.target.value)
        }></TextField>
    </Box>
  );
}
