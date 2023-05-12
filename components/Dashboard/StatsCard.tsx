import React, { ChangeEvent } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Icon,
  SvgIcon,
  Typography,
  styled,
  Theme,
  CardActionArea,
  Divider,
  CardActions,
} from "@mui/material";
import { Button, useRedirect } from "react-admin";

type Props = {
  title: string;
  sx?: any;
  color: string;
  total?: number;
  children?: React.ReactNode;
};

const StyledIcon = styled("div")(({ theme }) => ({
  margin: "auto",
  display: "flex",
  borderRadius: "50%",
  alignItems: "center",
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: "center",
  marginBottom: theme.spacing(3),
}));
const getColorObject = (color: string) => {
  switch (color) {
    case "primary":
      return (theme: Theme) => theme.palette.primary.darker;
    case "info":
      return (theme: Theme) => theme.palette.info.darker;
    case "warning":
      return (theme: Theme) => theme.palette.warning.darker;
    case "error":
      return (theme: Theme) => theme.palette.error.darker;
    case "success":
      return (theme: Theme) => theme.palette.success.darker;
  }
};
const getBgColorObject = (color: string) => {
  switch (color) {
    case "primary":
      return (theme: Theme) => theme.palette.primary.lighter;
    case "info":
      return (theme: Theme) => theme.palette.info.lighter;
    case "warning":
      return (theme: Theme) => theme.palette.warning.lighter;
    case "error":
      return (theme: Theme) => theme.palette.error.lighter;
    case "success":
      return (theme: Theme) => theme.palette.success.lighter;
  }
};
const StatsCard = (props: Props) => {
  const redirect = useRedirect();
  return (
    <Card
      sx={{
        py: 5,
        boxShadow: 0,
        textAlign: "center",
        paddingBottom: "10px",
        color: getColorObject(props.color),
        bgcolor: getBgColorObject(props.color),
        ...props.sx,
      }}
      {...props}>
      <StyledIcon>{props.children}</StyledIcon>
      <Typography variant="h3">
        {props.total ? props.total : "Undefined"}
      </Typography>
      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        {props.title} available
      </Typography>
      <CardActions
        onClick={() => redirect("list", props.title)}
        sx={{
          paddingTop: 2,
          textAlign: "center",
          justifyContent: "center",
        }}>
        <Button
          onClick={() => redirect("list", props.title)}
          label={`Go to ${props.title} page`}
          sx={{
            width: "100%",
          }}
        />
      </CardActions>
    </Card>
  );
};

export default StatsCard;
