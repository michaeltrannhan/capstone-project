import { CardHeader, Card, Typography, Grid } from "@mui/material";
import Head from "next/head";
import React from "react";
import { DateField, Show, TextField, WithRecord } from "react-admin";
import ArticleIcon from "@mui/icons-material/Article";
type Props = {};

const ArticleShow = () => {
  return (
    <>
      <Head>
        <title>Article Detail</title>
      </Head>
      <Show title="Article Detail" actions={false}>
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
        <Grid container spacing={4} padding={6}>
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
              <WithRecord render={(record) => <>{record.id}</>} />
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
        </Grid>
      </Show>
    </>
  );
};

export default ArticleShow;
