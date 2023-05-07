import { Stack, Typography } from "@mui/material";
import React from "react";
import {
  List,
  Datagrid,
  ListProps,
  TextField,
  EditActions,
  BulkDeleteButton,
  CreateButton,
  EditButton,
  ShowButton,
  usePermissions,
} from "react-admin";
import ListFilters from "../commons/ListFilters";
import ListTitle from "../commons/ListTitle";
import ListAction from "../commons/ListAction";
import ActionToolbar from "../commons/ListActionToolbar";
import { Role } from "../utils/commons";
export default function HospitalList() {
  const { permissions } = usePermissions<Role, any>();
  return (
    <>
      <ListTitle resource="Hospital" />
      <List
        filters={ListFilters("Search for any hospitals", "Search")}
        actions={<ListAction />}
        hasCreate={false}
        sx={{
          width: "100%",
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

          "& :last-child > td": {
            borderBottom: 0,
          },
          "& :first-of-type > .MuiToolbar-root	": {
            borderTopLeftRadius: "20px",
            borderTopRightRadius: "20px",
          },
        }}>
        <Typography></Typography>
        <Datagrid
          sx={{
            "& .RaDatagrid-table": {
              minWidth: "75%",
              width: "100%",
            },
            // "& .RaDatagrid-thead": {
            //   height: "2em",
            //   "& .RaDatagrid-headerCell": {
            //     background: "rgb(248, 249, 250)",
            //   },
            // },
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
            "& .column-name": {
              maxWidth: "50px",
            },
            "& .column-code": {
              maxWidth: "50px",
            },
            "& .column-undefined": {
              justifyItems: "end",
              overflowX: "auto",
              width: "30px",
            },
          }}>
          <TextField source="id" />
          <TextField source="name" />
          <TextField source="description" />
          <TextField source="createdAt" />
          <TextField source="updatedAt" />
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
}
