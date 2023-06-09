import { useCallback, useState } from "react";
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
  Select,
  MenuItem,
  InputLabel,
  CircularProgress,
} from "@mui/material";

import { Profile } from "../utils/commons";
import { convertTimeToHoursMinutes } from "../utils/commons";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import dayjs from "dayjs";
import api from "../../services";
import { useNotify } from "react-admin";
interface AccountProfileDetailsProps {
  profile: Profile;
}

type Form = {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  gender: string;
  socialSecurityNumber: string;
  [key: string]: string; // add index signature
};
export const AccountProfileDetails = (props: AccountProfileDetailsProps) => {
  const [loading, setLoading] = useState(false);
  const notify = useNotify();
  const {
    control,
    handleSubmit,

    formState: { dirtyFields, isDirty },
  } = useForm<Form>({
    defaultValues: {
      firstName: props.profile.firstName,
      lastName: props.profile.lastName,
      email: props.profile.email,
      address: props.profile.address,
      gender: props.profile.gender,
      socialSecurityNumber: props.profile.socialSecurityNumber,
    },
    mode: "onChange",
  });
  const onSubmit: SubmitHandler<Form> = (data) => {
    const dirtyData = Object.keys(dirtyFields).reduce((acc, fieldName) => {
      acc[fieldName] = data[fieldName]; // Get the dirty values from the form data
      return acc;
    }, {} as Form);
    if (props.profile.role.name === "DOCTOR") {
      try {
        setLoading(true);
        api
          .patch(`/user-accounts/update-doctor/${props.profile.id}`, dirtyData)
          .then((response) => {
            // console.log(response);
            setLoading(false);
            notify("Profile updated successfully", { type: "success" });
          });
      } catch (error) {
        console.log(error);
      }
    } else if (props.profile.role.name === "HOSPITAL_ADMIN" || "ADMIN") {
      try {
        setLoading(true);
        api
          .patch(`/user-accounts/update-operator/${props.profile.id}`, data)
          .then((response) => {
            console.log(response);
            setLoading(false);
          });
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card>
          <CardHeader subheader="Basic information" title="Profile" />
          <CardContent sx={{ pt: 0 }}>
            <Box sx={{ m: 1.5 }}>
              <Grid container spacing={3}>
                <Grid xs={12} md={6}>
                  <Controller
                    name="firstName"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label="First name"
                        size="medium"
                      />
                    )}
                  />
                </Grid>
                <Grid xs={12} md={6}>
                  <Controller
                    name="lastName"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label="Last name"
                        size="medium"
                      />
                    )}
                  />
                </Grid>
                <Grid xs={12} md={6}>
                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label="Email Address"
                        size="medium"
                      />
                    )}
                  />
                </Grid>
                <Grid xs={12} md={6}>
                  <Controller
                    name="address"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label="Address"
                        size="medium"
                      />
                    )}
                  />
                </Grid>
                <Grid xs={12} md={6}>
                  <InputLabel id="gender">Gender</InputLabel>
                  <Controller
                    control={control}
                    name="gender"
                    render={({ field: { onChange, value, ref } }) => (
                      <Select
                        fullWidth
                        labelId="gender"
                        label="Gender"
                        // label="Gender"
                        size="small"
                        onChange={onChange}
                        value={value}>
                        <MenuItem value="MALE">Male</MenuItem>
                        <MenuItem value="FEMALE">Female</MenuItem>
                        <MenuItem value="OTHER">Other</MenuItem>
                      </Select>
                    )}
                  />
                </Grid>
                <Grid
                  xs={12}
                  md={6}
                  sx={{
                    alignItems: "end",
                  }}>
                  <Controller
                    name="socialSecurityNumber"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label="SSN"
                        size="medium"
                      />
                    )}
                  />
                </Grid>
                <Grid xs={12} md={6}>
                  <TextField
                    fullWidth
                    disabled
                    label="Creation Date"
                    name="createdAt"
                    value={dayjs(props.profile.createdAt).format("DD/MM/YYYY")}
                  />
                </Grid>

                <Grid xs={12} md={6}>
                  <TextField
                    fullWidth
                    disabled
                    label="Updated Date"
                    name="createdAt"
                    value={dayjs(props.profile.updatedAt).format("DD/MM/YYYY")}
                  />
                </Grid>
              </Grid>
            </Box>
            {isDirty && (
              <Button type="submit" disabled={loading}>
                {loading && <CircularProgress size={25} thickness={3} />}
                Update information
              </Button>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader
            subheader="Hospital information"
            title="Operator information"
          />
          <CardContent sx={{ pt: 0 }}>
            <Box sx={{ m: 1.5 }}>
              <Grid container spacing={3}>
                <Grid xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Hospital ID"
                    name="hospitalID"
                    disabled
                    value={
                      props.profile.operatorAccount?.hospitalId
                        ? props.profile.operatorAccount?.hospitalId
                        : "Undefined"
                    }
                  />
                </Grid>
                <Grid xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Username"
                    disabled
                    value={
                      props.profile.operatorAccount?.username
                        ? props.profile.operatorAccount?.username
                        : "Undefined"
                    }
                  />
                </Grid>
              </Grid>
            </Box>
          </CardContent>
        </Card>
      </form>
    </>
  );
};
