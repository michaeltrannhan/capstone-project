import db from "../../services/firebaseConfig";

import React, { useEffect } from "react";

import { useForm, Controller, useController } from "react-hook-form";
import { useGetIdentity } from "react-admin";
import { useQuery } from "react-query";
import api from "../../services";
import Head from "next/head";
import { Box, Card, Grid, Tabs, Typography, Tab } from "@mui/material";
import ChatThread from "./ChatThread";

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
      {...other}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
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

  // const {
  //   data: chatMessages,
  //   isLoading: chatMessagesLoading,
  //   isError: chatMessagesError,
  // } = useQuery(["chat/messags"], () => {
  //   return api.get(`chat/messages/${chatData}`)
  // });
  console.log("chatData", chatData);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      roomId: "",
    },
  });

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
          py: 8,
          // px: 4,
        }}>
        <Typography
          variant="h4"
          sx={
            {
              // mb: 8,
            }
          }>
          Chat
        </Typography>

        <Grid container columnSpacing={1}>
          <Grid item xs={12} md={6} lg={2}>
            <Box
              sx={{
                borderBottom: 1,
                borderColor: "divider",
                boxShadow: "-moz-initial",
              }}>
              <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                sx={{ borderRight: 1, borderColor: "divider", width: "100%" }}>
                {/* <Tab label="Chat1" {...a11yProps(0)} />

              <Tab label="chat2" {...a11yProps(1)} /> */}
                {chatData?.map((chat, index) => (
                  <Tab
                    key={chat.id}
                    label={`Conversation ${chat.id}`}
                    {...a11yProps(index)}
                  />
                ))}
              </Tabs>
            </Box>
          </Grid>
          <Grid item xs={12} md={6} lg={10}>
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
