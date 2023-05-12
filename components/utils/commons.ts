import dayjs from "dayjs";

export const apiURL = "https://capstone-project-hcmut.herokuapp.com/";

export type CustomRoutes = "Prescribe" | "Chat";

export type Attachment = {
  filePath: string;
};

export type DoctorManagesPatients = {};

export type Article = {
  id: number;
  hospitalId: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  _count: Object;
};

export type Resources = {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
};

export type RoleAccessesResources = {
  resourceId: number;
  roleId: number;
  canView: boolean;
  canAdd: boolean;
  canEdit: boolean;
  canDelete: boolean;
  createdAt: Date;
  updatedAt: Date;
  resource: Resources;
};

export type Role = {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  roleAccessesResources: RoleAccessesResources[];
};

export type PatientAccount = {
  insuranceNumber: string;
  userAccountId: number;
  phoneNumber: string;
  username?: string;
  occupation?: string;
  doctorManagesPatients: DoctorManagesPatients[];
  medicationPlans: MedicationPlan[];
};

export type DoctorAccount = {
  operatorAccountId: 5;
  faculty?: string;
  yearOfExperience?: number;
  doctorManagesPatients: DoctorManagesPatients[];
  medicationPlans: MedicationPlanForm[];
  qualifications?: string[];
};

export type HospitalAdminAccount = {
  operatorAccountId: number;
};

export type Hospital = {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
};

export type HospitalAdminAccountDTO = {
  userAccountId: number;
  username: string;
  phoneNumber?: number;
  hospitalId: number;
  hospital: Hospital;
  hospitalAdminAccount?: HospitalAdminAccount;
};

export type DoctorAccountDTO = {
  userAccountId: number;
  username: string;
  phoneNumber?: number;
  hospitalId: number;
  hospital: Hospital;
  doctorAccount: DoctorAccount;
};

export type OperatorAccount = HospitalAdminAccountDTO | DoctorAccountDTO;

export type User = {
  token: string;
  id: number;
  code: string;
  lastActive: string;
  createdAt: string;
  updatedAt: string;
  roleId: number;
  attachment: Attachment;
  role: Role;
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  gender: string | null;
  address: string | null;
  socialSecurityNumber: string | null;
  nationality: string | null;
  birthday: string | null;
  patientAccount?: PatientAccount;
  operatorAccount?: OperatorAccount;
};

export interface MedicationType {
  id: number;
  code: string;
  name: string;
  description: string;
}

export interface ReminderPlanTimeDTO {
  dosage: number;
  isTaken: boolean;
  isSkipped: boolean;
  time: Date;
  sentAt?: Date;
  patientAccountId: number;
  reminderPlanMedicationPlanId: number;
  reminderPlanMedicationId: number;
}

export enum Frequency {
  INTERVAL = "DAY_INTERVAL",
  SELECTED_DAYS = "SELECTED_DAYS",
}

export const FREQUENCY_TYPES = Object.values(Frequency);

// Interval, Selected days,
// Interval :
export interface ReminderPlanDTO {
  interval?: number;
  selectedDays?: number[];
  frequency: Frequency;
  startDate: Date;
  medicationID: MedicationType["id"];
  localMedicationName: MedicationType["name"];
  medication: MedicationType;
  stock: number;
  note: string;
  endDate?: Date;
  reminderPlanTimes: Array<ReminderPlanTimeDTO>;
}

export interface MedicationPlanDTO {
  patientID: string;
  phoneNumber: string;
  name: string;
  reminderPlans: ReminderPlanDTO[];
  note: string;
  doctorID: string;
}

export type Medication = {
  id: number;
  code: string;
  description: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export type ReminderPlanTime = {
  isTaken: boolean;
  isSkipped: boolean;
  time: string;
  dosage: number;
  patientAccountId: number;
  reminderPlanMedicationPlanId: number;
  reminderPlanMedicationId: number;
  sentAt?: string;
};

export type ReminderPlan = {
  frequency: Frequency;
  stock: number;
  startDate: string;
  endDate?: string;
  createdAt: string;
  updatedAt: string;
  medicationPlanId: number;
  medicationId: number;
  medication: Medication;
  reminderPlanTimes: ReminderPlanTime[];
  localMedicationName?: string;
  note?: string;
};

export type MedicationPlan = {
  id: number;
  doctorAccountId: number;
  patientAccountId: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  reminderPlans: ReminderPlan[];
  note?: string;
};

//Form types:

export type ReminderPlanTimeForm = {
  dosage: number;
  time: string;
};

export type BaseReminderPlanForm = {
  startDate: Date;
  reminderPlanTimes: ReminderPlanTimeForm[];
  medicationName?: string;
  medicationId?: number;
  endDate?: Date;
};

export type IntervalReminderPlanForm = BaseReminderPlanForm & {
  frequency: Frequency.INTERVAL;
  interval: number;
};

export type SelectedDaysReminderPlanForm = BaseReminderPlanForm & {
  frequency: Frequency.SELECTED_DAYS;
  selectedDays: number[];
};

export type ReminderPlanForm =
  | IntervalReminderPlanForm
  | SelectedDaysReminderPlanForm;

export type MedicationPlanForm = {
  patientId?: number;
  name?: string;
  reminderPlans: ReminderPlanForm[];
  doctorId: number;
};

export type SelectOptions = {
  value: string;
  label: string;
};

export type MultipleSelectOptions = {
  value: number;
  label: string;
};

export const FrequencyOptions = [
  { value: Frequency.INTERVAL, label: "Interval" },
  { value: Frequency.SELECTED_DAYS, label: "Selected days" },
];

export const DaysOfWeekOptions = [
  { value: "1", label: "Monday" },
  { value: "2", label: "Tuesday" },
  { value: "3", label: "Wednesday" },
  { value: "4", label: "Thursday" },
  { value: "5", label: "Friday" },
  { value: "6", label: "Saturday" },
  { value: "0", label: "Sunday" },
];

// Utils to convert time to string to match ReminderPlanTime
export const DATE_FORMAT = {
  hourMinutes: "HH:mm",
  dayMonthYear: "DD-MM-YYYY",
};

export const convertTimeToHoursMinutes = (time: Date): string => {
  return dayjs(time).format(DATE_FORMAT.hourMinutes);
};

export const createDateWithHoursMinutes = (
  hour: number,
  minutes: number
): Date => {
  const date = new Date();
  date.setHours(hour);
  date.setMinutes(minutes);
  return date;
};

export const convertHoursMinutesStringToDate = (value: string) => {
  const [hours, minutes] = value.split(":").map((value) => parseInt(value));
  return createDateWithHoursMinutes(hours, minutes);
};

export type ResponseType = Role | Medication | User | MedicationPlan | Article;

export type ProfileRole = {
  id: number;
  name: string;
  description: string;
};

export type ProfileOperatorAccount = {
  userAccountId: number;
  username: string;
  phoneNumber: string;
  hospitalId: number;
};

export type Profile = {
  id: number;
  passwordHash: string;
  code: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  address: string;
  socialSecurityNumber: string;
  nationality: string;
  birthday: string;
  lastActive: string;
  createdAt: Date;
  updatedAt: Date;
  roleId: number;
  attachment: Attachment | null;
  role: ProfileRole;
  operatorAccount?: ProfileOperatorAccount;
  patientAccount?: PatientAccount[];
};

export type ProfilePassword = {
  oldPassword: string;
  newPassword: string;
};
