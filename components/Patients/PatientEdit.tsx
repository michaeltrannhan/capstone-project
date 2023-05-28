import React from "react";
import { Box, Grid, Typography } from "@mui/material";
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
  WithRecord,
  ShowButton,
} from "react-admin";
import { DatePicker } from "@mui/x-date-pickers";
import SaveAsTwoToneIcon from "@mui/icons-material/SaveAsTwoTone";
import PreviewTwoToneIcon from "@mui/icons-material/PreviewTwoTone";

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
      resettable
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

const PatientEdit = () => {
  return (
    <Edit
      resource="patients"
      actions={false}
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
            Patient{" "}
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
            />
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
            <CustomTextInput label="First Name" source="firstName" />
          </Grid>
          <Grid item xs={12} md={6}>
            <CustomTextInput label="Last Name" source="lastName" />
          </Grid>
          <Grid item xs={12} md={6}>
            <SelectInput
              variant="outlined"
              source="gender"
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
                { id: "OTHER", name: "Other" },
              ]}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <CustomTextInput label="Email" source="email" />
          </Grid>
          <Grid item xs={12} md={6}>
            <CustomTextInput label="Address" source="address" />
          </Grid>
          <Grid item xs={12} md={6}>
            <CustomTextInput label="SSN" source="socialSecurityNumber" />
          </Grid>
          <Grid item xs={12} md={6}>
            <DateInput
              sx={{
                width: "100%",
                borderRadius: "20px",
              }}
              size="medium"
              InputProps={{
                style: {
                  borderRadius: "20px",
                },
              }}
              source="birthday"
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <CustomTextInput
              label="Insurance Number"
              source="patientAccount.insuranceNumber"
              name="insuranceNumber"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <CustomTextInput
              label="Occupation"
              source="patientAccount.occupation"
              name="occupation"
            />
          </Grid>
          <Grid
            item
            xs={12}
            sx={{
              alignContent: "center",
              justifyContent: "center",
              justifyItems: "center",
              textAlign: "center",
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

export default PatientEdit;
