import React from "react";
import { Stack, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { CreateButton, usePermissions } from "react-admin";
import { Role } from "../utils/commons";
const ListTitle = ({ resource }: { resource: string }) => {
  const { permissions } = usePermissions<Role, any>();
  // const unaccpetedResource = ["Hospital", "Medication Plan", "Medication"];
  const unacceptedResource: string[] = ["Hospital", "Medication Plan"];
  return (
    <Stack
      direction="row"
      spacing={0}
      justifyContent="space-between"
      alignItems="baseline">
      <Typography variant="h3" sx={{ marginTop: "40px", marginLeft: "20px" }}>
        List of {resource}
      </Typography>
      {permissions.name === "ADMIN" ? (
        <>
          {!unacceptedResource.includes(resource) && (
            <CreateButton
              variant="contained"
              label={`Add ${resource}`}
              icon={<AddIcon />}
              sx={{
                paddingY: "0.5em",
                paddingX: "1em",
                fontWeight: 600,
                marginRight: "20px",
                fontSize: "0.875rem",
                lineHeight: "1.75",
                backgroundColor: "rgb(99, 102, 241)",
                borderRadius: "12px",
                border: "1px solid #E0E2E7",
                boxShadow: "rgba(0, 0, 0, 0.08) 0px 1px 5px",
                justifyContent: "flex-end",
                width: "auto",
              }}
            />
          )}
        </>
      ) : null}
    </Stack>
  );
};

export default ListTitle;
