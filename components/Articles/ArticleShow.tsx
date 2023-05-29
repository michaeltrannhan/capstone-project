import { CardHeader, Card, Typography, Grid } from "@mui/material";
import Head from "next/head";
import React from "react";
import {
  DateField,
  ImageField,
  Show,
  TextField,
  WithRecord,
} from "react-admin";
import ArticleIcon from "@mui/icons-material/Article";
type Props = {};

const ArticleShow = () => {
  return (
    <>
      <Head>
        <title>Article Detail</title>
      </Head>
      <Show
        sx={{
          padding: "20px",
          marginTop: "5%",
          marginBottom: "10px",
          alignItems: "center",
          // textAlign: "center",
          width: "60%",
          flexDirection: "column",
          justifyContent: "center",
          alignContent: "center",
          justifyItems: "center",
          alignSelf: "center",
          "& .RaShow-card	": {
            border: "1px solid rgba(224, 224, 224, 1)",
            borderRadius: "20px",
            padding: "24px",
          },
        }}
        title="Article Detail"
        actions={false}>
        <Card>
          <CardHeader
            sx={{ textAlign: "center" }}
            avatar={
              <ArticleIcon
                sx={{
                  fontSize: "3rem",
                  color: (theme) => theme.palette.primary.light,
                }}
              />
            }
            title={
              <WithRecord
                render={(record) => {
                  return (
                    <Typography
                      variant="h4"
                      color={(theme) => theme.palette.primary.light}>
                      Details about: {record.title}
                    </Typography>
                  );
                }}
              />
            }
          />
        </Card>
        <Grid container spacing={4}>
          <Grid item container md={6} xs={12}>
            <Grid item xs={4}>
              <Typography variant="h5" color="midnightblue">
                Article ID:
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <WithRecord render={(record) => <>{record.id}</>} />
            </Grid>
            <Grid item xs={4}>
              <Typography variant="h5" color="midnightblue">
                Hospital ID:
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <WithRecord render={(record) => <>{record.hospitalId}</>} />
            </Grid>
            <Grid item xs={4}>
              <Typography variant="h5" color="midnightblue">
                Creation Date:
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <DateField source="createdAt" />
            </Grid>
            <Grid item xs={4}>
              <Typography variant="h5" color="midnightblue">
                Edition Date:
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <DateField source="updatedAt" />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5" color="midnightblue">
              Content of the article:
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField source="content" />
          </Grid>
          <Grid item xs={12}>
            <ImageField source="attachment.filePath" />
          </Grid>
        </Grid>
      </Show>
    </>
  );
};

export default ArticleShow;
