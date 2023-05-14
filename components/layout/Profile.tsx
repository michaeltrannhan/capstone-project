import React from "react";
import {
  useGetOne,
  useGetIdentity,
  usePermissions,
  Edit,
  useDataProvider,
  Button,
  TextField,
} from "react-admin";
import CircularProgress from "@mui/material/CircularProgress/CircularProgress";
import api from "../../services";
import ProfileServices from "../../services/profileServices";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
  useQueryClient,
} from "react-query";
import { Profile } from "../utils/commons";
import { type } from "os";
import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  Divider,
  Grid,
  Paper,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import Head from "next/head";
import { AccountProfile } from "./AccountProfile";
import { AccountProfileDetails } from "./AccountProfileDetails";
import { AccountHospitalDetails } from "./AccountHospitalDetails";
import { profile } from "console";
import { AccountProfileChangePassword } from "./AccountProfileChangePassword";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const ProfilePage = () => {
  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const rawAuth = localStorage.getItem("auth");
  const auth = JSON.parse(rawAuth ? rawAuth : "{}");

  const {
    isIdle,
    data: profileData,
    isLoading: profileLoading,
  } = useQuery(
    ["profile", auth.code],
    () =>
      ProfileServices.fetchProfileByUUID(auth.code).then((res) => {
        return res;
      }),
    {
      enabled: !!auth.code,
      refetchOnWindowFocus: false,
    }
  );

  if (profileLoading)
    return (
      <>
        <Paper
          sx={{
            display: "flex",
            flexDirection: "column",
            textAlign: "center",
            alignItems: "center",
          }}>
          Profile is loading...
          <CircularProgress />
        </Paper>
      </>
    );

  return (
    <>
      <Head>
        <title>Profile</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 2,
          px: 4,
        }}>
        <Typography
          variant="h2"
          fontWeight="700"
          sx={{
            mb: 8,
          }}>
          Profile information
        </Typography>
        <Grid container columnSpacing="24px">
          <Grid xs={12} md={6} lg={4} item>
            {profileLoading ? (
              <>
                <CircularProgress />
              </>
            ) : (
              <AccountProfile profile={profileData as Profile} />
            )}
          </Grid>
          <Grid xs={12} md={6} lg={8} item>
            {profileLoading ? (
              <>
                <CircularProgress />
              </>
            ) : (
              <Box sx={{ borderBottom: 0, borderColor: "divider" }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  scrollButtons="auto"
                  variant="scrollable"
                  textColor="inherit"
                  sx={{
                    borderRadius: "20px",
                    color: "#00C2CB",
                    "	.MuiTabs-indicator": {
                      background: "#00C2CB",
                    },
                  }}
                  aria-label="basic tabs example">
                  <Tab
                    sx={{
                      borderRadius: "20px",
                      borderBottom: "",
                    }}
                    label="Basic Information"
                    {...a11yProps(0)}
                  />

                  <Tab
                    sx={{
                      borderRadius: "20px",
                    }}
                    label="Change Password"
                    {...a11yProps(1)}
                  />
                </Tabs>
                <TabPanel value={value} index={0}>
                  <AccountProfileDetails profile={profileData as Profile} />
                </TabPanel>

                <TabPanel value={value} index={1}>
                  <AccountProfileChangePassword uuid={auth.code} />
                </TabPanel>
              </Box>
            )}
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default ProfilePage;
