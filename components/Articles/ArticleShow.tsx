import { CardHeader, Card, Typography, Grid, Chip, Box } from "@mui/material";
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
              <WithRecord
                render={(record) =>
                  record.attachment ? (
                    <ImageField source="attachment.filePath" />
                  ) : (
                    <ArticleIcon
                      sx={{
                        width: "100px",
                        height: "100px",
                      }}
                    />
                  )
                }
              />
            }
            title={
              <WithRecord
                render={(record) => {
                  return (
                    <Typography
                      variant="h4"
                      textAlign="start"
                      color={(theme) => theme.palette.primary.light}>
                      Details about: {record.title}
                    </Typography>
                  );
                }}
              />
            }
            subheader={
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}>
                <Box>
                  <Typography
                    variant="caption"
                    color="midnightblue"
                    paddingRight={2}>
                    Tags:
                  </Typography>
                  <WithRecord
                    render={(record) => {
                      return record.articleIncludesTags.map((tag: any) => {
                        return (
                          <Chip
                            key={tag.id}
                            label={tag.tag.name}
                            color="primary"
                            variant="filled"
                          />
                        );
                      });
                    }}
                  />
                </Box>
                <Box>
                  <Typography
                    variant="caption"
                    color="midnightblue"
                    paddingX={2}>
                    Creation Date:
                  </Typography>
                  <Chip
                    variant="filled"
                    sx={{ padding: 1 }}
                    label={<DateField source="createdAt" />}
                  />
                </Box>
              </Box>
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
          </Grid>

          {/* Delete the hospital ID based on requirements

          <Grid item container md={6} xs={12}>
            <Grid item xs={4}>
              <Typography variant="h5" color="midnightblue">
                Hospital ID:
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <WithRecord render={(record) => <>{record.hospitalId}</>} />
            </Grid>
          </Grid> */}
          <Grid item xs={12}>
            <Typography variant="h5" color="midnightblue">
              Content of the article:
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              source="content"
              fontSize={24}
              align="justify"
              sx={{
                textAlign: "justify",
                textJustify: "inter-word",
              }}
            />
          </Grid>
        </Grid>
      </Show>
    </>
  );
};

export default ArticleShow;
