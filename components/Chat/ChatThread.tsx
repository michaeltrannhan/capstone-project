import React from "react";
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

const ChatThread = (props: Props) => {
  const [sending, setSending] = React.useState<boolean>(false);
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
          orderBy("senAt", "asc"),
          limit(10)
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
    <Grid
      container
      sx={{
        height: "inherit",
        alignContent: "flex-end",
      }}>
      <Grid item xs={12} sx={{}}>
        {roomMessages.map((message) => (
          <Box
            key={message.id}
            textAlign={
              message.senderCode === auth.code || message.senderId === auth.code
                ? "end"
                : "start"
            }>
            <Typography variant="caption" fontWeight={700} key={message.id}>
              {message.sender
                .split(" ")
                .map((word: string) => {
                  return word[0].toUpperCase() + word.substring(1);
                })
                .join(" ")}
            </Typography>
            <br />
            <Chip label={message.content} />
            <br />
            <Typography variant="caption">
              Sent at {dayjs(message.senAt).format("HH:MM DD/MM/YYYY")}
            </Typography>
          </Box>
        ))}
      </Grid>
      <Grid
        item
        xs={12}
        sx={{
          bottom: 0,
          alignSelf: "end",
        }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid item xs={12}>
            <Controller
              name="content"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  name="content"
                  label="Send Message"
                  size="medium"
                  fullWidth
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Button
                          sx={{
                            padding: 0,
                            minWidth: "auto",
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
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
};

export default ChatThread;
export type FormValues = {
  content: string;
  senderCode: string;
  roomId: string;
};
