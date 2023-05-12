import { Box, Card, Grid, Skeleton, Typography } from "@mui/material";
import * as React from "react";
import {
  Show,
  SimpleShowLayout,
  TextField,
  DateField,
  RichTextField,
  DeleteButton,
  EditButton,
  usePermissions,
  WithRecord,
} from "react-admin";
import { Role } from "../utils/commons";
import Head from "next/head";

const MedicationShow = () => {
  const { permissions, isLoading } = usePermissions<Role>();
  if (isLoading)
    return (
      <Box>
        <Skeleton />
      </Box>
    );
  return (
    <>
      <Head>
        <title>Medication Detail</title>
      </Head>
      <Show
        title="Medication Detail"
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
                color={(theme) => theme.palette.info.light}
                sx={{ textAlign: "center", paddingTop: "24px" }}>
                Detail information about {record.name}
              </Typography>
            );
          }}
        />
        <Grid container spacing={4} padding={6}>
          <Grid item container md={6} xs={12}>
            <Grid item xs={4}>
              <Typography variant="h6" color="textSecondary">
                Medication ID:
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <TextField
                source="id"
                variant="body2"
                fontWeight={700}
                color={(theme) => theme.palette.info.main}
              />
            </Grid>
          </Grid>
          <Grid item container md={6} xs={12}>
            <Grid item xs={4}>
              <Typography variant="h6" color="textSecondary">
                DrugBank UID
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <TextField
                source="code"
                variant="body2"
                fontWeight={700}
                fontSize={20}
                color={(theme) => theme.palette.info.main}
              />
            </Grid>
          </Grid>
          <Grid item container md={6} xs={12}>
            <Grid item xs={4}>
              <Typography variant="h6" color="textSecondary">
                Medication Name:
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <TextField
                source="name"
                variant="body2"
                fontWeight={700}
                fontSize={20}
                color={(theme) => theme.palette.info.main}
              />
            </Grid>
          </Grid>
          <Grid item container md={6} xs={12}>
            <Grid item xs={4}>
              <Typography variant="h6" color="textSecondary">
                Medication Import Date:
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <DateField
                source="createdAt"
                variant="body2"
                fontWeight={700}
                fontSize={20}
                color={(theme) => theme.palette.info.main}
              />
            </Grid>
          </Grid>
          <Grid item container md={6} xs={12}>
            <Grid item xs={4}>
              <Typography variant="h6" color="textSecondary">
                Medication Last Update Date:
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <DateField
                source="updatedAt"
                variant="body2"
                fontWeight={700}
                fontSize={20}
                color={(theme) => theme.palette.info.main}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid container paddingX={6} spacing={3} marginBottom={5}>
          <Grid item xs={2}>
            <Typography variant="h6" color="textSecondary">
              Medication Descriptions:
            </Typography>
          </Grid>
          <Grid item xs={10}>
            <TextField
              source="description"
              textAlign="justify"
              sx={{
                textJustify: "inter-word",
              }}
            />
          </Grid>
        </Grid>
      </Show>
    </>
  );
};
export default MedicationShow;
