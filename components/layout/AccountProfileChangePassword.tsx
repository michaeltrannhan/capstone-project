import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  Unstable_Grid2 as Grid,
  CircularProgress,
} from "@mui/material";

import {
  useForm,
  useFormState,
  Controller,
  SubmitHandler,
} from "react-hook-form";
import { Profile, ProfilePassword } from "../utils/commons";
import { useNotify } from "react-admin";
import api from "../../services";
interface AccountProfileChangePasswordProps {
  uuid: string;
}
interface FormValues {
  oldPassword: string;
  newPassword: string;
}

export const AccountProfileChangePassword = (
  props: AccountProfileChangePasswordProps
) => {
  const [loading, setLoading] = useState<boolean>(false);
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<ProfilePassword>({
    defaultValues: {
      oldPassword: "",
      newPassword: "",
    },
  });
  const notify = useNotify();
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data.oldPassword);
    console.log(data.newPassword);
    try {
      setLoading(true);
      const response = api
        .patch<FormValues, any>(
          `user-accounts/update-password/${props.uuid}`,
          data
        )
        .then((res) => {
          console.log(res);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          notify("Please provide proper old password and new password");
        });
      return Promise.resolve(response);
    } catch (error) {
      console.log(error);
      notify("Please provide proper old password and new password");
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card>
          <CardHeader subheader="Change your password" title="Profile" />
          <CardContent sx={{ pt: 0 }}>
            <Box sx={{ m: 1.5 }}>
              <Grid container spacing={3}>
                <Grid xs={12} md={6}>
                  <Controller
                    name="oldPassword"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        sx={{ fontSize: "16px" }}
                        type="password"
                        label="Old Password"
                        fullWidth
                        variant="outlined"
                      />
                    )}
                  />
                </Grid>
                <Grid xs={12} md={6}>
                  <Controller
                    name="newPassword"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        sx={{ fontSize: "16px" }}
                        type="password"
                        label="New Password"
                        fullWidth
                        variant="outlined"
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </Box>
          </CardContent>
          <Divider />
          <CardActions sx={{ justifyContent: "center" }}>
            <Button variant="contained" type="submit">
              {loading && <CircularProgress size={25} thickness={2} />}
              Change Password
            </Button>
          </CardActions>
        </Card>
      </form>
    </>
  );
};
