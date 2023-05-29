import Head from "next/head";
import React from "react";
import {
  Edit,
  Form,
  TextInput,
  SaveButton,
  WithRecord,
  ShowButton,
  AutocompleteInput,
  AutocompleteArrayInput,
} from "react-admin";
import { Box, Chip, Grid, Typography } from "@mui/material";
import SaveAsTwoToneIcon from "@mui/icons-material/SaveAsTwoTone";
import PreviewTwoToneIcon from "@mui/icons-material/PreviewTwoTone";
import BookmarkTwoToneIcon from "@mui/icons-material/BookmarkTwoTone";
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

const ArticleEdit = () => {
  return (
    <>
      <Head>
        <title>Article Edit</title>
      </Head>
      <Edit
        actions={false}
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
          "& .RaCreate-card	": {
            border: "1px solid rgba(224, 224, 224, 1)",
            borderRadius: "20px",
            padding: "24px",
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
              Edit Article
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
              <CustomTextInput label="Title" source="title" />
            </Grid>
            {/* <Grid item xs={12}>
              <AutocompleteArrayInput
                source="articleIncludesTags"
                optionValue={(record: any) =>
                  record.articleIncludesTags.map((tag: any) => tag.tag.name)
                }
              />
            </Grid> */}
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
    </>
  );
};

export default ArticleEdit;
