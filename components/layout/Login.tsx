import * as React from "react";
import { useState } from "react";
import PropTypes from "prop-types";

import {
  Avatar,
  Button,
  Card,
  CardActions,
  CircularProgress,
  Typography,
  TextField,
  InputAdornment,
} from "@mui/material";
import { useLogin, useNotify } from "react-admin";
import AccountCircle from "@mui/icons-material/AccountCircle";
import LockIcon from "@mui/icons-material/Lock";
import ClearIcon from "@mui/icons-material/Clear";
import {
  useForm,
  useFormState,
  Controller,
  SubmitHandler,
} from "react-hook-form";
import { DevTool } from "@hookform/devtools";

import Box from "@mui/material/Box";
import logo from "../../assets/images/logo.png";
import Image from "next/image";
interface FormValues {
  username: string;
  password: string;
}

const Logo = () => <Image src={logo} alt="MediReminder" />;

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [hover, setHover] = useState(false);
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const notify = useNotify();
  const login = useLogin();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data.username);
    console.log(data.password);
    try {
      setLoading(true);
      login({ username: data.username, password: data.password })
        .then((response) => {
          console.log(response);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch {
      notify("Invalid email or password");
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            // minHeight: "100vh",
            alignItems: "center",
            justifyContent: "flex-start",
            // minWidth: "75vw",
            background: "white",
            backgroundSize: "cover",
          }}>
          <Card
            sx={{
              marginTop: "10%",
              padding: "50px",
              border: "1px solid #E0E2E7",
              borderRadius: "12px",
            }}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            raised={hover}>
            <Box
              sx={{
                margin: "1em",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                alignContent: "center",
              }}>
              <Logo />
              <Typography variant="h4" fontWeight={700}>
                MediReminder
              </Typography>
            </Box>
            <Box
              sx={{
                marginTop: "1em",
                display: "flex",
                justifyContent: "center",
                // color: "#000",
              }}>
              <Typography variant="h4" fontWeight="700">
                Sign In
              </Typography>
            </Box>
            <Box sx={{ padding: "0 1em 1em 1em" }}>
              <Box sx={{ marginTop: "1em" }}>
                <Controller
                  name="username"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      autoFocus
                      autoComplete="true"
                      InputProps={{
                        classes: { input: "inherit" },
                        startAdornment: (
                          <InputAdornment position="start">
                            <AccountCircle />
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">
                            <Button
                              sx={{
                                padding: 0,
                                minWidth: "auto",
                                justifyContent: "end",
                              }}
                              onClick={() => {
                                setValue("username", "");
                              }}>
                              <ClearIcon />
                            </Button>
                          </InputAdornment>
                        ),
                      }}
                      label="Username"
                      variant="outlined"
                      fullWidth
                    />
                  )}
                />
              </Box>
              <Box sx={{ marginTop: "1em" }}>
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      sx={{
                        fontSize: "16px",
                      }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <LockIcon />
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">
                            <Button
                              sx={{
                                padding: 0,
                                minWidth: "auto",
                                justifyContent: "end",
                              }}
                              onClick={() => {
                                setValue("password", "");
                              }}>
                              <ClearIcon />
                            </Button>
                          </InputAdornment>
                        ),
                      }}
                      type="password"
                      label="Password"
                      variant="outlined"
                      fullWidth
                    />
                  )}
                />
              </Box>
            </Box>
            <CardActions sx={{ padding: "0 1em 1em 1em" }}>
              <Button
                variant="contained"
                type="submit"
                color="primary"
                disabled={loading}
                fullWidth>
                {loading && <CircularProgress size={25} thickness={2} />}
                Sign In
              </Button>
            </CardActions>
            <CardActions sx={{ padding: "0 1em 1em 1em" }}>
              Don&apos;t have an account? Sign up here
            </CardActions>
          </Card>
        </Box>
      </form>
      <DevTool control={control} /> {/* set up the dev tool */}
    </>
  );
};

Login.propTypes = {
  authProvider: PropTypes.func,
  previousRoute: PropTypes.string,
};

export default Login;
