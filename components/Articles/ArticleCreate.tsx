import * as React from "react";
import {
  Create,
  SimpleForm,
  TextInput,
  DateInput,
  CreateProps,
  Form,
} from "react-admin";
import { RichTextInput } from "ra-input-rich-text";
import { Typography } from "@mui/material";
import { User } from "../utils/commons";

{
  /**
{
  "hospitalId": 1,
  "title": "co cach chua tri benh C hay hon nua",
  "content": "uong nhieu nuoc vao nhe",
  "tags": ["benh moi", "chua tri benh", "bi beNh C"]
}
*/
}

const ArticleCreate = () => {
  const rawAuth = localStorage.getItem("auth");
  const auth = JSON.parse(rawAuth ? rawAuth : "") as User;

  return (
    <Create
      redirect="list"
      sx={{
        padding: "20px",
        marginTop: "5%",
        marginBottom: "10px",
        alignItems: "center",
        // textAlign: "center",
        width: "70%",
        flexDirection: "column",
        justifyContent: "center",
        alignContent: "center",
        justifyItems: "center",
        alignSelf: "center",
        "& .RaCreate-card	": {
          border: "1px solid rgba(224, 224, 224, 1)",
          borderRadius: "12px",
          padding: "24px",
        },
      }}>
      <Form>
        <Typography variant="h3" align="center">
          Create new article
        </Typography>
        <TextInput
          variant="outlined"
          source="hospitalId"
          label="Hospital ID"
          value={auth.operatorAccount?.hospitalId as Number}
          defaultValue={auth.operatorAccount?.hospitalId as Number}
          disabled
          fullWidth
        />
        <TextInput variant="outlined" source="title" label="Title" fullWidth />
        <TextInput variant="outlined" source="content" label="Content" fullWidth/>
        
      </Form>
    </Create>
  );
};
export default ArticleCreate;
