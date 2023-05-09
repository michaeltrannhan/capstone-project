import { Grid, Typography } from "@mui/material";
import React from "react";
import DebouncedInput from "../form-components/DebouncedInput";
import { getAuthorizationHeader } from "../../services";
import LineChart from "./LineExample";
import Head from "next/head";
import StatsCard from "./StatsCard";

export default function Dashboard() {
  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <Typography variant="h1">Dashboard</Typography>
      <Typography variant="subtitle2">
        General information about resources on system
      </Typography>

      {/* {localStorage.getItem("auth")} */}

      <Grid container spacing={2}>
        <Grid item xs={12} md={6} lg={3}>
          <StatsCard title="patients" />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <StatsCard title="doctors" />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <StatsCard title="medicines" />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <StatsCard title="articles" />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <LineChart />
        </Grid>

        <Typography
          variant="h4"
          sx={{
            wordBreak: "break-word",
          }}>
          {getAuthorizationHeader()}
        </Typography>
      </Grid>
    </>
  );
}
