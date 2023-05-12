import { Box, InputAdornment, Stack, Typography } from "@mui/material";
import React from "react";
import {
  List,
  TextField,
  Datagrid,
  EditButton,
  ShowButton,
  useRecordContext,
  TextInput,
  usePermissions,
  CreateButton,
  BulkDeleteButton,
  BulkExportButton,
  ExportButton,
} from "react-admin";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import ActionToolbar from "../commons/ListActionToolbar";
import ListAction from "../commons/ListAction";
import ResetViewsButton from "../Articles/ResetViewsButton";
import ListTitle from "../commons/ListTitle";
import ListFilters from "../commons/ListFilters";
import Head from "next/head";

const MedicationPanel = () => {
  const record = useRecordContext();
  return <div dangerouslySetInnerHTML={{ __html: record.description }} />;
};

const listFilter = [
  <TextInput
    color="primary"
    placeholder="Search any medications"
    key={1}
    source="q"
    variant="outlined"
    alwaysOn
    label="Search"
    sx={{
      width: "100%",
      // marginX: "2em",
      marginBottom: "0.5em",
    }}
    InputProps={{
      startAdornment: (
        <InputAdornment position="start">
          <SearchIcon />
        </InputAdornment>
      ),
    }}
  />,
];

const BulkAction = () => (
  <>
    <ResetViewsButton />
    <ExportButton />
    <BulkDeleteButton />
  </>
);

const MedicationList = () => {
  const { permissions } = usePermissions();
  return (
    <>
      <Head>
        <title>List of Medications</title>
      </Head>
      <ListTitle resource="Medication" />
      <List
        sx={{
          width: "100%",
        }}
        actions={<ListAction />}
        filters={ListFilters("Search medications", "Search")}>
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
          }}
          stickyHeader
          bulkActionButtons={<BulkAction />}
          // bulkActionButtons={false}
          expand={MedicationPanel}
          isRowExpandable={(row) => row.description}>
          <TextField source="id" />
          <TextField source="name" />
          <TextField source="code" />
          <TextField source="description" cellClassName="description" />
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
export default MedicationList;
