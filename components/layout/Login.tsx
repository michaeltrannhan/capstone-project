import * as React from "react";
import { useState } from "react";
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
import { useForm, Controller, SubmitHandler } from "react-hook-form";

import Box from "@mui/material/Box";
import logo from "../../assets/images/logo.png";
import Image from "next/image";
import { DevTool } from "@hookform/devtools";

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
    reset,
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
    try {
      setLoading(true);
      login({ username: data.username, password: data.password })
        .then((response) => {
          setLoading(false);
        })
        .catch((error) => {
          notify("Invalid email or password");
          reset();
          setLoading(false);
        });
      return Promise.reject();
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
            alignItems: "center",
            justifyContent: "flex-start",
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
          </Card>
        </Box>
      </form>
      <DevTool control={control}  />
    </>
  );
};

export default Login;
