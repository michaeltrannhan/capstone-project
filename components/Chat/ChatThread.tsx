import React, { ChangeEvent } from "react";
import { useQuery } from "react-query";
import {
  Card,
  Divider,
  Paper,
  Box,
  Button,
  TextField,
  Typography,
  Chip,
  Grid,
  InputAdornment,
  Stack,
  styled,
  Tooltip,
  IconButton,
} from "@mui/material";
import api from "../../services";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import SendIcon from "@mui/icons-material/Send";
import { type } from "os";
import {
  query,
  collection,
  orderBy,
  onSnapshot,
  doc,
  limit,
  getDocs,
  where,
  DocumentData,
  QuerySnapshot,
} from "firebase/firestore";
import db from "../../services/firebaseConfig";
import dayjs from "dayjs";
import Image from "next/image";
import AddPhotoAlternateTwoToneIcon from "@mui/icons-material/AddPhotoAlternateTwoTone";
import { useNotify } from "react-admin";
type RoomMessages = {
  messages: Messages[];
};

type Messages = {
  roomId: string;
  sentAt: Date;
  senderId: string;
  sender: string;
  content: string;
};

type Props = {
  children?: React.ReactNode;
  roomId: string;
  doctorId: string;
};
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function isValidHttpUrl(str: string) {
  const pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$", // fragment locator
    "i"
  );
  return pattern.test(str);
}

const ChatThread = (props: Props) => {
  const [sending, setSending] = React.useState<boolean>(false);
  const [imageToSend, setImageToSend] = React.useState<File | null>(null);
  const [roomMessages, setRoomMessages] = React.useState<DocumentData[]>([]);
  const rawAuth = localStorage.getItem("auth");
  const auth = JSON.parse(rawAuth ? rawAuth : "{}");
  const { handleSubmit, control, setValue, reset } = useForm({
    defaultValues: {
      content: "",
      senderCode: props.doctorId,
      roomId: props.roomId,
    },
  });
  const notify = useNotify();
  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setImageToSend(event.target.files[0]);
      console.log(event.target.files[0]);
      const data = {
        senderCode: props.doctorId,
        roomId: props.roomId,
      };
      const formData = new FormData();
      formData.append("file", event.target.files[0]);
      formData.append("data", JSON.stringify(data));
      api
        .post("chat/send/img", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          notify("Image sent", { type: "success" });
        })
        .catch((err) => {
          notify("Error sending image", { type: "error" });
        });
    }
  };

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    try {
      setSending(true);
      setValue("senderCode", props.doctorId);
      setValue("roomId", props.roomId);
      const response = api
        .post<FormValues, any>(`chat/send`, data)
        .then((res) => {
          // console.log(res);
          setSending(false);
        })
        .catch((err) => {
          console.log(err);
        });
      reset();
      return Promise.resolve(response);
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(roomMessages);
  React.useEffect(() => {
    // console.log(collection(db, "roomMessages", props.roomId, "messages"));
    const unsubscribe = () =>
      onSnapshot(
        query(
          collection(db, "roomMessages", props.roomId, "messages"),
          orderBy("sentAt", "desc")
        ),
        (snapshot) => {
          const messages = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setRoomMessages(messages);
        }
      );
    return unsubscribe();
  }, [props.roomId]);
  return (
    <>
      <Stack
        sx={{
          height: "100%",
          paddingLeft: 0,
        }}>
        <Item
          sx={{
            height: "100%",
            overflowY: "scroll",
            display: "flex",
            flexDirection: "column-reverse",
            position: "relative",
            scrollBehavior: "smooth",
          }}>
          {roomMessages.map((message) => (
            <Box
              key={message.id}
              display="flex"
              sx={{
                justifyContent:
                  message.senderCode === props.doctorId
                    ? "flex-end"
                    : "flex-start",
                // padding: "8px 16px",
                padding: 0.25,
              }}>
              <Box
                sx={{
                  alignContent: "center",
                  alignItems: "center",
                  justifyContent: "end",
                  justifyItems: "end",
                  maxHeight: "480px",
                  maxWidth: "80%",
                  borderRadius: "48px",
                  position: "relative",
                  height: "100%",
                  textAlign: "right",
                }}>
                <Box
                  sx={{
                    textAlign: "left",
                  }}>
                  {message.senderCode === props.doctorId ? null : (
                    <Typography variant="caption" textTransform="capitalize">
                      {message.sender}
                    </Typography>
                  )}
                </Box>
                <Tooltip
                  title={
                    "Sent at " +
                    dayjs(message.senAt).format("DD MMM YYYY HH:mm")
                  }
                  arrow>
                  <Box
                    sx={{
                      borderRadius: "32px",
                      padding: 2,
                      textAlign: "center",

                      color:
                        message.senderCode === props.doctorId ? "#fff" : "#000",
                      backgroundColor:
                        message.senderCode === props.doctorId
                          ? "rgb(0, 132, 255)"
                          : "#ECF3FF",
                    }}>
                    {isValidHttpUrl(message.content) ? (
                      <Box
                        sx={{
                          // position: "relative",
                          width: 240,
                          height: 240,
                          maxWidth: "480px",
                          maxHeight: "480px",
                        }}>
                        <Image
                          alt="chat-image"
                          src={message.content}
                          fill
                          sizes="100vw"
                          quality={100}
                          style={{
                            // position: "inherit",
                            objectFit: "contain",
                            padding: 3,
                            borderRadius: "32px",
                          }}
                        />
                      </Box>
                    ) : (
                      message.content
                    )}
                  </Box>
                </Tooltip>
              </Box>
            </Box>
          ))}
        </Item>
        <Item
          sx={{
            padding: 0,
          }}>
          <Grid container columns={18} columnSpacing={6}>
            <Grid
              item
              xs={1}
              sx={{
                alignSelf: "center",
                justifySelf: "start",
              }}>
              <Tooltip title="Upload image">
                <Button
                  component="label"
                  aria-label="upload image"
                  sx={{
                    alignSelf: "center",
                    borderRadius: "48px",
                    width: "100%",
                  }}>
                  <AddPhotoAlternateTwoToneIcon
                    sx={{
                      width: "32px",
                      height: "32px",
                    }}
                  />
                  <input
                    accept="image/png, image/jpeg, image/jpg"
                    type="file"
                    name="file"
                    onChange={handleImageChange}
                    aria-label="upload image"
                    hidden
                  />
                </Button>
              </Tooltip>
            </Grid>
            <Grid item xs={17}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Controller
                  name="content"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      name="content"
                      label="Send Message"
                      // size="medium"
                      fullWidth
                      InputProps={{
                        style: {
                          borderRadius: "32px",
                        },
                        endAdornment: (
                          <InputAdornment position="end">
                            <Button
                              sx={{
                                padding: 0,
                                justifyContent: "end",
                              }}
                              type="submit">
                              <SendIcon />
                            </Button>
                          </InputAdornment>
                        ),
                      }}
                      variant="outlined"
                    />
                  )}
                />
              </form>
            </Grid>
          </Grid>
        </Item>
      </Stack>
    </>
  );
};

export default ChatThread;
export type FormValues = {
  content: string;
  senderCode: string;
  roomId: string;
};
export type ImageFormValues = {
  file: File;
  data: {
    senderCode: string;
    roomId: string;
  };
};
