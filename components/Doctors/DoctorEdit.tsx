import React from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import {
  Form,
  Create,
  TextInput,
  SaveButton,
  Edit,
  DateField,
  NumberField,
  SelectField,
  NumberInput,
  SelectInput,
  DateInput,
  ShowButton,
  WithRecord,
  useNotify,
} from "react-admin";
import SaveAsTwoToneIcon from "@mui/icons-material/SaveAsTwoTone";
import PreviewTwoToneIcon from "@mui/icons-material/PreviewTwoTone";
import RotateLeftTwoToneIcon from "@mui/icons-material/RotateLeftTwoTone";
import api from "../../services";

type CustomTextFieldProps = {
  source: string;
  name?: string;
  label?: string;
};
const CustomTextInput = (props: CustomTextFieldProps) => {
  return (
    <TextInput
      variant="outlined"
      label={props.label}
      source={props.source}
      name={props.name}
      size="medium"
      InputProps={{
        style: {
          borderRadius: "20px",
        },
      }}
      fullWidth
    />
  );
};

const DoctorEdit = () => {
  const notify = useNotify();
  const handleResetPassword = (id: number) => {
    console.log("Reset Password");
    api
      .patch(`user-accounts/reset-pwd/${id}`)
      .then(() => {
        notify("Password Reset Successfully", { type: "success" });
      })
      .catch((err) => {
        notify(`Password Reset Failed with error: ${err}`, { type: "error" });
      });
  };
  return (
    <Edit
      resource="doctors"
      actions={false}
      redirect="list"
      sx={{
        padding: 4,
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
        alignContent: "center",
        justifyItems: "center",
        alignSelf: "center",
        width: "50%",

        "& .RaEdit-card	": {
          border: "1px solid rgba(224, 224, 224, 1)",
          borderRadius: "20px",
          padding: 1,
          boxShadow:
            " rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
        },
      }}>
      <Form>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            paddingX: 6,
            paddingTop: 3,
            alignContent: "center",
            alignItems: "center",
            justifyContent: "space-between",
          }}>
          <Typography variant="h3" align="center">
            Dr.{" "}
            <WithRecord
              render={(record) => {
                return (
                  <span>
                    {record?.firstName
                      .split(" ")
                      .map((word: string) => {
                        return word[0].toUpperCase() + word.slice(1);
                      })
                      .join(" ")}{" "}
                    {record?.lastName
                      .split(" ")
                      .map((word: string) => {
                        return word[0].toUpperCase() + word.slice(1);
                      })
                      .join(" ")}{" "}
                  </span>
                );
              }}
            />{" "}
            Information
          </Typography>
          <ShowButton
            size="large"
            sx={{
              borderRadius: "20px",
            }}
            icon={<PreviewTwoToneIcon />}
          />
        </Box>

        <Grid
          container
          columnSpacing={2}
          sx={{
            padding: 6,
          }}>
          <Grid item xs={12} md={6}>
            <CustomTextInput label="Doctor First Name" source="firstName" />
          </Grid>
          <Grid item xs={12} md={6}>
            <CustomTextInput label="Doctor Last Name" source="lastName" />
          </Grid>
          <Grid item xs={12} md={6}>
            <SelectInput
              source="gender"
              label="Gender"
              size="medium"
              fullWidth
              InputProps={{
                style: {
                  borderRadius: "20px",
                },
              }}
              choices={[
                { id: "MALE", name: "Male" },
                { id: "FEMALE", name: "Female" },
              ]}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <CustomTextInput source="address" label="Doctor Address" />
          </Grid>
          <Grid item xs={12} md={6}>
            <CustomTextInput source="socialSecurityNumber" label="Doctor SSN" />
          </Grid>
          <Grid item xs={12} md={6}>
            <CustomTextInput source="nationality" label="Doctor Nationality" />
          </Grid>
          <Grid item xs={12} md={6}>
            <CustomTextInput
              source="operatorAccount.doctorAccount.faculty"
              label="Doctor faculty"
              name="faculty"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <DateInput
              size="medium"
              fullWidth
              InputProps={{
                style: {
                  borderRadius: "20px",
                },
              }}
              source="birthday"
              label="Doctor Birthday"
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <NumberInput
              size="medium"
              fullWidth
              InputProps={{
                style: {
                  borderRadius: "20px",
                },
              }}
              source="operatorAccount.doctorAccount.yearOfExperience"
              label="Doctor Experience"
              name="yearOfExperience"
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <CustomTextInput label="Doctor Email" source="email" />
          </Grid>
          <Grid
            item
            xs={6}
            sx={{
              alignContent: "space-between",
              justifyContent: "space-between",
              justifyItems: "space-between",
              textAlign: "left",
            }}>
            <WithRecord
              render={(record) => (
                <Button
                  variant="outlined"
                  sx={{
                    borderRadius: "20px",
                    backgroundColor: "",
                  }}
                  onClick={(e) => {
                    handleResetPassword(record?.id as number);
                  }}
                  startIcon={<RotateLeftTwoToneIcon />}>
                  Reset Password
                </Button>
              )}
            />
          </Grid>
          <Grid
            item
            xs={6}
            sx={{
              textAlign: "right",
            }}>
            <SaveButton
              label="Update"
              sx={{
                borderRadius: "20px",
              }}
              icon={
                <SaveAsTwoToneIcon
                  sx={{
                    fontSize: "3rem",
                  }}
                />
              }
              size="large"
            />
          </Grid>
        </Grid>
      </Form>
    </Edit>
  );
};

export default DoctorEdit;
