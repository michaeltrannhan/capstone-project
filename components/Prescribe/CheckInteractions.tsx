import React from "react";
import { useQuery } from "react-query";
import { ReminderPlanForm } from "../utils/commons";
import api from "../../services";
import { Box, Chip, CircularProgress } from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";
type Props = {
  reminderPlan: ReminderPlanForm[];
};
import * as _ from "lodash";
interface Interactions {
  reagentId: string;
  name: string;
  description: string;
}
interface Reactions {
  id: string;
  name: string;
  interactions: Interactions[];
}

type Response = {
  reactions: Reactions[];
};

const CheckInteractions = (props: Props) => {
  const medIds = props.reminderPlan.map((item) => item.medicationId);
  const [descArr, setDescArr] = React.useState<string[]>([]);
  const {
    data: interactions,
    isLoading: interactionsLoading,
    isFetching: interactionsFetching,
    error: interactionsError,
  } = useQuery<Response>("interactions", () =>
    api
      .get(`/medication-plans/check-interaction?ids=${medIds}`)
      .then((res) => res.data)
      .catch((err) => console.log(err))
  );
  if (interactionsFetching)
    return (
      <div>
        <CircularProgress />
      </div>
    );
  if (interactionsError) return <div>Error</div>;
  const desc = interactions?.reactions.flatMap((reaction) =>
    reaction.interactions.map((item) => item.description)
  );
  const uniqDesc = _.uniq(desc);
  return (
    <Box
      sx={{
        width: "100%",
        display: "grid",
        padding: 3,
        alignContent: "center",
        justifyContent: "center",
      }}>
      {uniqDesc ? (
        uniqDesc.map((item, index) => (
          <Box
            sx={{
              padding: 1,
            }}
            key={index}>
            <Chip
              label={item}
              sx={{ fontSize: 16 }}
              color="error"
              icon={<ErrorIcon sx={{ color: "red" }} />}
            />
          </Box>
        ))
      ) : interactionsFetching ? (
        <CircularProgress />
      ) : (
        "No interactions found"
      )}
    </Box>
  );
};

export default CheckInteractions;
