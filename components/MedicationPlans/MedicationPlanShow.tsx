import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  Modal,
  Skeleton,
  Stack,
  Tab,
  Tabs,
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
  ImageField,
} from "react-admin";
import {
  ReminderPlanDTO,
  Role,
  ReminderPlan,
  ReminderPlanTimeDTO,
} from "../utils/commons";
import MedicationIcon from "@mui/icons-material/Medication";
import dayjs from "dayjs";
import PieChart from "./PieChart";
import Image from "next/image";
type Props = {};

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

const MedicationPlanShow = () => {
  const { permissions, isLoading } = usePermissions<Role>();
  const rawAuth = localStorage.getItem("auth");
  const auth = JSON.parse(rawAuth ? rawAuth : "{}");
  const [value, setValue] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
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
        resource={"medication-plans"}
        title="Medication Plan Detail"
        sx={{
          "& .RaShow-main	": {
            padding: "20px",
          },
          "& .RaShow-card": {
            padding: "20px",
          },
          width: "60%",
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "center",
          alignContent: "center",
          justifyItems: "center",
          alignSelf: "center",
          // overflowY: "hidden",
        }}
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
          <Grid
            container
            spacing={4}
            padding={6}
            sx={{
              alignItems: "center",
              alignContent: "center",
            }}>
            <Grid item container md={6} xs={12}>
              <Grid item xs={4}>
                <Typography
                  variant="body2"
                  color={(theme) => theme.palette.success.dark}>
                  Medication Plan ID:
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <TextField fontSize={20} source="id" variant="body2" />
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
                <TextField fontSize={20} source="name" variant="body2" />
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
                  sx={{ fontSize: "20px" }}
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
                <TextField fontSize={20} source="doctorAccountId" />
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
                <DateField fontSize={20} source="createdAt" variant="body2" />
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
                <DateField fontSize={20} source="updatedAt" variant="body2" />
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
                <TextField fontSize={20} source="countTaken" />/
                <TextField fontSize={20} source="countTotal" />
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
                <BooleanField fontSize={20} source="completed" />
              </Grid>
            </Grid>
            <Grid item container>
              <Grid item xs={2}>
                <Typography
                  variant="body2"
                  color={(theme) => theme.palette.success.dark}>
                  Medication Plan Note:
                </Typography>
              </Grid>
              <Grid item xs={10}>
                <TextField fontSize={20} source="note" />
              </Grid>
            </Grid>
            <Grid item container>
              <Grid item xs>
                <WithRecord
                  render={(record) => (
                    <div>
                      <Button onClick={handleOpen}>Open Bill</Button>
                      <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description">
                        <Box
                          sx={{
                            position: "absolute" as "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            borderRadius: "20px",
                            width: 1200,
                            height: "auto",
                            bgcolor: "background.paper",
                            border: "none",
                            boxShadow: 24,
                            p: 4,
                            justifyContent: "center",
                          }}>
                          <Image
                            src={record.bill.filePath}
                            alt="Bill"
                            width={1080}
                            height={720}
                          />
                        </Box>
                      </Modal>
                    </div>
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
            About the details of each reminder time:
          </Typography>
          <WithRecord
            render={(record) => {
              return (
                <>
                  <Tabs
                    orientation="horizontal"
                    value={value}
                    onChange={handleChange}
                    centered>
                    {record.reminderPlans.map(
                      (reminderPlan: ReminderPlanDTO, index: number) => {
                        return (
                          <Tab
                            key={index}
                            label={reminderPlan.medication.name}
                            {...a11yProps(index)}
                          />
                        );
                      }
                    )}
                  </Tabs>
                  {record.reminderPlans.map(
                    (reminderPlan: ReminderPlanDTO, index: number) => {
                      const reminderPlanTime = reminderPlan.reminderPlanTimes;
                      return (
                        <TabPanel key={index} value={value} index={index}>
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
                              <Grid container item xs={12} spacing={4}>
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
                                  {dayjs(reminderPlan.endDate).format(
                                    "DD/MM/YYYY"
                                  )}
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

                                <Grid
                                  item
                                  xs={12}
                                  sx={{
                                    width: "50%",
                                  }}>
                                  <PieChart
                                    reminderPlanTimes={
                                      reminderPlan.reminderPlanTimes
                                    }
                                  />
                                </Grid>
                              </Grid>
                            </CardContent>
                          </Card>
                        </TabPanel>
                      );
                    }
                  )}
                </>
              );
            }}
          />
        </Card>
      </Show>
    </>
  );
};

export default MedicationPlanShow;
