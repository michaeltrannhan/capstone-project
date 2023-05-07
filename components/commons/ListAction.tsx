import React from "react";
import {
  CreateButton,
  ExportButton,
  FilterButton,
  TopToolbar,
  usePermissions,
} from "react-admin";
import IosShareOutlinedIcon from "@mui/icons-material/IosShareOutlined";

import AddIcon from "@mui/icons-material/Add";

const ListAction = () => {
  const { permissions } = usePermissions();
  return (
    <TopToolbar
      sx={{
        alignItems: "center",
        marginRight: "20px",
      }}>
      <FilterButton />
      <ExportButton
        variant="contained"
        label="Export"
        sx={{
          paddingY: "0.5em",
          paddingX: "1em",
          fontWeight: 600,
          fontSize: "0.875rem",
          lineHeight: "1.75",
          backgroundColor: "rgb(99, 102, 241)",
          borderRadius: "12px",
          border: "1px solid #E0E2E7",
          boxShadow: "rgba(0, 0, 0, 0.08) 0px 1px 5px",
        }}
        icon={<IosShareOutlinedIcon height={18} />}
      />
    </TopToolbar>
  );
};

export default ListAction;
