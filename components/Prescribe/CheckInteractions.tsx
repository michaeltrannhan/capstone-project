import React from "react";
import { useQuery } from "react-query";
import { ReminderPlanForm } from "../utils/commons";
import api from "../../services";
type Props = {
  reminderPlan: ReminderPlanForm[];
};

const CheckInteractions = (props: Props) => {
  const {
    data: interactions,
    isLoading: interactionsLoading,
    error: interactionsError,
  } = useQuery("interactions", () =>
    api.get(`/medication-plans/check-interaction`, {
      data: {
        medicationIdList: props.reminderPlan.map(
          (reminderPlan) => reminderPlan.medicationId
        ),
      },
    })
  );
  if (interactionsLoading) return <div>Loading...</div>;
  return <div>{interactions?.data.reactions}</div>;
};

export default CheckInteractions;
