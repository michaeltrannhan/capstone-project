import {
  BaseReminderPlanForm,
  Frequency,
  IntervalReminderPlanForm,
  MedicationPlanForm,
  SelectedDaysReminderPlanForm,
} from "./commons";

export const createReminderPlanTime = () => ({
  dosage: 1,
  time: "08:00",
});

export const createBaseReminderPlan = (
  medicationName: string,
  medicationId: number
): BaseReminderPlanForm => {
  const startDate = new Date();
  const endDate = new Date();
  endDate.setDate(endDate.getDate() + 1);
  return {
    medicationName,
    medicationId,
    startDate,
    endDate,
    reminderPlanTimes: [createReminderPlanTime()],
  };
};

export const createIntervalReminderPlan = (
  medicationName: string,
  medicationId: number
): IntervalReminderPlanForm => ({
  ...createBaseReminderPlan(medicationName, medicationId),
  frequency: Frequency.INTERVAL,
  interval: 1,
});

export const createSelectedDaysReminderPlan = (
  medicationName: string,
  medicationId: number
): SelectedDaysReminderPlanForm => ({
  ...createBaseReminderPlan(medicationName, medicationId),
  frequency: Frequency.SELECTED_DAYS,
  selectedDays: Array.from(Array(7).keys()),
});

export const createMedicationPlanForm = (
  doctorId: number
): MedicationPlanForm => ({
  reminderPlans: [],
  doctorId: doctorId,
});
