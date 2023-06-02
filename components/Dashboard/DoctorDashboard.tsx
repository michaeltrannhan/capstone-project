import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  Typography,
  styled,
  Button,
} from "@mui/material";
import Head from "next/head";
import React from "react";
import { useRedirect } from "react-admin";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import {
  faFilePrescription,
  faHospitalUser,
  faNewspaper,
  faPills,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
type Props = {};

const StyledIcon = styled("div")(({ theme }) => ({
  margin: "auto",
  display: "flex",
  borderRadius: "50%",
  alignItems: "center",
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: "center",
  marginBottom: theme.spacing(3),
}));
const DoctorDashboard = (props: Props) => {
  const redirect = useRedirect();
  return (
    <>
      <Head>
        <title>Doctor Dashboard</title>
      </Head>

      <Card
        sx={{
          width: "100%",
          height: "100%",
          p: 2,
        }}>
        <CardHeader
          title={
            <Typography variant="h1" fontSize={24}>
              Welcome to MediReminder, Doctor!
            </Typography>
          }
          subheader={
            <Typography variant="caption" fontSize="16px" fontWeight={700}>
              Browse Resources
            </Typography>
          }
        />
        <CardContent>
          <Grid container spacing={6}>
            <Grid item xs={12} md={6}>
              <Card
                sx={{
                  py: 5,
                  boxShadow: 0,
                  textAlign: "center",
                  paddingBottom: "10px",
                  color: "#00C2CB",
                  bgcolor: "#E5F6F7",
                }}>
                <StyledIcon>
                  <FontAwesomeIcon icon={faFilePrescription} size="2x" />
                </StyledIcon>
                <CardActions
                  sx={{
                    paddingTop: 2,
                    textAlign: "center",
                    justifyContent: "center",
                  }}
                  onClick={(e) => {
                    redirect("/prescribe");
                  }}>
                  <Button endIcon={<ArrowForwardIosIcon />}>
                    Go to Prescription Page
                  </Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card
                sx={{
                  py: 5,
                  boxShadow: 0,
                  textAlign: "center",
                  paddingBottom: "10px",
                  color: "#00C2CB",
                  bgcolor: "#E5F6F7",
                }}>
                <StyledIcon>
                  <FontAwesomeIcon icon={faHospitalUser} size="2x" />
                </StyledIcon>
                <CardActions
                  sx={{
                    paddingTop: 2,
                    textAlign: "center",
                    justifyContent: "center",
                  }}
                  onClick={(e) => {
                    redirect("/patients");
                  }}>
                  <Button endIcon={<ArrowForwardIosIcon />}>
                    Go to Patients Page
                  </Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card
                sx={{
                  py: 5,
                  boxShadow: 0,
                  textAlign: "center",
                  paddingBottom: "10px",
                  color: "#00C2CB",
                  bgcolor: "#E5F6F7",
                }}>
                <StyledIcon>
                  <FontAwesomeIcon icon={faPills} size="2x" />
                </StyledIcon>
                <CardActions
                  sx={{
                    paddingTop: 2,
                    textAlign: "center",
                    justifyContent: "center",
                  }}
                  onClick={(e) => {
                    redirect("/medications");
                  }}>
                  <Button endIcon={<ArrowForwardIosIcon />}>
                    Go to Medications Page
                  </Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card
                sx={{
                  py: 5,
                  boxShadow: 0,
                  textAlign: "center",
                  paddingBottom: "10px",
                  color: "#00C2CB",
                  bgcolor: "#E5F6F7",
                }}>
                <StyledIcon>
                  <FontAwesomeIcon icon={faNewspaper} size="2x" />
                </StyledIcon>
                <CardActions
                  sx={{
                    paddingTop: 2,
                    textAlign: "center",
                    justifyContent: "center",
                  }}
                  onClick={(e) => {
                    redirect("/articles");
                  }}>
                  <Button endIcon={<ArrowForwardIosIcon />}>
                    Go to Articles Page
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
};

export default DoctorDashboard;
