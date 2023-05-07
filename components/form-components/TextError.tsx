import { Box } from "@mui/material";
import { ErrorMessageProps } from "formik";
import PropTypes from "prop-types";
import React from "react";

const TextError = ({ children }: any) => {
  return <Box sx={{ color: "red" }}>{children}</Box>;
};

TextError.propTypes = {
  children: PropTypes.node.isRequired,
};
export default TextError;
