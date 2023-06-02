import db from "../../services/firebaseConfig";

import React, { useEffect } from "react";

import { useForm, Controller, useController } from "react-hook-form";
import { useGetIdentity } from "react-admin";
import { useQuery } from "react-query";
import api from "../../services";
import Head from "next/head";
import {
  Box,
  Card,
  Grid,
  Tabs,
  Typography,
  Tab,
  Button,
  Modal,
  Avatar,
  Divider,
  TextField,
  Fab,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
} from "@mui/material";
import ChatThread from "./ChatThread";
import SendIcon from "@mui/icons-material/Send";
import { doc, getDoc, onSnapshot } from "firebase/firestore";

// const colRef = collection(db, "rooms");

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

interface ChatRoom {
  id: string;
  members: string[];
  createdAt: Date;
  createdBy: string;
  name: string;
  recentMessages: {
    readBy: {
      sentAt: Date;
      sentBy: string;
    };
    content: string;
  };
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      style={{ height: "100%" }}
      {...other}>
      {value === index && <Box sx={{ p: 3, height: "100%" }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const Chat = () => {
  const [value, setValue] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const { identity: userIdentity, isLoading: identityLoading } =
    useGetIdentity();
  const {
    isIdle,
    data: chatData,
    isLoading: chatLoading,
    isError: chatError,
  } = useQuery<ChatRoom[]>(
    ["chat/conversations"],
    async () => {
      const res = await api.get(`chat/conversations/${userIdentity?.code}`);
      return res.data;
    },
    {
      enabled: !!userIdentity?.code,
      refetchOnWindowFocus: false,
    }
  );
  // console.log(chatData);
  // React.useEffect(() => {
  //   const unsubscribe = async () => {
  //     const userSnap = await getDoc(doc(db, "users", userIdentity?.code));
  //     if (userSnap.exists()) {
  //       const userData = userSnap.data();
  //       const { rooms } = userData;
  //       const ret = [];
  //       for (const room of rooms) {
  //         const roomSnap = await getDoc(doc(db, "rooms", room));
  //         const medicationPlanName = await
  //       }
  //     }
  //   };
  // });
  if (chatLoading) return <div>Loading...</div>;
  return (
    <>
      <Head>
        <title>Chat</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 6,
          paddingX: 4,
          overflow: "hidden",
        }}>
        <Grid
          container
          height="100%"
          component={Paper}
          elevation={3}
          sx={{
            height: "calc(100vh - 9rem)",
            overflow: "hidden",
          }}>
          <Grid item xs={2}>
            <Typography
              variant="h4"
              fontSize={20}
              fontWeight={700}
              textAlign="start"
              sx={{
                paddingTop: 2,
                paddingX: 2,
              }}>
              Chats
            </Typography>
            <Box
              sx={{
                borderColor: "divider",
                boxShadow: "-moz-initial",
                padding: 2,
                height: "calc(100vh - 12rem)",
              }}>
              <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                // scrollButtons
                visibleScrollbar
                onChange={handleChange}
                aria-label="Vertical tabs example"
                sx={{
                  borderRight: 1,
                  borderTop: 1,
                  padding: 2,
                  paddingLeft: 0,
                  borderColor: "divider",
                  width: "100%",
                  height: "100%",

                  ".MuiTabs-root": {
                    borderRadius: "20px",
                  },
                  ".MuiTabs-indicator": {
                    display: "none",
                  },
                }}>
                {chatData?.map((chat, index) => (
                  <Tab
                    key={chat.id}
                    sx={{
                      borderRadius: "12px",
                      color: "black",
                      paddingY: 2,
                      ".MuiTab-root	": {
                        borderRadius: "20px",
                      },
                      "&.Mui-selected": {
                        backgroundColor: "rgba(145, 158, 171, 0.16)",
                        color: "black",
                      },
                    }}
                    label={`${chat.name} Medication plan`}
                    {...a11yProps(index)}
                  />
                ))}
              </Tabs>
            </Box>
          </Grid>
          <Grid
            item
            xs={10}
            sx={{
              position: "relative",
              height: "100%",
            }}>
            {chatData
              ? chatData?.map((chat, index) => (
                  <TabPanel key={chat.id} value={value} index={index}>
                    <ChatThread
                      roomId={chat.id}
                      doctorId={userIdentity?.code}
                    />
                  </TabPanel>
                ))
              : null}
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Chat;
