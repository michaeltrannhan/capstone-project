import React from "react";
import { useQuery } from "react-query";
import { ReminderPlanForm } from "../utils/commons";
import api from "../../services";
import { Box, Chip } from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";
type Props = {
  reminderPlan: ReminderPlanForm[];
};

const CheckInteractions = (props: Props) => {
  const medIds = props.reminderPlan.map((item) => item.medicationId);
  const {
    data: interactions,
    isLoading: interactionsLoading,
    error: interactionsError,
  } = useQuery("interactions", () =>
    api
      .get(`/medication-plans/check-interaction?ids=${medIds}`)
      .then((res) => res.data)
      .catch((err) => console.log(err))
  );
  if (interactionsLoading) return <div>Loading...</div>;
  // console.log(interactions.reactions);
  return (
    <Box
      sx={{
        width: "100%",
        display: "grid",
        padding: 3,
        alignContent: "center",
        justifyContent: "center",
      }}>
      {interactions ? (
        <>
          {interactions.reactions.map((reaction: any) => (
            <Box
              sx={{
                padding: 1,
              }}
              key={reaction.id}>
              {reaction.interactions.map((interaction: any, index: number) => (
                <div key={index}>
                  <Chip
                    label={interaction.description}
                    sx={{
                      fontSize: 16,
                    }}
                    color="error"
                    icon={
                      <ErrorIcon
                        sx={{
                          color: "red",
                        }}
                      />
                    }
                  />
                </div>
              ))}
            </Box>
          ))}
        </>
      ) : null}
    </Box>
  );
};

export default CheckInteractions;
