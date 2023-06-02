import React from "react";
import {
  DateField,
  DeleteButton,
  EditButton,
  ImageField,
  Show,
  TextField,
  WithRecord,
  useRecordContext,
} from "react-admin";
import CustomShow from "../commons/customShow";
import {
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Typography,
  CardHeader,
  Avatar,
  Stack,
  Grid,
} from "@mui/material";
import { DoctorAccount, User } from "../utils/commons";
import dayjs from "dayjs";
import Head from "next/head";

const DoctorShow = () => {
  return (
    <>
      <Head>
        <title>Doctor Information</title>
      </Head>
      <Show
        title="Doctor Show"
        actions={false}
        sx={{
          "& .RaShow-main	": {
            padding: "20px",
          },
          "& .RaShow-card": {
            padding: "20px",
          },
          width: "50%",
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "center",
          alignContent: "center",
          justifyItems: "center",
          alignSelf: "center",
        }}>
        <Card>
          <CardHeader
            avatar={
              <WithRecord
                render={(record: User) => (
                  <Avatar
                    sx={{ width: 64, height: 64 }}
                    src={record.attachment ? record.attachment.filePath : ""}>
                    {record.attachment
                      ? ""
                      : `${
                          record.firstName
                            ? record.firstName.charAt(0).toUpperCase()
                            : ""
                        }${
                          record.lastName
                            ? record?.lastName.charAt(0).toUpperCase()
                            : ""
                        }`}
                  </Avatar>
                )}
              />
            }
            title={
              <WithRecord
                render={(record) => {
                  return (
                    <Typography
                      variant="h5"
                      fontStyle={"italic"}
                      fontWeight="700"
                      color={(theme) => theme.palette.info.light}>{`Dr.${
                      record.firstName.charAt(0).toUpperCase() +
                      record.firstName.slice(1)
                    } ${
                      record.lastName.charAt(0).toUpperCase() +
                      record.lastName.slice(1)
                    }`}</Typography>
                  );
                }}
              />
            }
            subheader={
              <WithRecord
                render={(record) => (
                  <Typography
                    variant="caption"
                    color="skyblue">{`User ID: ${record.code}`}</Typography>
                )}
              />
            }
            action={
              <Stack direction="column" spacing={2}>
                <EditButton />
                <DeleteButton />
              </Stack>
            }
            sx={{
              display: "flex",
            }}
          />

          <CardContent
            sx={
              {
                // overflowY: "scroll",
                // height: "inherit",
              }
            }>
            <Typography
              variant="h4"
              color="primary"
              paddingLeft={1}
              marginBottom={2}>
              About the doctor:
            </Typography>
            <Grid container spacing={2} paddingLeft={2} marginBottom={4}>
              <Grid item container md={6} sm={12}>
                <Grid item xs={4}>
                  Doctor ID:
                </Grid>
                <Grid item xs={8}>
                  <WithRecord
                    render={(record: User) => (
                      <Typography
                        variant="body1"
                        color="secondary"
                        fontWeight="700">
                        {record.id}
                      </Typography>
                    )}
                  />
                </Grid>
              </Grid>
              <Grid item container sm={12} md={6}>
                <Grid item xs={4}>
                  Email:
                </Grid>
                <Grid item xs={8}>
                  <WithRecord
                    render={(record: User) => (
                      <Typography
                        variant="body1"
                        color="secondary"
                        fontWeight="700">
                        {record.email ? record.email : "Not available"}
                      </Typography>
                    )}
                  />
                </Grid>
              </Grid>
              <Grid item container md={6} sm={12}>
                <Grid item xs={4}>
                  Gender:
                </Grid>
                <Grid item xs={8}>
                  <WithRecord
                    render={(record: User) => (
                      <Typography
                        variant="body1"
                        color="secondary"
                        fontWeight="700">
                        {record.gender ? record.gender : "Not available"}
                      </Typography>
                    )}
                  />
                </Grid>
              </Grid>
              <Grid item container sm={12} md={6}>
                <Grid item xs={4}>
                  Address:
                </Grid>
                <Grid item xs={8}>
                  <WithRecord
                    render={(record: User) => (
                      <Typography
                        variant="body1"
                        color="secondary"
                        fontWeight="700">
                        {record.address ? record.address : "Not available"}
                      </Typography>
                    )}
                  />
                </Grid>
              </Grid>
              <Grid item container md={6} sm={12}>
                <Grid item xs={4}>
                  Social Security Number:
                </Grid>
                <Grid item xs={8}>
                  <WithRecord
                    render={(record: User) => (
                      <Typography
                        variant="body1"
                        color="secondary"
                        fontWeight="700">
                        {record.socialSecurityNumber
                          ? record.socialSecurityNumber
                          : "Not available"}
                      </Typography>
                    )}
                  />
                </Grid>
              </Grid>
              <Grid item container sm={12} md={6}>
                <Grid item xs={4}>
                  Nationality:
                </Grid>
                <Grid item xs={8}>
                  <WithRecord
                    render={(record: User) => (
                      <Typography
                        variant="body1"
                        color="secondary"
                        fontWeight="700">
                        {record.nationality
                          ? record.nationality
                          : "Not available"}
                      </Typography>
                    )}
                  />
                </Grid>
              </Grid>
              <Grid item container md={6} sm={12}>
                <Grid item xs={4}>
                  Doctor Day of Birth:
                </Grid>
                <Grid item xs={8}>
                  <WithRecord
                    render={(record: User) => (
                      <Typography
                        variant="body1"
                        color="secondary"
                        fontWeight="700">
                        {record.birthday ? record.birthday : "Not available"}
                      </Typography>
                    )}
                  />
                </Grid>
              </Grid>
              <Grid item container sm={12} md={6}>
                <Grid item xs={4}>
                  Account Created On:
                </Grid>
                <Grid item xs={8}>
                  <WithRecord
                    render={(record: User) => (
                      <Typography
                        variant="body1"
                        color="secondary"
                        fontWeight="700">
                        {record.createdAt
                          ? dayjs(record.createdAt).format("DD/MM/YYYY")
                          : "Not available"}
                      </Typography>
                    )}
                  />
                </Grid>
              </Grid>
              <Grid item container sm={12} md={6}>
                <Grid item xs={4}>
                  Doctor speciality:
                </Grid>
                <Grid item xs={8}>
                  <WithRecord
                    render={(record) => (
                      <Typography
                        variant="body1"
                        color="secondary"
                        fontWeight="700">
                        {record.operatorAccount.doctorAccount.faculty
                          ? record.operatorAccount.doctorAccount.faculty
                          : "Not available"}
                      </Typography>
                    )}
                  />
                </Grid>
              </Grid>
              <Grid item container sm={12} md={6}>
                <Grid item xs={4}>
                  Doctor Experience:
                </Grid>
                <Grid item xs={8}>
                  <WithRecord
                    render={(record) => (
                      <Typography
                        variant="body1"
                        color="secondary"
                        fontWeight="700">
                        {record.operatorAccount.doctorAccount.yearOfExperience
                          ? record.operatorAccount.doctorAccount
                              .yearOfExperience + " years"
                          : "Not available"}
                      </Typography>
                    )}
                  />
                </Grid>
              </Grid>
              <Grid item container sm={12} md={6}>
                <Grid item xs={4}>
                  Doctor Qualifications:
                </Grid>
                <Grid item xs={8}>
                  <WithRecord
                    render={(record) => (
                      <Typography
                        variant="body1"
                        color="secondary"
                        fontWeight="700">
                        {record.operatorAccount.doctorAccount.qualifications
                          .length > 0
                          ? record.operatorAccount.doctorAccount.qualifications.map(
                              (qualification: any, index: any) => (
                                <Typography key={index}>
                                  {qualification.name}
                                </Typography>
                              )
                            )
                          : "Not available"}
                      </Typography>
                    )}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Typography
              variant="h4"
              color="primary"
              paddingLeft={1}
              marginBottom={2}>
              Doctor Contact Information:
            </Typography>
            <Grid container spacing={2} paddingLeft={2}>
              <Grid item container md={6} sm={12}>
                <Grid item xs={4}>
                  Doctor Username:
                </Grid>
                <Grid item xs={8}>
                  <WithRecord
                    render={(record: User) => (
                      <Typography
                        variant="body1"
                        color="secondary"
                        fontWeight="700">
                        {record.operatorAccount
                          ? record.operatorAccount.username
                          : "Not available"}
                      </Typography>
                    )}
                  />
                </Grid>
              </Grid>
              <Grid item container sm={12} md={6}>
                <Grid item xs={4}>
                  Doctor Phone number:
                </Grid>
                <Grid item xs={8}>
                  <WithRecord
                    render={(record: User) => (
                      <Typography
                        variant="body1"
                        color="secondary"
                        fontWeight="700">
                        {record.operatorAccount?.phoneNumber
                          ? record.operatorAccount.phoneNumber
                          : "Not available"}
                      </Typography>
                    )}
                  />
                </Grid>
              </Grid>
              <Grid item container sm={12} md={6}>
                <Grid item xs={4}>
                  Works at:
                </Grid>
                <Grid item xs={8}>
                  <WithRecord
                    render={(record: User) => (
                      <Typography
                        variant="body1"
                        color="secondary"
                        fontWeight="700">
                        {record.operatorAccount
                          ? record.operatorAccount.hospital.name
                          : "Not available"}
                      </Typography>
                    )}
                  />
                </Grid>
              </Grid>
              <Grid item container sm={12} md={6}>
                <Grid item xs={4}>
                  Hospital Address:
                </Grid>
                <Grid item xs={8}>
                  <WithRecord
                    render={(record: User) => (
                      <Typography
                        variant="body1"
                        color="secondary"
                        fontWeight="700">
                        {record.operatorAccount?.hospital.description
                          ? record.operatorAccount.hospital.description
                          : "Not available"}
                      </Typography>
                    )}
                  />
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
          <CardActionArea
            sx={{
              textAlign: "center",
            }}></CardActionArea>
        </Card>
      </Show>
    </>
  );
};

export default DoctorShow;
