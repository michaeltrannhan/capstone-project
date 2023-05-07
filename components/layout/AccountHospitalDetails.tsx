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
interface AccountHospitalDetailsProps {
  profile: Profile;
}

export const AccountHospitalDetails = (props: AccountHospitalDetailsProps) => {
  return (
    <Card>
      <CardHeader subheader="Hospital information" title="Profile" />
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
  );
};
