import { useFormik, FormikHelpers } from "formik";
import {
  DaysOfWeekOptions,
  Frequency,
  FrequencyOptions,
  Medication,
  MedicationPlanForm,
  MedicationPlanFormWithId,
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
  TextField,
  Typography,
  Select,
  InputLabel,
  FormControl,
  MenuItem,
  Card,
  Modal,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
  TableContainer,
  Paper,
  ButtonGroup,
  InputAdornment,
  CardActions,
  CardContent,
} from "@mui/material";
import { useEffect, useMemo, useState, useRef } from "react";
import MedicationPlanServices from "./MedicationPlanServices";
import MedicationSearchBar from "./MedicationSearchBar";
import { useGetIdentity, useNotify, useRedirect } from "react-admin";
import {
  faEarthAsia,
  faFlaskVial,
  faMapLocation,
  faNotesMedical,
  faPlus,
  faPrescription,
  faVenusMars,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import MultipleSelect from "../form-components/MultiSelect";
import { convertTimeToHoursMinutes, ReminderPlan } from "../utils/commons";
import { convertHoursMinutesStringToDate } from "../utils/commons";
import Image from "next/image";
import Head from "next/head";
import dayjs from "dayjs";
import CheckInteractions from "./CheckInteractions";
import CustomModal from "./Modal";
import ReminderPlanActions from "./ReminderPlanActions";
import html2canvas from "html2canvas";
import api from "../../services";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import ContactEmergencyIcon from "@mui/icons-material/ContactEmergency";
import { faIdCard } from "@fortawesome/free-solid-svg-icons";

const Prescribe = () => {
  const [currentMedication, setCurrentMedication] = useState<Medication | null>(
    null
  );
  const [currentImage, setCurrentImage] = useState<string>("");
  const [currentPlanIndex, setCurrentPlanIndex] = useState<number>(0);
  const [openPlan, setOpenPlan] = useState<boolean>(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const [currentMedPlanId, setCurrentMedPlanId] = useState<number | null>(null);
  const [checkInteractions, setCheckInteractions] = useState<number>(0);
  const [modalLoaded, setModalLoaded] = useState(false);
  const doctorId = parseInt(localStorage.getItem("id") as string, 10);
  const handlePlanOpen = () => setOpenPlan(true);
  const handlePlanClose = () => setOpenPlan(false);
  const [open, setOpen] = useState(false);
  const handleModalOpen = () => {
    setOpen(true);
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
  const handleSubmit = async (values: MedicationPlanForm) => {
    try {
      // handleGenerateQRCode(80);
      const res = await MedicationPlanServices.createMedicationPlan(values);

      // console.log(res);
      if (res) {
        setCurrentMedPlanId(res?.id as number);
        handleGenerateQRCode(res?.id as number);
        return Promise.resolve(res).then(() => {
          notify(
            `Created medication plan successfully, your id is ${res?.id}`,
            {
              type: "success",
            }
          );
        });
      } else {
        notify("Error creating Medication Plan", { type: "error" });
      }
    } catch (error) {
      // console.log(error);
      notify(`Error: ${error}`, { type: "error" });
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

  const handleGenerateQRCode = (medicationPlanId: number) => {
    const medicationPlan = formik.values;
    const medPlan = {
      medicationPlanId: medicationPlanId,
      doctorId: medicationPlan.doctorId,
      reminderPlans: medicationPlan.reminderPlans,
      name: medicationPlan.name,
    };
    const stringifiedMedicationPlan = JSON.stringify(medPlan);

    console.log(stringifiedMedicationPlan);
    generateQR(stringifiedMedicationPlan);
  };

  const handleReminderPlanTimeDosageTime =
    (reminderPlanIndex: number, reminderPlanTimeIndex: number) =>
    (value: Date | null) => {
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
    let { medicationName, medicationId } = reminderPlan;
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

  const handleDeleteReminderPlan = (index: number) => {
    formik.values.reminderPlans.splice(index, 1);
    formik.setValues(formik.values);
  };

  const handleAddReminderPlan = (medication: Medication) => {
    handleDoctorIdChange(doctorId);
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

  const handleCheckInteractions = () => {
    setCheckInteractions((prev) => prev + 1);
  };

  const handleCaptureModal = async () => {
    if (modalRef.current) {
      const modalElement = modalRef.current;

      const canvas = await html2canvas(modalElement, { useCORS: true });
      const billData = new FormData();

      canvas.toBlob((blob) => {
        const file = new File([blob as Blob], "bill.png", {
          type: blob?.type,
        });
        billData.append("file", file as File);
        api
          .post(`/medication-plans/upload/${currentMedPlanId}`, billData, {
            headers: {
              "Content-Type": "multipart/form-data",
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods":
                "GET,PUT,POST,DELETE,PATCH,OPTIONS",
            },
          })
          .then((billRes) => {
            console.log(billRes.data);
            notify("Uploaded bill successfully", { type: "success" });
            formik.resetForm({ values: initialValues });
            handleModalClose();
          })
          .catch((err) => {
            notify(`Error uploading bill, error: ${err}`, { type: "error" });
          });
      }, "image/png");
    }
  };

  useEffect(() => {
    if (modalRef.current) {
      setModalLoaded(true);
    }
  }, []);
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
          justifyContent: "center",
        }}
        padding={4}>
        <Card
          sx={{
            width: "80%",
            padding: 3,
            alignContent: "center",
          }}>
          <CardContent>
            <Grid item xs={12}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignContent: "center",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}>
                <Typography variant="h3">Basic Patient Information</Typography>
              </Box>
            </Grid>
            <Divider sx={{ p: "10px", width: "100%" }} />
            <Grid item container xs sx={{ paddingTop: "8px" }} spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  name="name"
                  onChange={formik.handleChange}
                  fullWidth
                  label="Medication Plan Name"
                  value={formik.values.name || ""}
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <FontAwesomeIcon icon={faPrescription} size="lg" />
                      </InputAdornment>
                    ),
                  }}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  name="fullName"
                  fullWidth
                  value={formik.values.fullName || ""}
                  label="Patient Full Name"
                  onChange={formik.handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <ContactEmergencyIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  name="phoneNumber"
                  label="Patient Phone number"
                  value={formik.values.phoneNumber || ""}
                  fullWidth
                  onChange={formik.handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <ContactPhoneIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <FormControl sx={{ width: "100%" }}>
                  <InputLabel
                    id="select"
                    sx={{
                      marginTop: -1.5,
                      alignItems: "start",
                      justifySelf: "start",
                      alignSelf: "start",
                    }}>
                    Gender
                  </InputLabel>
                  <Select
                    fullWidth
                    labelId="gender"
                    id="gender-select"
                    label="Gender"
                    variant="outlined"
                    size="small"
                    // placeholder="Gender"

                    inputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <FontAwesomeIcon icon={faVenusMars} size="lg" />
                        </InputAdornment>
                      ),
                    }}
                    name="gender"
                    onChange={formik.handleChange}>
                    <MenuItem value="MALE">Male</MenuItem>
                    <MenuItem value="FEMALE">Female</MenuItem>
                    <MenuItem value="OTHER">Other</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  name="socialSecurityNumber"
                  value={formik.values.socialSecurityNumber || ""}
                  fullWidth
                  label="Social Security Number"
                  onChange={formik.handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <FontAwesomeIcon icon={faIdCard} size="lg" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  name="nationality"
                  fullWidth
                  label="Nationality"
                  value={formik.values.nationality || ""}
                  onChange={formik.handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <FontAwesomeIcon icon={faEarthAsia} size="lg" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  name="address"
                  label="Address"
                  value={formik.values.address || ""}
                  onChange={formik.handleChange}
                  fullWidth
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <FontAwesomeIcon icon={faMapLocation} size="lg" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  name="note"
                  fullWidth
                  value={formik.values.note || ""}
                  label="Doctors Notes"
                  onChange={formik.handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <FontAwesomeIcon icon={faNotesMedical} size="lg" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>
            <Divider sx={{ p: "10px", width: "100%" }} />
            <Typography variant="h3" sx={{ marginTop: "10px" }}>
              List of Medication
            </Typography>
            <Grid
              item
              alignItems="center"
              alignContent="center"
              sx={{
                display: "flex",
                p: 2,
                gap: 1,
              }}>
              <MedicationSearchBar
                onChange={(e: any, newValue: Medication) => {
                  setCurrentMedication(newValue);
                }}
              />

              <ButtonGroup
                variant="outlined"
                size="small"
                sx={{
                  bgcolor: "rgba(0, 194, 203, 0.2)",
                  borderColor: "rgba(0, 194, 203, 0.2)",
                  color: "black",
                }}>
                <Button
                  startIcon={<FontAwesomeIcon icon={faPlus} size="xl" />}
                  size="small"
                  sx={{
                    bgcolor: "rgba(0, 194, 203, 0.2)",
                    borderColor: "rgba(0, 194, 203, 0.2)",
                    textTransform: "none",
                    textAlign: "start",
                    color: "black",
                  }}
                  onClick={(e) => {
                    currentMedication
                      ? handleAddReminderPlan(currentMedication)
                      : null;
                  }}>
                  Add Medication
                </Button>
                <Button
                  startIcon={<FontAwesomeIcon icon={faFlaskVial} size="xl" />}
                  size="small"
                  onClick={handleCheckInteractions}
                  sx={{
                    bgcolor: "rgba(0, 194, 203, 0.2)",
                    borderColor: "rgba(0, 194, 203, 0.2)",
                    textAlign: "start",
                    textTransform: "none",
                    color: "black",
                  }}>
                  Check interactions
                </Button>
              </ButtonGroup>
            </Grid>
            Current index: {currentPlanIndex}
            {formik.values.reminderPlans.length > 0 && (
              <TableContainer
                component={Paper}
                elevation={3}
                sx={{
                  marginTop: "1rem",
                }}>
                <Table
                  sx={{
                    "& .MuiTableCell-head": {
                      backgroundColor: "rgba(0, 194, 203, 0.2)",
                      "& th:first-of-type": {
                        borderTopLeftRadius: "20px",
                      },
                      "& th:last-child": {
                        borderTopRightRadius: "20px",
                      },
                    },

                    "& .MuiTableRow-head": {
                      borderTopLeftRadius: "20px",
                      borderTopRightRadius: "20px",
                    },
                  }}>
                  <TableHead sx={{}}>
                    <TableRow>
                      <TableCell>List of taken medicines</TableCell>
                      <TableCell align="right" width="30px">
                        Actions
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {formik.values.reminderPlans.map((reminderPlan, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <Typography variant="body1" fontSize={20}>
                            {reminderPlan.medicationName}
                          </Typography>
                        </TableCell>
                        <TableCell align="right">
                          <ReminderPlanActions
                            editHandler={() => {
                              setCurrentPlanIndex(index);
                              handlePlanOpen();
                            }}
                            deleteHandler={() => {
                              if (
                                index ===
                                  formik.values.reminderPlans.length - 1 &&
                                index !== 0
                              ) {
                                setCurrentPlanIndex(index - 1);
                              } else if (
                                index === 0 &&
                                formik.values.reminderPlans.length > 1
                              ) {
                                setCurrentPlanIndex(0);
                              } else if (
                                index === 0 &&
                                formik.values.reminderPlans.length === 1
                              ) {
                                setCurrentPlanIndex(0);
                              } else {
                                setCurrentPlanIndex(index - 1);
                              }
                              handleDeleteReminderPlan(
                                currentPlanIndex as number
                              );
                            }}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </CardContent>

          {formik.values.reminderPlans.length > 0 && (
            <CustomModal open={openPlan} handleClose={handlePlanClose}>
              <Typography variant="h4" sx={{ marginY: "10px" }}>
                Change Reminder Plan Details
              </Typography>
              <Grid container spacing={1} alignContent="space-between">
                <Grid item xs={6}>
                  <DatePicker
                    label="Start Date"
                    value={
                      formik.values.reminderPlans[currentPlanIndex].startDate
                    }
                    onChange={(date) => {
                      handleStartDateChange(currentPlanIndex)(date);
                    }}
                    renderInput={(props) => (
                      <TextField variant="outlined" {...props} />
                    )}
                  />
                </Grid>
                <Grid item xs={6}>
                  <DatePicker
                    label="End Date"
                    value={
                      formik.values.reminderPlans[currentPlanIndex].endDate
                    }
                    onChange={(date) => {
                      handleEndDateChange(currentPlanIndex)(date);
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
                    value={
                      formik.values.reminderPlans[currentPlanIndex].frequency
                    }
                    onChange={(e) => {
                      handleSelectFrequency(currentPlanIndex)(
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
                  {formik.values.reminderPlans[currentPlanIndex].frequency ===
                  Frequency.INTERVAL ? (
                    <>
                      <TextField
                        variant="outlined"
                        fullWidth
                        label="What is the interval?"
                        name={`formik.values.reminderPlans[${currentPlanIndex}].interval`}
                        size="medium"
                        onChange={(e) => {
                          const value = e.target.value;
                          const reminderPlan =
                            formik.values.reminderPlans[currentPlanIndex];
                          if (reminderPlan.frequency === Frequency.INTERVAL) {
                            reminderPlan.interval = parseInt(value, 10);
                            formik.setValues({ ...formik.values });
                          }
                        }}
                      />
                    </>
                  ) : formik.values.reminderPlans[currentPlanIndex]
                      .frequency === Frequency.SELECTED_DAYS ? (
                    <>
                      <MultipleSelect
                        label="What days in a week?"
                        options={DaysOfWeekOptions}
                        onChange={handleMultiSelectChange(currentPlanIndex)}
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
                      handleAddReminderPlanTime(currentPlanIndex)(
                        newValue.target.value as number
                      );
                    }}>
                    {Array.from(Array(10).keys()).map((number) => (
                      <MenuItem key={number} value={number + 1}>
                        {number + 1}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>
              </Grid>

              <Divider sx={{ p: "10px", width: "100%" }} />

              {formik.values.reminderPlans[currentPlanIndex].reminderPlanTimes
                .length > 0 && (
                <>
                  {formik.values.reminderPlans[
                    currentPlanIndex
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
                              formik.values.reminderPlans[currentPlanIndex]
                                .reminderPlanTimes[reminderPlanTimeIndex].dosage
                            }
                            onChange={(newValue) => {
                              handleChangeDosage(
                                currentPlanIndex,
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
                                currentPlanIndex,
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
          )}

          <Modal
            open={open}
            onClose={handleModalClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={{
              "& .MuiModal-root": {
                display: "flex",
                width: "fit-content",
                height: "fit-content",
              },
              display: "flex",
              width: "100%",
              height: "100%",
              padding: 2,
              alignItems: "center",
              justifyContent: "center",
            }}>
            <Card
              sx={{
                width: "1080px",
                bgcolor: "background.paper",
                border: "1px solid #00C2CB",
                borderRadius: "20px",
              }}>
              <Box
                ref={modalRef}
                sx={{
                  p: 4,
                  justifyContent: "center",
                  alignItems: "center",
                }}>
                <Grid
                  container
                  spacing={4}
                  sx={{
                    alignItems: "center",
                  }}>
                  <Grid item xs={12} textAlign="center">
                    <Typography variant="h3" textAlign="center">
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
                        label="Phone number"
                        fullWidth
                        variant="standard"
                        value={
                          formik.values.phoneNumber
                            ? formik.values.phoneNumber
                            : ""
                        }
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        label="Address"
                        fullWidth
                        variant="standard"
                        value={
                          formik.values.address ? formik.values.address : ""
                        }
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        label="First Name"
                        fullWidth
                        variant="standard"
                        value={
                          formik.values.fullName ? formik.values.fullName : ""
                        }
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        label="Gender"
                        fullWidth
                        variant="standard"
                        value={formik.values.gender ? formik.values.gender : ""}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        label="Doctor's notes"
                        fullWidth
                        variant="standard"
                        value={
                          formik.values.note
                            ? formik.values.note
                            : "No notes from doctor"
                        }
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
                        width={200}
                        height={200}
                      />
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
              </Box>
              <Grid
                container
                sx={{
                  justifyContent: "center",
                  paddingBottom: "1rem",
                }}
                paddingTop={2}>
                <Button
                  variant="contained"
                  type="submit"
                  onClick={handleCaptureModal}
                  sx={{
                    backgroundColor: "#00C2CB",
                  }}>
                  Save prescription
                </Button>
              </Grid>
            </Card>
          </Modal>
          {formik.values.reminderPlans.length >= 2 && (
            <CheckInteractions reminderPlan={formik.values.reminderPlans} />
          )}

          <CardActions>
            <Grid
              item
              xs={12}
              justifySelf="center"
              sx={{
                display: "flex",
                justifyContent: "center",
                bottom: "0",
              }}>
              <Button type="submit"> Submit </Button>
              <Button onClick={handleModalOpen}>Generate prescription</Button>
            </Grid>
          </CardActions>
        </Card>
      </Grid>
    </form>
  );
};
export default Prescribe;
