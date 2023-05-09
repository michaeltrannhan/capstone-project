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

const initialProfile: Profile = {
  id: 0,
  firstName: "Loading",
  lastName: "Loading",
  email: "Loading",
  address: "Loading",
  birthday: "Loading",
  role: {
    id: 0,
    name: "Loading",
    description: "Loading",
  },
  attachment: {
    filePath: "Loading",
  },
  createdAt: new Date(),
  updatedAt: new Date(),
  gender: "Loading",
  lastActive: "Loading",
  nationality: "Loading",
  passwordHash: "Loading",
  roleId: 0,
  code: "Loading",
  socialSecurityNumber: "Loading",
};

const ProfilePage = () => {
  const [value, setValue] = React.useState(0);
  const [initialState, setInitialState] = React.useState<Profile | null>(
    initialProfile
  );
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const { identity, isLoading } = useGetIdentity();
  // console.log(localStorage.getItem("auth"));
  const rawAuth = localStorage.getItem("auth");
  const auth = JSON.parse(rawAuth ? rawAuth : "{}");

  // if (isLoading) return <CircularProgress />;
  // console.log("identity", isLoading ? "loading" : identity?.code);
  const {
    isIdle,
    data: profileData,
    isLoading: profileLoading,
  } = useQuery(
    ["profile", auth.code],
    () =>
      ProfileServices.fetchProfileByUUID(auth.code).then((res) => {
        setInitialState(res);
        return res;
      }),
    {
      enabled: !!auth.code,
      refetchOnWindowFocus: false,
    }
  );

  console.log("profile", profileData);

  if (profileLoading)
    return (
      <>
        <Paper
          sx={{
            display: "flex",
            flexDirection: "column",
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
          py: 8,
          px: 4,
        }}>
        <Typography
          variant="h4"
          sx={{
            mb: 8,
          }}>
          Profile
        </Typography>
        <Grid container columnSpacing="24px">
          <Grid xs={12} md={6} lg={4} item>
            {profileLoading ? (
              <>
                <CircularProgress />
              </>
            ) : (
              <AccountProfile
                profile={profileData as Profile}
                // loading={profileLoading}
              />
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
                  aria-label="basic tabs example">
                  <Tab label="Basic Information" {...a11yProps(0)} />
                  {profileData?.operatorAccount ? (
                    <Tab label="Operator Information" {...a11yProps(1)} />
                  ) : null}
                  <Tab label="Change Password" {...a11yProps(2)} />
                </Tabs>
                <TabPanel value={value} index={0}>
                  <AccountProfileDetails profile={profileData as Profile} />
                </TabPanel>
                <TabPanel value={value} index={1}>
                  <AccountHospitalDetails profile={profileData as Profile} />
                </TabPanel>
                <TabPanel value={value} index={2}>
                  <AccountProfileChangePassword uuid={identity?.code} />
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
