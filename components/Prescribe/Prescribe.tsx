import { useFormik, FormikHelpers } from "formik";
import {
  DaysOfWeekOptions,
  Frequency,
  FrequencyOptions,
  Medication,
  MedicationPlanForm,
  SelectedDaysReminderPlanForm,
} from "../utils/commons";
import QRCode from "qrcode";
import {
  createMedicationPlanForm,
  createIntervalReminderPlan,
  createSelectedDaysReminderPlan,
  createReminderPlanTime,
} from "../utils/formBuilder";

import {
  Box,
  Button,
  Divider,
  Grid,
  List,
  TextField,
  Typography,
  ListItem,
  IconButton,
  ListItemText,
  Tooltip,
  Select,
  InputLabel,
  MenuItem,
  Card,
  Modal,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import MedicationPlanServices from "./MedicationPlanServices";
import MedicationSearchBar from "./MedicationSearchBar";

import { useGetIdentity, useNotify } from "react-admin";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import Input from "../form-components/Input";
import MultipleSelect from "../form-components/MultiSelect";
import DebouncedInput from "../form-components/DebouncedInput";
import { convertTimeToHoursMinutes } from "../utils/commons";
import { convertHoursMinutesStringToDate } from "../utils/commons";
import Image from "next/image";
import Head from "next/head";
import style from "styled-jsx/style";
import dayjs from "dayjs";
import CheckInteractions from "./CheckInteractions";
import CustomModal from "./Modal";

const Prescribe = () => {
  const [currentMedication, setCurrentMedication] = useState<Medication | null>(
    null
  );
  const [currentImage, setCurrentImage] = useState<string>("");
  const [openPlan, setOpenPlan] = useState<boolean>(false);
  const handlePlanOpen = () => setOpenPlan(true);
  const handlePlanClose = () => setOpenPlan(false);
  const [open, setOpen] = useState(false);
  const handleModalOpen = () => {
    setOpen(true);
    handleGenerateQRCode();
  };
  const handleModalClose = () => setOpen(false);
  const generateQR = async (text: string) => {
    try {
      const url = await QRCode.toDataURL(text);
      setCurrentImage(url);
    } catch (err) {
      console.error(err);
    }
  };
  const { data, isLoading, error } = useGetIdentity();
  const notify = useNotify();
  const handleSubmit = async (
    values: MedicationPlanForm,
    actions: FormikHelpers<MedicationPlanForm>
  ) => {
    // console.log(JSON.stringify(values, null, 2));
    try {
      const res = await MedicationPlanServices.createMedicationPlan(values);
      console.log(res);
      return Promise.resolve(res).then(() => {
        notify("Created new medication plan successfully", { type: "success" });
        actions.resetForm();
      });
    } catch (error) {
      console.log(error);
    }
  };

  const initialValues = useMemo(() => {
    return createMedicationPlanForm(parseInt(data?.id as string, 10));
  }, [data]);

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: handleSubmit,
  });

  const handleDoctorIdChange = (value: number) => {
    formik.values.doctorId = value;
    formik.setValues(formik.values);
  };

  const handleGenerateQRCode = () => {
    const medicationPlan = formik.values;
    const stringifiedMedicationPlan = JSON.stringify(medicationPlan);
    // console.log(stringifiedMedicationPlan);
    generateQR(stringifiedMedicationPlan);
  };

  const handleCurrentPatientInfo = (value: any) => {
    // console.log(value);
    if (!isLoading) {
      handleDoctorIdChange(data?.id as number);
    }
    const patientId = value.id;
    // console.log(patientId);
    // const patientName = `${value.firstName} ${value.lastName}`;
    // console.log(value.lastName);
    // formik.values.name = patientName;
    formik.values.patientId = patientId;
    formik.setValues(formik.values);
  };

  const handleSearchCurrentPatient = (inputValue: string) => {};

  const handleReminderPlanTimeDosageTime =
    (reminderPlanIndex: number, reminderPlanTimeIndex: number) =>
    (value: Date | null) => {
      // const result = convertTimeToString(value as Date);
      // console.log(result);
      formik.values.reminderPlans[reminderPlanIndex].reminderPlanTimes[
        reminderPlanTimeIndex
      ].time = convertTimeToHoursMinutes(value as Date);
      formik.setValues(formik.values);
    };

  const handleChangeDosage =
    (reminderPlanIndex: number, reminderPlanTimeIndex: number) =>
    (value: number) => {
      formik.values.reminderPlans[reminderPlanIndex].reminderPlanTimes[
        reminderPlanTimeIndex
      ].dosage = value;
      formik.setValues(formik.values);
    };

  const handleAddReminderPlanTime = (index: number) => (value: number) => {
    const reminderPlanTimes =
      formik.values.reminderPlans[index].reminderPlanTimes;
    const quantity = reminderPlanTimes.length;
    const newQuantity = value;
    if (newQuantity <= quantity) {
      formik.values.reminderPlans[index].reminderPlanTimes =
        reminderPlanTimes.slice(0, newQuantity);
    } else {
      const newReminderPlanTimes = [...Array(newQuantity - quantity)].map(() =>
        createReminderPlanTime()
      );
      formik.values.reminderPlans[index].reminderPlanTimes = [
        ...reminderPlanTimes,
        ...newReminderPlanTimes,
      ];
    }
    formik.setValues(formik.values);
  };

  const handleStartDateChange = (index: number) => (date: Date | null) => {
    const reminderPlan = formik.values.reminderPlans[index];
    reminderPlan.startDate = date as Date;
    formik.values.reminderPlans[index] = reminderPlan;
    formik.setValues(formik.values);
  };

  const handleEndDateChange =
    (index: number) => (date: Date | null | undefined) => {
      if (!date) return;
      const reminderPlan = formik.values.reminderPlans[index];
      reminderPlan.endDate = date as Date;
      formik.values.reminderPlans[index] = reminderPlan;
      formik.setValues(formik.values);
    };

  const handleMultiSelectChange = (index: number) => (values: string[]) => {
    const reminderPlan = formik.values.reminderPlans[
      index
    ] as SelectedDaysReminderPlanForm;
    reminderPlan.selectedDays = values.map((value) => Number(value));
    formik.values.reminderPlans[index] = reminderPlan;
    formik.setValues(formik.values);
  };

  const handleSelectFrequency = (index: number) => (value: Frequency) => {
    let reminderPlan = formik.values.reminderPlans[index];
    let medicationName = reminderPlan.medicationName;
    let medicationId = reminderPlan.medicationId;
    switch (value as Frequency) {
      case Frequency.INTERVAL:
        formik.values.reminderPlans[index] = createIntervalReminderPlan(
          medicationName as string,
          medicationId as number
        );
        if (reminderPlan.reminderPlanTimes.length > 0) {
          const temporaryReminderPlanTime = reminderPlan.reminderPlanTimes;
          formik.values.reminderPlans[index].reminderPlanTimes =
            temporaryReminderPlanTime;
        }
        formik.setValues(formik.values);
        break;
      case Frequency.SELECTED_DAYS:
        formik.values.reminderPlans[index] = createSelectedDaysReminderPlan(
          medicationName as string,
          medicationId as number
        );
        if (reminderPlan.reminderPlanTimes.length > 0) {
          const temporaryReminderPlanTime = reminderPlan.reminderPlanTimes;
          formik.values.reminderPlans[index].reminderPlanTimes =
            temporaryReminderPlanTime;
        }
        formik.setValues(formik.values);
        break;
    }
  };

  const handleDeleteReminderPlan = (index: number) => {};

  const handleAddReminderPlan = (medication: Medication) => {
    if (medication.id === undefined) return;
    if (
      formik.values.reminderPlans.find(
        (reminderPlan) => reminderPlan.medicationId === medication.id
      )
    ) {
      return alert("Medication already added");
    }
    const reminderPlan = createIntervalReminderPlan(
      medication.name,
      medication.id
    );
    formik.values.reminderPlans = [
      ...formik.values.reminderPlans,
      reminderPlan,
    ];
    formik.setValues({ ...formik.values });
  };
  const handleMedicationPlanName = (value: string) => {
    formik.values.name = value;
    formik.setValues(formik.values);
  };
  const handleInteractions = () => {
    const filteredMedications = formik.values.reminderPlans.filter(
      (medication) => medication.medicationId
    );
    console.log(filteredMedications);
    if (filteredMedications.length === 0) return;
  };
  return (
    <form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
      <Head>
        <title>Prescribe</title>
      </Head>
      <Grid
        container
        spacing={4}
        sx={{
          marginTop: 0,
          marginLeft: 0,
          width: "100%",
        }}
        padding={4}
        // bgcolor={(theme) => theme.palette.background.paper}
      >
        <Typography variant="h4">Basic Patient Information</Typography>
        <Divider sx={{ p: "10px", width: "100%" }} />
        <Grid item container xs={12} md={6} sx={{ paddingTop: "8px" }}>
          <Grid
            item
            xs={12}
            md={4}
            alignItems="center"
            alignSelf="center"
            justifyContent="space-between">
            <Typography variant="body1" fontSize={20}>
              Patient Phone Number
            </Typography>
          </Grid>
          <Grid item xs={12} md={8}>
            <DebouncedInput onChange={handleCurrentPatientInfo} />
          </Grid>
        </Grid>
        <Grid item container xs={12} md={6} sx={{ paddingTop: "8px" }}>
          <Grid item xs={4} alignSelf="center">
            <Typography variant="body1" fontSize={20}>
              Patient ID
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <TextField
              value={formik.values.patientId || ""}
              onChange={formik.handleChange}
              disabled
              fullWidth
              variant="outlined"
            />
          </Grid>
        </Grid>
        <Grid item container xs={12} md={6}>
          <Grid item xs={12} md={4} alignSelf="center">
            <Typography variant="body1" fontSize={20}>
              Medication Plan Name
            </Typography>
          </Grid>
          <Grid item xs={12} md={8}>
            <TextField
              name="name"
              onChange={formik.handleChange}
              fullWidth
              label="Medication Plan Name"
              variant="outlined"
            />
          </Grid>
        </Grid>

        <Divider sx={{ p: "10px", width: "100%" }} />
        <Typography variant="h4" sx={{ marginTop: "10px" }}>
          List of Medication
        </Typography>
        <Grid
          item
          container
          xs={12}
          display="flex"
          // direction="row"
          justifyContent="center"
          alignItems="center"
          alignContent="center">
          <Grid item xs={6} md={2}>
            <Typography variant="body1" fontSize={20}>
              Enter Medication Name
            </Typography>
          </Grid>
          <Grid item xs>
            <MedicationSearchBar
              onChange={(e: any, newValue: Medication) => {
                setCurrentMedication(newValue);
              }}
            />
          </Grid>
          <Grid item xs>
            <Button
              variant="outlined"
              sx={{ height: "100%" }}
              onClick={(e) => {
                currentMedication
                  ? handleAddReminderPlan(currentMedication)
                  : null;
              }}>
              Add Medication
            </Button>
          </Grid>
        </Grid>

        {formik.values.reminderPlans.length > 0 && (
          <Grid
            sx={{
              // marginLeft: "30px",
              alignItems: "center",
              justifyContent: "center",
              alignSelf: "center",
              alignContent: "center",
              justifySelf: "center",
              width: "100%",
            }}
            item
            container
            spacing={2}
            xs={12}>
            {formik.values.reminderPlans.map((reminderPlan, index) => (
              <Grid
                key={index}
                item
                xs={12}
                justifyContent="center"
                alignItems="center">
                <Card
                  sx={{
                    width: "100%",
                    bgcolor: "background.paper",
                    padding: "24px",
                    alignItems: "center",
                    justifyContent: "center",
                    alignSelf: "center",
                    justifySelf: "center",
                  }}>
                  <ListItem
                    secondaryAction={
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          width: "fit-content",
                          bgcolor: "background.paper",
                          color: "text.secondary",
                          borderRadius: "5px",
                        }}>
                        <Tooltip
                          title="Edit Reminder Plan"
                          placement="top-start">
                          <IconButton
                            edge="start"
                            aria-label="edit"
                            onClick={
                              //   () => {
                              //   alert(JSON.stringify(reminderPlan, null, 2));
                              // }
                              handlePlanOpen
                            }
                            sx={{
                              "&:hover": {
                                color: "primary.main",
                                borderRadius: "5px",
                              },
                            }}>
                            <FontAwesomeIcon icon={faPenToSquare} />
                          </IconButton>
                        </Tooltip>
                        <Divider
                          orientation="vertical"
                          variant="middle"
                          flexItem
                        />
                        <Tooltip
                          title="Delete Reminder Plan"
                          placement="top-start">
                          <IconButton
                            edge="end"
                            aria-label="delete"
                            sx={{
                              "&:hover": {
                                color: "primary.main",
                                borderRadius: "5px",
                              },
                            }}>
                            <FontAwesomeIcon icon={faTrash} />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    }>
                    <ListItemText>
                      <Typography variant="body1" fontSize={24}>
                        {reminderPlan.medicationName}
                      </Typography>
                    </ListItemText>
                  </ListItem>
                  <CustomModal
                    open={openPlan}
                    handleClose={handlePlanClose}
                    medicationName={reminderPlan.medicationName}>
                    <Grid container spacing={4}>
                      <Grid item xs={6}>
                        <DatePicker
                          label="Start Date"
                          value={formik.values.reminderPlans[index].startDate}
                          onChange={(date) => {
                            handleStartDateChange(index)(date);
                          }}
                          renderInput={(props) => (
                            <TextField variant="outlined" {...props} />
                          )}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <DatePicker
                          label="End Date"
                          value={formik.values.reminderPlans[index].endDate}
                          onChange={(date) => {
                            handleEndDateChange(index)(date);
                          }}
                          renderInput={(props) => (
                            <TextField variant="outlined" {...props} />
                          )}
                        />
                      </Grid>
                    </Grid>
                    <Grid
                      item
                      container
                      xs={12}
                      columnSpacing={2}
                      rowSpacing={2}>
                      <Grid item xs={12} md={2}>
                        <InputLabel id="frequency-select">Frequency</InputLabel>
                        <Select
                          fullWidth
                          labelId="frequency-select"
                          // defaultValue={formik.values.reminderPlans[index].frequency}
                          value={formik.values.reminderPlans[index].frequency}
                          onChange={(e) => {
                            handleSelectFrequency(index)(
                              e.target.value as Frequency
                            );
                          }}>
                          {FrequencyOptions.map((frequency, index) => (
                            <MenuItem key={index} value={frequency.value}>
                              {frequency.label}
                            </MenuItem>
                          ))}
                        </Select>
                      </Grid>
                      <Grid item xs={12} md={8} marginTop={1.8}>
                        {reminderPlan.frequency === Frequency.INTERVAL ? (
                          <>
                            <Input
                              name={`reminderPlans[${index}].interval`}
                              value={reminderPlan.interval}
                              label="What is the interval?"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              variant="outlined"
                              sx={{ width: "100%" }}
                            />
                          </>
                        ) : reminderPlan.frequency ===
                          Frequency.SELECTED_DAYS ? (
                          <>
                            <MultipleSelect
                              label="What days in a week?"
                              options={DaysOfWeekOptions}
                              onChange={handleMultiSelectChange(index)}
                            />
                          </>
                        ) : null}
                      </Grid>
                      <Grid item xs={12} md={2}>
                        <InputLabel id="times-per-day">
                          How many times to take each day?
                        </InputLabel>
                        <Select
                          fullWidth
                          labelId="times-per-day"
                          defaultValue={1}
                          onChange={(newValue) => {
                            handleAddReminderPlanTime(index)(
                              newValue.target.value as number
                            );
                          }}>
                          {Array.from(Array(10).keys()).map((number) => (
                            <MenuItem key={number} value={number}>
                              {number}
                            </MenuItem>
                          ))}
                        </Select>
                      </Grid>
                    </Grid>

                    <Divider sx={{ p: "10px", width: "100%" }} />

                    {formik.values.reminderPlans[index].reminderPlanTimes
                      .length > 0 && (
                      <>
                        {formik.values.reminderPlans[
                          index
                        ].reminderPlanTimes.map(
                          (reminderPlanTime, reminderPlanTimeIndex) => (
                            <Grid
                              container
                              key={reminderPlanTimeIndex}
                              columnSpacing={2}
                              direction="row">
                              <Grid item xs={6} md={3}>
                                <InputLabel id="dosage">Dosage</InputLabel>
                                <Select
                                  fullWidth
                                  labelId="dosage"
                                  // defaultValue={0}
                                  value={
                                    formik.values.reminderPlans[index]
                                      .reminderPlanTimes[reminderPlanTimeIndex]
                                      .dosage
                                  }
                                  onChange={(newValue) => {
                                    handleChangeDosage(
                                      index,
                                      reminderPlanTimeIndex
                                    )(newValue.target.value as number);
                                  }}>
                                  {Array.from(Array(10).keys()).map(
                                    (number) => (
                                      <MenuItem key={number} value={number}>
                                        {number}
                                      </MenuItem>
                                    )
                                  )}
                                </Select>
                              </Grid>
                              <Grid item xs={6} md={3}>
                                <InputLabel id="dosage-time">Time</InputLabel>
                                <TimePicker
                                  label="Dosage time"
                                  value={convertHoursMinutesStringToDate(
                                    reminderPlanTime.time
                                  )}
                                  onChange={(newValue: Date | null) => {
                                    handleReminderPlanTimeDosageTime(
                                      index,
                                      reminderPlanTimeIndex
                                    )(newValue as Date);
                                  }}
                                  renderInput={(props) => (
                                    <TextField
                                      variant="outlined"
                                      size="medium"
                                      sx={{
                                        marginTop: 0,
                                      }}
                                      {...props}
                                    />
                                  )}
                                />
                              </Grid>
                            </Grid>
                          )
                        )}
                      </>
                    )}
                    <Button onClick={handlePlanClose}>Save</Button>
                  </CustomModal>
                  {/* <Grid container spacing={4}>
                    <Grid item xs={6}>
                      <DatePicker
                        label="Start Date"
                        value={formik.values.reminderPlans[index].startDate}
                        onChange={(date) => {
                          handleStartDateChange(index)(date);
                        }}
                        renderInput={(props) => (
                          <TextField variant="outlined" {...props} />
                        )}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <DatePicker
                        label="End Date"
                        value={formik.values.reminderPlans[index].endDate}
                        onChange={(date) => {
                          handleEndDateChange(index)(date);
                        }}
                        renderInput={(props) => (
                          <TextField variant="outlined" {...props} />
                        )}
                      />
                    </Grid>
                  </Grid>
                  <Grid item container xs={12} columnSpacing={2} rowSpacing={2}>
                    <Grid item xs={12} md={2}>
                      <InputLabel id="frequency-select">Frequency</InputLabel>
                      <Select
                        fullWidth
                        labelId="frequency-select"
                        // defaultValue={formik.values.reminderPlans[index].frequency}
                        value={formik.values.reminderPlans[index].frequency}
                        onChange={(e) => {
                          handleSelectFrequency(index)(
                            e.target.value as Frequency
                          );
                        }}>
                        {FrequencyOptions.map((frequency, index) => (
                          <MenuItem key={index} value={frequency.value}>
                            {frequency.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </Grid>
                    <Grid item xs={12} md={8} marginTop={1.8}>
                      {reminderPlan.frequency === Frequency.INTERVAL ? (
                        <>
                          <Input
                            name={`reminderPlans[${index}].interval`}
                            label="What is the interval?"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            variant="outlined"
                            sx={{ width: "100%" }}
                          />
                        </>
                      ) : reminderPlan.frequency === Frequency.SELECTED_DAYS ? (
                        <>
                          <MultipleSelect
                            label="What days in a week?"
                            options={DaysOfWeekOptions}
                            onChange={handleMultiSelectChange(index)}
                          />
                        </>
                      ) : null}
                    </Grid>
                    <Grid item xs={12} md={2}>
                      <InputLabel id="times-per-day">
                        How many times to take each day?
                      </InputLabel>
                      <Select
                        fullWidth
                        labelId="times-per-day"
                        defaultValue={0}
                        onChange={(newValue) => {
                          handleAddReminderPlanTime(index)(
                            newValue.target.value as number
                          );
                        }}>
                        {Array.from(Array(10).keys()).map((number) => (
                          <MenuItem key={number} value={number}>
                            {number}
                          </MenuItem>
                        ))}
                      </Select>
                    </Grid>
                  </Grid>

                  <Divider sx={{ p: "10px", width: "100%" }} />

                  {formik.values.reminderPlans[index].reminderPlanTimes.length >
                    0 && (
                    <>
                      {formik.values.reminderPlans[index].reminderPlanTimes.map(
                        (reminderPlanTime, reminderPlanTimeIndex) => (
                          <Grid
                            container
                            key={reminderPlanTimeIndex}
                            columnSpacing={2}
                            direction="row">
                            <Grid item xs={6} md={3}>
                              <InputLabel id="dosage">Dosage</InputLabel>
                              <Select
                                fullWidth
                                labelId="dosage"
                                defaultValue={0}
                                onChange={(newValue) => {
                                  handleChangeDosage(
                                    index,
                                    reminderPlanTimeIndex
                                  )(newValue.target.value as number);
                                }}>
                                {Array.from(Array(10).keys()).map((number) => (
                                  <MenuItem key={number} value={number}>
                                    {number}
                                  </MenuItem>
                                ))}
                              </Select>
                            </Grid>
                            <Grid item xs={6} md={3}>
                              <InputLabel id="dosage-time">Time</InputLabel>
                              <TimePicker
                                label="Dosage time"
                                value={convertHoursMinutesStringToDate(
                                  reminderPlanTime.time
                                )}
                                onChange={(newValue: Date | null) => {
                                  handleReminderPlanTimeDosageTime(
                                    index,
                                    reminderPlanTimeIndex
                                  )(newValue as Date);
                                }}
                                renderInput={(props) => (
                                  <TextField
                                    variant="outlined"
                                    size="medium"
                                    sx={{
                                      marginTop: 0,
                                    }}
                                    {...props}
                                  />
                                )}
                              />
                            </Grid>
                          </Grid>
                        )
                      )}
                    </>
                  )} */}
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        <>
          <Modal
            open={open}
            onClose={handleModalClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">
            <Card
              sx={{
                position: "absolute" as "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 1080,
                bgcolor: "background.paper",
                border: "1px solid #00C2CB",
                borderRadius: "20px",
                p: 4,
              }}>
              <Grid container spacing={4}>
                <Grid item xs={12} textAlign="center">
                  <Typography variant="h2" textAlign="center">
                    {formik.values.name} Prescription Form
                  </Typography>
                </Grid>
                <Grid item container xs={12} md={9} spacing={4}>
                  <Grid item xs={12}>
                    <Typography variant="h4" paddingTop={0}>
                      General information
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    {!isLoading && (
                      <TextField
                        value={data?.fullName}
                        fullWidth
                        variant="standard"
                        label="Doctor name"
                        disabled
                      />
                    )}
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      value={formik.values.doctorId}
                      label="Doctor ID"
                      fullWidth
                      variant="standard"
                      disabled
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      value={formik.values.patientId}
                      label="Patient ID"
                      fullWidth
                      variant="standard"
                      disabled
                    />
                  </Grid>
                </Grid>
                <Grid item xs={12} md={3}>
                  <Typography variant="h5" paddingTop={0}>
                    Scan here!
                  </Typography>
                  {currentImage !== "" ? (
                    <Image
                      src={currentImage}
                      alt="QRCode"
                      width={125}
                      height={125}></Image>
                  ) : null}
                </Grid>
              </Grid>

              <Table
                size="medium"
                sx={{
                  borderRadius: "20px",
                  marginTop: "2rem",
                }}>
                <TableHead
                  sx={{
                    color: "#000",

                    "& .MuiTableCell-head": {
                      backgroundColor: "rgba(0, 194, 203, 0.2)",
                    },
                  }}>
                  <TableRow>
                    <TableCell>Medication name</TableCell>
                    <TableCell>Start Date</TableCell>
                    <TableCell>Frequency</TableCell>
                    <TableCell>Time to take each day</TableCell>
                    <TableCell>At times</TableCell>
                    <TableCell>Dosage per remedy</TableCell>
                  </TableRow>
                </TableHead>
                {formik.values.reminderPlans.map((reminderPlan, index) => (
                  <TableBody key={index}>
                    <TableRow>
                      <TableCell>{reminderPlan.medicationName}</TableCell>
                      <TableCell>
                        {dayjs(reminderPlan.startDate).format("DD/MM/YYYY")}
                      </TableCell>
                      <TableCell>
                        {reminderPlan.frequency === "DAY_INTERVAL" &&
                        reminderPlan.interval === 1
                          ? "Daily"
                          : "Selected Days"}
                      </TableCell>
                      <TableCell>
                        {reminderPlan.reminderPlanTimes.length}
                      </TableCell>
                      <TableCell>
                        {reminderPlan.reminderPlanTimes.map((time, index) => (
                          <Chip key={index} label={time.time} />
                        ))}
                      </TableCell>
                      <TableCell>
                        {reminderPlan.reminderPlanTimes.map((time, index) => (
                          <Chip key={index} label={time.dosage} />
                        ))}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                ))}
              </Table>
              <Grid
                container
                sx={{
                  justifyContent: "center",
                }}
                paddingTop={2}>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#00C2CB",
                  }}>
                  Send to Chat
                </Button>
              </Grid>
            </Card>
          </Modal>
        </>
        {formik.values.reminderPlans.length > 0 && <div></div>}
        {/* <CheckInteractions reminderPlan={formik.values.reminderPlans} /> */}
        <Grid
          item
          xs={12}
          justifySelf="center"
          sx={{
            display: "flex",
            justifyContent: "center",
            bottom: "0",
          }}>
          <Button onClick={handleModalOpen}>Generate prescription</Button>
          {/* <Button onClick={handleGenerateQRCode}>Save</Button> */}
          <Button type="submit"> Submit </Button>
        </Grid>
      </Grid>
    </form>
  );
};
export default Prescribe;
