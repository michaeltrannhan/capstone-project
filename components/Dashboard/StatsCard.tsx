import React from "react";
import { Card, CardContent, CardHeader } from "@mui/material";
type Props = {
  title: string;
};

const StatsCard = (props: Props) => {
  return (
    <Card>
      <CardHeader
        title={props.title}
        sx={{
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      />
      <CardContent>
        <h1>Stats</h1>
      </CardContent>
    </Card>
  );
};

export default StatsCard;
