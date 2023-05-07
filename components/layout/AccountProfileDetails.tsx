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
} from "@mui/material";

import { Profile } from "../utils/commons";
import { convertTimeToHoursMinutes } from "../utils/commons";
import dayjs from "dayjs";
interface AccountProfileDetailsProps {
  profile: Profile;
}

export const AccountProfileDetails = (props: AccountProfileDetailsProps) => {
  return (
    <>
      <Card>
        <CardHeader subheader="Basic information" title="Profile" />
        <CardContent sx={{ pt: 0 }}>
          <Box sx={{ m: 1.5 }}>
            <Grid container spacing={3}>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  disabled
                  // helperText="Please specify the first name"
                  label="First name"
                  name="firstName"
                  required
                  value={props.profile.firstName}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  disabled
                  label="Last name"
                  name="lastName"
                  required
                  value={props.profile.lastName}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  disabled
                  label="Email Address"
                  name="email"
                  required
                  value={
                    props.profile.email ? props.profile.email : "Undefined"
                  }
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  disabled
                  label="Address"
                  name="address"
                  value={
                    props.profile.address ? props.profile.address : "Undefined"
                  }
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  disabled
                  label="gender"
                  name="address"
                  value={
                    props.profile.gender ? props.profile.gender : "Undefined"
                  }
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  disabled
                  label="Social Security Number"
                  name="socialSecurityNumber"
                  value={
                    props.profile.socialSecurityNumber
                      ? props.profile.socialSecurityNumber
                      : "Undefined"
                  }
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
        </CardContent>
      </Card>
    </>
  );
};
