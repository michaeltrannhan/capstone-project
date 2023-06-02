import * as React from "react";
import {
  Create,
  SimpleForm,
  TextInput,
  DateInput,
  CreateProps,
  Form,
  TextField,
  SelectInput,
  ImageInput,
  AutocompleteArrayInput,
  ImageField,
  useNotify,
  useRedirect,
} from "react-admin";
import { RichTextInput } from "ra-input-rich-text";
import { Typography, Button } from "@mui/material";
import { User } from "../utils/commons";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import CreatableSelect from "react-select/creatable";
import { type } from "os";
import api from "../../services";

{
  /**
{export interface RootObject {
	hospitalId: number;
	title: string;
	content: string;
	tags: string[];
}
  "hospitalId": 1,
  "title": "co cach chua tri benh C hay hon nua",
  "content": "uong nhieu nuoc vao nhe",
  "tags": ["benh moi", "chua tri benh", "bi beNh C"]
}
*/
}

const tagOptions: string[] = ["benh moi", "chua tri benh"];

type FormValues = {
  hospitalId: number;
  title: string;
  content: string;
  tags: Array<String>;
  images: Array<File>;
};

const defaultValues: FormValues = {
  hospitalId: localStorage.getItem("hospitalId")
    ? parseInt(localStorage.getItem("hospitalId") || "", 10)
    : 0,
  title: "",
  content: "",
  tags: [],
  images: [],
};

const ArticleCreate = () => {
  const rawAuth = localStorage.getItem("auth");
  const auth = JSON.parse(rawAuth ? rawAuth : "") as User;
  const notify = useNotify();
  const redirect = useRedirect();
  const hospitalId = parseInt(localStorage.getItem("hospitalId") || "", 10);
  const articleCreate = (data: any) => {
    console.log(data);
    const formData = new FormData();
    const inputData = {
      hospitalId: hospitalId,
      title: data.title,
      content: data.content,
      tags: data.tags,
    };
    formData.append("data", JSON.stringify(inputData));
    if (data.images) {
      const image = data.images.rawFile;
      formData.append("file", image);
    }
    formData.forEach((value, key) => {
      console.log(key + " " + value);
    });
    api
      .post("articles", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        notify("Create article successfully");
      })
      .then(() => redirect("list", "articles"))
      .catch((error) => {
        notify(`Create article failed with error ${error}`, { type: "error" });
      });
  };
  return (
    <>
      <Create
        redirect="list"
        sx={{
          padding: "20px",
          marginTop: "5%",
          marginBottom: "10px",
          alignItems: "center",
          height: "100%",

          // textAlign: "center",
          width: "40%",
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
        <SimpleForm onSubmit={articleCreate}>
          <Typography variant="h4" sx={{ textAlign: "center" }}>
            Create Article
          </Typography>

          <TextInput source="title" label="Title" fullWidth required />
          <AutocompleteArrayInput
            source="tags"
            label="Tags"
            aria-required="true"
            choices={tag}
            isRequired
            onCreate={(e) => {
              console.log(e);
            }}
          />
          <TextInput
            source="content"
            label="Content"
            fullWidth
            multiline
            required
          />
          <ImageInput
            source="images"
            label="Related pictures"
            isRequired
            accept="image/*">
            <ImageField source="src" title="title" />
          </ImageInput>
          {/* <Button type="submit" variant="contained">
            Submit
          </Button> */}
          {/* <DevTool /> */}
        </SimpleForm>
      </Create>
    </>
  );
};
export default ArticleCreate;
const tag = [
  { id: "benh moi", name: "benh moi" },
  { id: "chua tri benh", name: "chua tri benh" },
  { id: "bi beNh C", name: "bi beNh C" },
];
