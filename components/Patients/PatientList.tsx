import React from "react";
import { Typography, Button } from "@mui/material";
import {
  List,
  TextField,
  EditActions,
  Datagrid,
  EditButton,
  ShowButton,
  usePermissions,
  WithRecord,
  useRedirect,
} from "react-admin";
import ActionToolbar from "../commons/ListActionToolbar";
import { Role } from "../utils/commons";
import ListFilters from "../commons/ListFilters";
import ListAction from "../commons/ListAction";
import ListTitle from "../commons/ListTitle";
import Head from "next/head";

const PatientList = () => {
  const { permissions, isLoading } = usePermissions<Role, any>();
  const code = localStorage.getItem("code");
  const redirect = useRedirect();

  if (isLoading) {
    return <p>Loading...</p>;
  } else
    return (
      <>
        <Head>
          <title>List of Patients</title>
        </Head>
        <ListTitle resource="Patient" />
        {permissions.name !== "DOCTOR" ? (
          <List
            resource="patients"
            filters={ListFilters("Search for any patients", "Search")}
            actions={<ListAction />}
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
            <Datagrid
              sx={{
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
                "& .column-name": {
                  maxWidth: "50px",
                },
                // "& .column-code": {
                //   maxWidth: "50px",
                // },
                "& .column-undefined": {
                  justifyItems: "end",
                  overflowX: "auto",
                  width: "30px",
                },
              }}>
              <TextField source="id" emptyText="Not available" />
              <TextField source="code" emptyText="Not available" label="UUID" />
              <TextField source="firstName" emptyText="Not available" />
              <TextField source="lastName" emptyText="Not available" />
              <TextField source="email" emptyText="Not available" />
              <TextField
                source="patientAccount.phoneNumber"
                sortable={false}
                label="Phone number"
                emptyText="Not available"
              />
              <TextField
                source="patientAccount.username"
                sortable={false}
                label="Username"
                emptyText="Not available"
              />
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
        ) : (
          <List
            resource={`patients/associated-patients/${code}`}
            filters={ListFilters("Search for any patients", "Search")}
            actions={<ListAction />}
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
              "": {},
            }}>
            <Datagrid
              sx={{
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
              <TextField source="id" emptyText="Not available" />
              <TextField source="code" emptyText="Not available" label="UUID" />
              <TextField source="firstName" emptyText="Not available" />
              <TextField source="lastName" emptyText="Not available" />
              <TextField source="email" emptyText="Not available" />
              <TextField
                source="patientAccount.phoneNumber"
                sortable={false}
                label="Phone number"
                emptyText="Not available"
              />

              <WithRecord
                render={(record) => {
                  return (
                    <Button
                      key={record.id}
                      onClick={() => redirect("show", "patients", record.id)}
                      variant="text">
                      View
                    </Button>
                  );
                }}
              />
            </Datagrid>
          </List>
        )}
      </>
    );
};
export default PatientList;
