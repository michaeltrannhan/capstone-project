import React from "react";
import { Box, Typography, Stack } from "@mui/material";
import {
  List,
  TextField,
  EditActions,
  Datagrid,
  usePermissions,
  EditButton,
  ShowButton,
  FilterForm,
  FilterButton,
  CreateButton,
  TextInput,
  SearchInput,
  useListContext,
  FileField,
  ImageField,
  DateField,
  UrlField,
} from "react-admin";

import { Role } from "../utils/commons";
import ListFilters from "../commons/ListFilters";
import ActionToolbar from "../commons/ListActionToolbar";
import ListAction from "../commons/ListAction";
import ListTitle from "../commons/ListTitle";
import Head from "next/head";
const DoctorList = () => {
  const { permissions } = usePermissions<Role, any>();

  const roleAccessResource = permissions.roleAccessesResources;
  // console.log(roleAccessResource);

  const resource = roleAccessResource.find(
    (r) => r.resource.name == "doctor_account"
  );

  if (!resource) {
    return (
      <>
        <p>Not found</p>
      </>
    );
  }
  // console.log(resource);

  return (
    <>
      <Head>
        <title>List of Doctors</title>
      </Head>
      <ListTitle resource="Doctor" />
      <List
        sx={{
          width: "100%",
          // maxHeight: "440px",
          // overflow: "auto",
          "& .RaList-main	": {
            margin: "20px",
            border: "1px solid #F4F6F8",
            background: "#F9FAFB",
            boxShadow:
              "rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px",
            borderRadius: "20px",
            "& :last-child > .MuiToolbar-root	": {
              borderBottomLeftRadius: "20px",
              borderBottomRightRadius: "20px",
            },
          },
          "& .RaList-actions	": {
            paddingTop: 0,
            marginTop: 0,
          },

          // "& :last-child > td": {
          //   borderBottom: 0,
          // },
          "& :first-of-type > .MuiToolbar-root	": {
            borderTopLeftRadius: "20px",
            borderTopRightRadius: "20px",
          },
          // "": {},
        }}
        resource="doctors"
        sort={{ field: "id", order: "ASC" }}
        hasShow={resource.canView}
        hasCreate={resource.canAdd}
        hasEdit={resource.canEdit}
        filters={ListFilters("Search for any doctors", "Search")}
        actions={<ListAction />}>
        {/* <Typography variant="h3">Doctor list</Typography> */}
        <Datagrid
          // rowClick="edit"
          stickyHeader
          aria-label="sticky table"
          // rowClick="show"
          sx={{
            "& .RaDatagrid-tableWrapper	": {
              maxHeight: "440px",
              width: "100%",
              overflow: "auto",
            },
            "& .RaDatagrid-table": {
              minWidth: "75%",
              width: "100%",
            },
            "& .RaDatagrid-thead": {
              // height: "2em",
              "& .RaDatagrid-headerCell": {
                background: "rgb(248, 249, 250)",
              },
            },
            "& .RaDatagrid-rowCell": {
              maxWidth: "150px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            },
            "& .RaDatagrid-expandIconCell": {
              width: "10px",
              padding: 0,
            },
            "& .RaDatagrid-expandHeader": {
              width: "10px",
              padding: 0,
            },
            "& .RaDatagrid-checkbox	": {
              // borderRadius: "12px",
            },

            ///{column name} is the name of the column ---- Customization classes
            "& .column-id": {
              width: "20px",
            },

            "& .column-code": {
              maxWidth: "100px",
            },
            "& .column-firstName": {
              maxWidth: "50px",
            },
            "& .column-lastName": {
              maxWidth: "50px",
            },
            "& .column-operatorAccount\\.username": {
              maxWidth: "50px",
            },

            "& .column-createdAt": {
              maxWidth: "50px",
            },
            "& .column-updatedAt": {
              maxWidth: "50px",
            },
            "& .column-attachment\\.filePath": {
              maxWidth: "50px",
            },
            "& .column-undefined": {
              justifyItems: "end",
              // overflowX: "auto",
              width: "30px",
            },
          }}>
          <TextField source="id" />
          <TextField source="code" />
          <TextField source="firstName" />
          <TextField source="lastName" />
          <TextField
            source="operatorAccount.username"
            sortable={false}
            label="Username"
          />
          <DateField source="createdAt" />
          <DateField source="updatedAt" />

          <ActionToolbar>
            {permissions.name === "ADMIN" ||
            permissions.name === "HOSPITAL_ADMIN" ? (
              <EditButton
                variant="text"
                sx={{
                  width: "100%",
                  padding: 0,
                }}
              />
            ) : null}
            <ShowButton variant="text" />
          </ActionToolbar>
        </Datagrid>
      </List>
    </>
  );
};
export default DoctorList;
