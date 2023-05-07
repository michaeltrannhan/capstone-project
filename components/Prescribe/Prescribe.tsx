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
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import MedicationPlanServices from "./MedicationPlanServices";
import MedicationSearchBar from "./MedicationSearchBar";

import { useGetIdentity } from "react-admin";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import Input from "../form-components/Input";
import MultipleSelect from "../form-components/MultiSelect";
import DebouncedInput from "../form-components/DebouncedInput";
import { convertTimeToHoursMinutes } from "../utils/commons";
import { convertHoursMinutesStringToDate } from "../utils/commons";
import Image from "next/image";

const Prescribe = () => {
  const [currentMedication, setCurrentMedication] = useState<Medication | null>(
    null
  );
  const [currentImage, setCurrentImage] = useState<string>("");
  const generateQR = async (text: string) => {
    try {
      const url = await QRCode.toDataURL(text);
      setCurrentImage(url);
    } catch (err) {
      console.error(err);
    }
  };
  const { data, isLoading, error } = useGetIdentity();

  const handleSubmit = async (
    values: MedicationPlanForm,
    actions: FormikHelpers<MedicationPlanForm>
  ) => {
    console.log(JSON.stringify(values, null, 2));
    try {
      const res = await MedicationPlanServices.createMedicationPlan(values);
      console.log(res);
      return Promise.resolve(res);
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
      <Grid container spacing={2} marginTop={5} paddingLeft="40px">
        <Typography variant="h4">Basic Patient Information</Typography>
        <Divider sx={{ p: "10px", width: "100%" }} />
        <Grid
          item
          xs={12}
          sm={6}
          display="flex"
          // direction="row"
          justifyContent="space-between"
          alignItems="center">
          <Grid item xs>
            <Typography variant="h5">Patient Number</Typography>
          </Grid>
          <Grid item xs>
            <DebouncedInput
              onChange={handleCurrentPatientInfo}></DebouncedInput>
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          display="flex"
          // direction="row"
          justifyContent="space-between"
          alignItems="center">
          <Grid item xs>
            <Typography variant="h5">Patient ID</Typography>
          </Grid>
          <Grid item xs>
            <TextField
              value={formik.values.patientId || ""}
              onChange={formik.handleChange}
              disabled
              fullWidth
              variant="outlined"
            />
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          display="flex"
          // direction="row"
          justifyContent="space-between"
          alignItems="center">
          <Grid item xs>
            <Typography variant="h5">Medication Plan Name</Typography>
          </Grid>
          <Grid item xs>
            <TextField
              name="name"
              onChange={formik.handleChange}
              fullWidth
              variant="outlined"
            />
          </Grid>
        </Grid>

        <Divider sx={{ p: "10px", width: "100%" }} />
        <Typography variant="h4" sx={{ marginY: "10px" }}>
          List of Medication
        </Typography>
        <Divider sx={{ p: "10px", width: "100%" }} />

        <Grid
          item
          xs={12}
          display="flex"
          // direction="row"
          justifyContent="center"
          alignItems="center"
          alignContent="center">
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
          <Grid item xs={12}>
            {formik.values.reminderPlans.map((reminderPlan, index) => (
              <List
                key={index}
                sx={{ width: "100%", bgcolor: "background.paper" }}>
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
                      <Tooltip title="Edit Reminder Plan" placement="top-start">
                        <IconButton
                          edge="start"
                          aria-label="edit"
                          onClick={() => {
                            alert(JSON.stringify(reminderPlan, null, 2));
                          }}
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
                    <Typography>{reminderPlan.medicationName}</Typography>
                  </ListItemText>
                </ListItem>
                <Divider />
                <Typography align="center">
                  Reminder Plan for {`${reminderPlan.medicationName}`}
                </Typography>

                <Grid container>
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

                <InputLabel id="frequency-select">Frequency</InputLabel>
                <Select
                  fullWidth
                  labelId="frequency-select"
                  // defaultValue={formik.values.reminderPlans[index].frequency}
                  value={formik.values.reminderPlans[index].frequency}
                  onChange={(e) => {
                    handleSelectFrequency(index)(e.target.value as Frequency);
                  }}>
                  {FrequencyOptions.map((frequency, index) => (
                    <MenuItem key={index} value={frequency.value}>
                      {frequency.label}
                    </MenuItem>
                  ))}
                </Select>
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
                <Divider sx={{ p: "10px", width: "100%" }} />

                {formik.values.reminderPlans[index].reminderPlanTimes.length >
                  0 && (
                  <Grid>
                    {formik.values.reminderPlans[index].reminderPlanTimes.map(
                      (reminderPlanTime, reminderPlanTimeIndex) => (
                        <Grid container key={reminderPlanTimeIndex}>
                          <Grid item xs={6}>
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
                          <Grid item xs={6}>
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
                                <TextField variant="outlined" {...props} />
                              )}
                            />
                          </Grid>
                        </Grid>
                      )
                    )}
                  </Grid>
                )}
              </List>
            ))}
          </Grid>
        )}
        {/* <img src={currentImage} alt="QRCode"></img> */}
        {formik.values.reminderPlans.length > 0 && <div></div>}
        {currentImage !== "" ? (
          <Image src={currentImage} alt="QRCode"></Image>
        ) : null}
        <Button onClick={handleGenerateQRCode}>Save</Button>
        <Button type="submit"> Submit </Button>
      </Grid>
    </form>
  );
};
export default Prescribe;
