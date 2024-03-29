import { ErrorMessage, FormikHandlers } from "formik";
import { FormLabel, Grid, InputLabel, TextField } from "@mui/material";
import React, { FC } from "react";
import Icon from "react-icons";
import TextError from "./TextError";
import { bool } from "yup";
type InputProps = {
  name: number | string;
  value: number;
  touched?: boolean;
  label: string;
  error?: string;
  iconName?: string;
  iconSize?: number;
  variant?: "standard" | "filled" | "outlined";
  onChange: FormikHandlers["handleChange"];
  onBlur: FormikHandlers["handleBlur"];
  sx?: any;
};

const Input: FC<InputProps> = ({
  name,
  value,
  touched,
  label,
  error,
  iconName,
  iconSize,
  onChange,
  onBlur,
  ...props
}) => {
  const [isFocused, setIsFocused] = React.useState(false);
  const showErrorState = !isFocused && touched && error;

  return (
    // <Grid container direction="row">
    <div>
      <TextField
        {...props}
        onChange={onChange(name)}
        label={label}
        type="number"
        value={value}
        inputProps={{
          style: {
            height: "2.5rem",
          },
        }}
        onBlur={() => {
          setIsFocused(false);
          // console.log("OnBlur", name);
          onBlur(name);
        }}
        autoFocus={true}></TextField>
      {showErrorState && (
        <ErrorMessage name={name as string} component={TextError} />
      )}
    </div>
    // </Grid>
  );
};

export default Input;
