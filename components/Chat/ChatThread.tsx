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
} from "@mui/material";
import api from "../../services";
import { useForm, SubmitHandler, Controller } from "react-hook-form";

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

  const { handleSubmit, control, setValue, reset } = useForm({
    defaultValues: {
      content: "",
      senderId: props.doctorId,
      roomId: props.roomId,
    },
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    try {
      setSending(true);
      setValue("senderId", props.doctorId);
      setValue("roomId", props.roomId);
      const response = api
        .post<FormValues, any>(`chat/send`, data)
        .then((res) => {
          console.log(res);
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

  React.useEffect(() => {
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
    return () => {
      unsubscribe();
    };
  }, [props.roomId]);
  return (
    <div>
      {roomMessages.map((message) => (
        <Box key={message.id}>
          <Typography variant="button" key={message.id}>
            {message.sender}
          </Typography>
          <br />
          {message.content}
        </Box>
      ))}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="content"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              name="content"
              label="Send Message"
              fullWidth
              variant="outlined"
            />
          )}
        />
        <Button type="submit" variant="contained">
          Send
        </Button>
      </form>
    </div>
  );
};

export default ChatThread;
export type FormValues = {
  content: string;
  senderId: string;
  roomId: string;
};
