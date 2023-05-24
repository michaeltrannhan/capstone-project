import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  Grid,
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";
import DebouncedInput from "../form-components/DebouncedInput";
import api, { getAuthorizationHeader } from "../../services";
import LineChart from "./LineExample";
import Head from "next/head";
import StatsCard from "./StatsCard";
import { useQuery } from "react-query";
import {
  faUserDoctor,
  faPills,
  faNewspaper,
  faUserInjured,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useGetIdentity, usePermissions, useRedirect } from "react-admin";
import InfoIcon from "@mui/icons-material/Info";
import { Role } from "../utils/commons";
import DoctorDashboard from "./DoctorDashboard";
import AdminDashboard from "./AdminDashboard";

type PerDay = {
  lastActive: string;
  count: number;
};

type ActiveUserWeekLy = PerDay[];

type UserAccountSimple = {
  code: string;
  firstName?: string;
  lastName?: string;
  createdAt: Date;
};
type DoctorAccountSimple = {
  operatorAccount: UserAccountSimple;
};
type PatientAccountSimple = {
  userAccount: UserAccountSimple;
};

type NewlyRegisteredPatient = {
  patientAccountId: number;
  patientAccount: PatientAccountSimple;
  doctorAccountId: number;
  doctorAccount: DoctorAccountSimple;
};
type Response = {
  patientsAvailable: number;
  doctorsAvailable: number;
  medicinesAvailable: number;
  articlesAvailable: number;
  activeUsersWeekly: ActiveUserWeekLy;
  newlyRegisteredPatients: NewlyRegisteredPatient[];
};

export default function Dashboard() {
  const rawAuth = localStorage.getItem("auth");
  const auth = JSON.parse(rawAuth ? rawAuth : "{}");
  return (
    <>
      {auth.role.name === "DOCTOR" ? <DoctorDashboard /> : <AdminDashboard />}
    </>
  );
}
