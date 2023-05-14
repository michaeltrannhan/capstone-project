import {
  Card,
  CardHeader,
  Avatar,
  Typography,
  Stack,
  CardContent,
  Grid,
  CardActionArea,
} from "@mui/material";
import dayjs from "dayjs";
import Head from "next/head";
import React from "react";
import {
  DeleteButton,
  EditButton,
  ReferenceField,
  Show,
  SimpleShowLayout,
  TextField,
  WithRecord,
} from "react-admin";
import { User } from "../utils/commons";

type Props = {};

const PatientShow = () => {
  return (
    <>
      <Head>
        <title>Patient Details</title>
      </Head>
      <Show
        title="Patient Show"
        actions={false}
        sx={{
          "& .RaShow-main	": {
            padding: "20px",
          },
          "& .RaShow-card": {
            padding: "20px",
          },
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
                      color={(theme) => theme.palette.info.light}>{`Patient ${
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

          <CardContent>
            <Typography
              variant="h4"
              color="primary"
              paddingLeft={1}
              marginBottom={2}>
              About the patient:
            </Typography>
            <Grid container spacing={4} paddingLeft={4} marginBottom={4}>
              <Grid item container md={6} sm={12}>
                <Grid item xs={4}>
                  Patient ID:
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
                  Patient Day of Birth:
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
            </Grid>
            <Typography
              variant="h4"
              color="primary"
              paddingLeft={1}
              marginBottom={2}>
              Patient Contact Information:
            </Typography>
            <Grid container spacing={4} paddingLeft={4}>
              <Grid item container sm={12} md={6}>
                <Grid item xs={4}>
                  Patient Phone number:
                </Grid>
                <Grid item xs={8}>
                  <WithRecord
                    render={(record: User) => (
                      <Typography
                        variant="body1"
                        color="secondary"
                        fontWeight="700">
                        {record.patientAccount?.phoneNumber
                          ? record.patientAccount.phoneNumber
                          : "Not available"}
                      </Typography>
                    )}
                  />
                </Grid>
              </Grid>
              <Grid item container sm={12} md={6}>
                <Grid item xs={4}>
                  Patient Insurance number:
                </Grid>
                <Grid item xs={8}>
                  <WithRecord
                    render={(record: User) => (
                      <Typography
                        variant="body1"
                        color="secondary"
                        fontWeight="700">
                        {record.patientAccount?.insuranceNumber
                          ? record.patientAccount.insuranceNumber
                          : "Not available"}
                      </Typography>
                    )}
                  />
                </Grid>
              </Grid>
              <Grid item container sm={12} md={6}>
                <Grid item xs={4}>
                  Patient Occupation:
                </Grid>
                <Grid item xs={8}>
                  <WithRecord
                    render={(record: User) => (
                      <Typography
                        variant="body1"
                        color="secondary"
                        fontWeight="700">
                        {record.patientAccount?.occupation
                          ? record.patientAccount.occupation
                          : "Not available"}
                      </Typography>
                    )}
                  />
                </Grid>
              </Grid>
              {/* <Grid item container sm={12} md={6}>
                <Grid item xs={4}>
                  Associated Doctors:
                </Grid>
                <Grid item xs={8}>
                  <WithRecord
                    render={(record) => {
                      return record.patientAccount.doctorManagesPatients.map(
                        (doctor: any, index: number) => (
                          <ReferenceField
                            source={`patientAccount.doctorManagesPatients[${index}].doctorAccountId`}
                            reference="doctors"
                            key={index}
                          />
                        )
                      );
                    }}
                  />
                </Grid>
              </Grid> */}
            </Grid>
            {/* <Typography
              variant="h4"
              color="primary"
              paddingLeft={1}
              marginBottom={4}>
              Associated Patients:
            </Typography> */}
            {/* <Grid container spacing={4} paddingLeft={4}>
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
            </Grid> */}
          </CardContent>
          <CardActionArea
            sx={{
              textAlign: "center",
            }}></CardActionArea>
        </Card>
        {/* <SimpleShowLayout>
          <TextField source="id" />
          <TextField source="firstName" />
          <TextField source="lastName" />
          <TextField source="email" />
        </SimpleShowLayout> */}
      </Show>
    </>
  );
};

export default PatientShow;
