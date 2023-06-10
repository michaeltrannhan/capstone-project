import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  Grid,
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";
import LineChart from "./LineExample";
import Head from "next/head";
import StatsCard from "./StatsCard";
import { useQuery } from "react-query";
import {
  faUserDoctor,
  faPills,
  faNewspaper,
  faUserInjured,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useGetIdentity, usePermissions, useRedirect } from "react-admin";
import InfoIcon from "@mui/icons-material/Info";
import api from "../../services";

type PerDay = {
  lastActive: string;
  count: number;
};

type ActiveUserWeekLy = PerDay[];

type UserAccountSimple = {
  code: string;
  firstName?: string;
  lastName?: string;
  createdAt: Date;
};
type DoctorAccountSimple = {
  operatorAccount: UserAccountSimple;
};
type PatientAccountSimple = {
  userAccount: UserAccountSimple;
};

type NewlyRegisteredPatient = {
  patientAccountId: number;
  patientAccount: PatientAccountSimple;
  doctorAccountId: number;
  doctorAccount: DoctorAccountSimple;
};
type Response = {
  patientsAvailable: number;
  doctorsAvailable: number;
  medicinesAvailable: number;
  articlesAvailable: number;
  activeUsersWeekly: ActiveUserWeekLy;
  newlyRegisteredPatients: NewlyRegisteredPatient[];
};

export default function AdminDashboard() {
  const rawAuth = localStorage.getItem("auth");
  const auth = JSON.parse(rawAuth ? rawAuth : "{}");
  const { permissions, isLoading: permissionLoading } = usePermissions();
  const redirect = useRedirect();
  const {
    isIdle,
    data: DashboardData,
    isLoading: isDashboardLoading,
  } = useQuery(
    "dashboard",
    () =>
      api
        .get(`/hospital-admins/report/${auth.operatorAccount.hospitalId}`)
        .then((res) => res.data),
    {
      enabled: !!auth.operatorAccount.hospitalId && !!permissionLoading,
      refetchOnWindowFocus: false,
    }
  );

  if (isDashboardLoading)
    return (
      <Box textAlign="center">
        <Skeleton />
      </Box>
    );
  return (
    <Box marginLeft={6}>
      <Head>
        <title>Dashboard</title>
      </Head>
      <Box
        sx={{
          p: 2,
          textAlign: "center",
          // userSelect: "none",
        }}>
        <Typography variant="h1">Dashboard</Typography>
        <Typography variant="subtitle2">
          General information about resources on system
        </Typography>
      </Box>

      <Grid container spacing={6} direction="column">
        <Grid item container spacing={2} px={4}>
          <Grid item xs={12} md={6} lg={3}>
            <StatsCard
              color="primary"
              title="patients"
              total={DashboardData?.patientsAvailable}>
              <FontAwesomeIcon icon={faUserInjured} size="3x" />
            </StatsCard>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <StatsCard
              color="info"
              title="doctors"
              total={DashboardData?.doctorsAvailable}>
              <FontAwesomeIcon icon={faUserDoctor} size="3x" />
            </StatsCard>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <StatsCard
              color="warning"
              title="medications"
              total={DashboardData?.medicinesAvailable}>
              <FontAwesomeIcon icon={faPills} size="3x" />
            </StatsCard>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <StatsCard
              color="error"
              title="articles"
              total={DashboardData?.articlesAvailable}>
              <FontAwesomeIcon icon={faNewspaper} size="3x" />
            </StatsCard>
          </Grid>
        </Grid>
        <Grid item container spacing={2}>
          <Grid
            item
            xs={12}
            lg={6}
            paddingLeft={4}
            component={Paper}
            elevation={3}>
            <Typography
              sx={{ flex: "1 1 100%" }}
              variant="h4"
              textAlign="center"
              id="tableTitle"
              component="div">
              Active Users Per Week
            </Typography>
            <LineChart />
          </Grid>
          <Grid item xs={12} lg={6} paddingRight={4}>
            <TableContainer component={Paper} elevation={3}>
              <Table aria-label="newPatients">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">
                      Newly Registered Patients
                    </TableCell>
                    <TableCell align="center">Patient code</TableCell>
                    <TableCell align="center">Associated Doctor</TableCell>
                    <TableCell align="center">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {DashboardData?.newlyRegisteredPatients.map(
                    (row: any, index: number) => (
                      <TableRow key={index}>
                        <TableCell align="center">
                          {row.patientAccount.userAccount.firstName +
                            " " +
                            row.patientAccount.userAccount.lastName}
                        </TableCell>
                        <TableCell align="center">
                          {row.patientAccount.userAccount.code}
                        </TableCell>
                        <TableCell align="center">
                          {row.doctorAccount.operatorAccount.userAccount
                            .firstName +
                            " " +
                            row.doctorAccount.operatorAccount.userAccount
                              .lastName}
                        </TableCell>
                        <TableCell align="center">
                          <Button
                            variant="text"
                            color="primary"
                            aria-label="table-button"
                            onClick={() => {
                              redirect(
                                "show",
                                "patients",
                                row.patientAccountId
                              );
                            }}>
                            <InfoIcon
                              sx={{
                                color: "#00C2CB",
                              }}
                            />
                          </Button>
                        </TableCell>
                      </TableRow>
                    )
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
