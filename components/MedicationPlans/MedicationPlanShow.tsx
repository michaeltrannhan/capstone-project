import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import Head from "next/head";
import React from "react";
import {
  DeleteButton,
  EditButton,
  ReferenceField,
  Show,
  usePermissions,
  WithRecord,
  TextField,
  DateField,
  ChipField,
  BooleanField,
} from "react-admin";
import {
  ReminderPlanDTO,
  Role,
  ReminderPlan,
  ReminderPlanTimeDTO,
} from "../utils/commons";
import MedicationIcon from "@mui/icons-material/Medication";
import dayjs from "dayjs";
type Props = {};

const MedicationPlanShow = () => {
  const { permissions, isLoading } = usePermissions<Role>();
  const rawAuth = localStorage.getItem("auth");
  const auth = JSON.parse(rawAuth ? rawAuth : "{}");
  if (isLoading)
    return (
      <Box>
        <Skeleton />
      </Box>
    );
  return (
    <>
      <Head>
        <title>Medication Plan Detail</title>
      </Head>
      <Show
        resource={
          // permissions.name === "ADMIN" || permissions.name === "HOSPITAL_ADMIN"
          //   ? "medication-plans"
          //   : `medication-plans/associated-med-plans/${auth?.code}`
          "medication-plans"
        }
        title="Medication Plan Detail"
        actions={
          permissions.name === "ADMIN" ? (
            <>
              <EditButton />
              <DeleteButton />
            </>
          ) : (
            false
          )
        }
        emptyWhileLoading>
        <WithRecord
          render={(record) => {
            return (
              <Typography
                variant="h4"
                color={(theme) => theme.palette.success.darker}
                sx={{ textAlign: "center", paddingTop: "24px" }}>
                Detail information about &quot;{record.name}&quot; Medication
                Plan
              </Typography>
            );
          }}
        />
        <Card>
          <Grid container spacing={4} padding={6}>
            {/* <ReferenceField
            source="doctorAccountId"
            reference="doctors"
            link="show"
          /> */}

            <Grid item container md={6} xs={12}>
              <Grid item xs={4}>
                <Typography
                  variant="body2"
                  color={(theme) => theme.palette.success.dark}>
                  Medication Plan ID:
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <TextField source="id" variant="body2" />
              </Grid>
            </Grid>
            <Grid item container md={6} xs={12}>
              <Grid item xs={4}>
                <Typography
                  variant="body2"
                  color={(theme) => theme.palette.success.dark}>
                  Medication Plan Name:
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <TextField source="name" variant="body2" />
              </Grid>
            </Grid>
            <Grid item container md={6} xs={12}>
              <Grid item xs={4}>
                <Typography
                  variant="body2"
                  color={(theme) => theme.palette.success.dark}>
                  Patient ID:
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <ReferenceField
                  source="patientAccountId"
                  reference="patients"
                  link="show"
                />
              </Grid>
            </Grid>
            <Grid item container md={6} xs={12}>
              <Grid item xs={4}>
                <Typography
                  variant="body2"
                  color={(theme) => theme.palette.success.dark}>
                  Doctor In Charge:
                </Typography>
              </Grid>
              <Grid item xs={8}>
                {/* <ReferenceField
                  source="doctorAccountId"
                  reference="doctors"
                  link="show"
                /> */}
                <TextField source="doctorAccountId" />
              </Grid>
            </Grid>
            <Grid item container md={6} xs={12}>
              <Grid item xs={4}>
                <Typography
                  variant="body2"
                  color={(theme) => theme.palette.success.dark}>
                  Medication Plan Creation Date:
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <DateField source="createdAt" variant="body2" />
              </Grid>
            </Grid>
            <Grid item container md={6} xs={12}>
              <Grid item xs={4}>
                <Typography
                  variant="body2"
                  color={(theme) => theme.palette.success.dark}>
                  Medication Plan Last Update Date:
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <DateField source="updatedAt" variant="body2" />
              </Grid>
            </Grid>
            <Grid item container md={6} xs={12}>
              <Grid item xs={4}>
                <Typography
                  variant="body2"
                  color={(theme) => theme.palette.success.dark}>
                  Medication Plan Taken/Total Times:
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <TextField source="countTaken" />/
                <TextField source="countTotal" />
              </Grid>
            </Grid>
            <Grid item container md={6} xs={12}>
              <Grid item xs={4}>
                <Typography
                  variant="body2"
                  color={(theme) => theme.palette.success.dark}>
                  Medication Plan Completion State:
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <BooleanField source="completed" />
              </Grid>
            </Grid>
          </Grid>
          <Typography
            variant="h4"
            color="primary"
            paddingLeft={1}
            marginBottom={2}>
            About the details of each reminder time:
          </Typography>
          <WithRecord
            render={(record) => {
              return record.reminderPlans.map(
                (reminderPlan: ReminderPlanDTO, index: number) => {
                  return (
                    <Stack key={index} direction="row" spacing={2}>
                      <Card>
                        <CardHeader
                          avatar={
                            <MedicationIcon
                              sx={{
                                width: 40,
                                height: 40,
                              }}
                            />
                          }
                          title={
                            <Typography variant="h4">
                              {`Reminder Plan for ${reminderPlan.medication.name}
                          `}{" "}
                            </Typography>
                          }
                        />
                        <CardContent>
                          <Grid container item xs={12} md={6} spacing={4}>
                            <Grid item xs={12} md={4}>
                              Frequency:
                            </Grid>
                            <Grid item xs={12} md={8}>
                              {reminderPlan.frequency === "DAY_INTERVAL"
                                ? "Take by interval of days"
                                : "Take by selected days in a week"}
                            </Grid>
                            <Grid item xs={12} md={4}>
                              Total pills to take:
                            </Grid>
                            <Grid item xs={12} md={8}>
                              {reminderPlan.stock}
                            </Grid>
                            <Grid item xs={12} md={4}>
                              Starting Date:
                            </Grid>
                            <Grid item xs={12} md={8}>
                              {dayjs(reminderPlan.startDate).format(
                                "DD/MM/YYYY"
                              )}
                            </Grid>
                            <Grid item xs={12} md={4}>
                              Ending Date:
                            </Grid>
                            <Grid item xs={12} md={8}>
                              {dayjs(reminderPlan.endDate).format("DD/MM/YYYY")}
                            </Grid>
                            <Grid item xs={12} md={4}>
                              Medication to take:
                            </Grid>
                            <Grid item xs={12} md={8}>
                              {reminderPlan.medication.name}
                            </Grid>
                            <Grid item xs={12} md={4}>
                              Medication to take ID:
                            </Grid>
                            <Grid item xs={12} md={8}>
                              {
                                <ReferenceField
                                  source={`reminderPlans[${index}].medication.id`}
                                  reference="medications"
                                  link="show"
                                  sx={{
                                    fontSize: "1.2rem",
                                  }}
                                />
                              }
                            </Grid>
                            {reminderPlan.reminderPlanTimes.map(
                              (item: ReminderPlanTimeDTO, idx: number) => (
                                <Grid key={idx} item xs={12} md={6}>
                                  <Grid item>
                                    Taken:{" "}
                                    <BooleanField
                                      source={`reminderPlans[${index}].reminderPlanTimes[${idx}].isTaken`}
                                    />
                                  </Grid>
                                  <Grid item>
                                    Skipped:{" "}
                                    <BooleanField
                                      source={`reminderPlans[${index}].reminderPlanTimes[${idx}].isSkipped`}
                                    />
                                  </Grid>
                                  <Grid item>
                                    Dosage:{" "}
                                    <TextField
                                      source={`reminderPlans[${index}].reminderPlanTimes[${idx}].dosage`}
                                    />
                                  </Grid>
                                  <Grid item>
                                    Taken time:{" "}
                                    <DateField
                                      source={`reminderPlans[${index}].reminderPlanTimes[${idx}].time`}
                                      showTime
                                      // showDate={false}
                                    />
                                  </Grid>
                                </Grid>
                              )
                            )}
                          </Grid>
                        </CardContent>
                      </Card>
                    </Stack>
                  );
                }
              );
            }}
          />
        </Card>
      </Show>
    </>
  );
};

export default MedicationPlanShow;
