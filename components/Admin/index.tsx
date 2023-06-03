import React, { Component, ReactElement, useMemo } from "react";
import {
  Admin,
  Resource,
  CustomRoutes,
  CreateProps,
  Title,
  defaultTheme,
  RaThemeOptions,
} from "react-admin";
import { authProvider } from "../AuthProvider";
import { Route, BrowserRouter } from "react-router-dom";
import Login from "../layout/Login";
import CustomLayout from "../layout/Layout";

import DataProvider from "../DataProvider";
import {
  faUserDoctor,
  faHospitalUser,
  faNewspaper,
  faPrescriptionBottle,
  faFilePrescription,
  faHospital,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Dashboard from "../Dashboard/Dashboard";
import Prescribe from "../Prescribe/Prescribe";
import { Provider } from "react-redux";
import store from "../../hooks/store/index";
import "dayjs/locale/en-gb";

import MedicationPlanShow from "../MedicationPlans/MedicationPlanShow";
import PatientShow from "../Patients/PatientShow";
import { ThemeOptions, Typography, createTheme } from "@mui/material";
import Chat from "../Chat";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

//Hospital Resources
import HospitalList from "../Hospitals/HospitalList";
//Doctor Resources
import DoctorCreate from "../Doctors/DoctorCreate";
import DoctorEdit from "../Doctors/DoctorEdit";
import DoctorList from "../Doctors/DoctorList";
import DoctorShow from "../Doctors/DoctorShow";

//Medication Resources
import MedicationList from "../Medications/MedicationList";
import MedicationShow from "../Medications/MedicationShow";
import MedicationCreate from "../Medications/MedicationCreate";
import MedicationEdit from "../Medications/MedicationEdit";

//Article Resources
import ArticleList from "../Articles/ArticleList";
import ArticleCreate from "../Articles/ArticleCreate";
import ArticleEdit from "../Articles/ArticleEdit";
import ArticleShow from "../Articles/ArticleShow";
//Patient Resources
import PatientList from "../Patients/PatientList";
import PatientCreate from "../Patients/PatientCreate";
import PatientEdit from "../Patients/PatientEdit";
// import PatientShow from "../Patients/PatientShow";
//Medication Plan Resources
import MedicationPlanList from "../MedicationPlans/MedicationPlanList";
import MedicationPlanCreate from "../MedicationPlans/MedicationPlanCreate";
import MedicationPlanEdit from "../MedicationPlans/MedicationPlanEdit";
// import MedicationPlanShow from "../MedicationPlans/MedicationPlanShow";

import { Role, RoleAccessesResources } from "../utils/commons";
import palette from "../theme/pallete";
import shadows from "../theme/shadow";
import typography from "../theme/typography";
import Image from "next/image";

import logo from "../../assets/images/logo.png";
import ProfilePage from "../layout/Profile";
import api from "../../services";
import { QueryClient } from "react-query";
const dataProvider = DataProvider(
  "https://capstone-project-hcmut.herokuapp.com"
  // "http://localhost:3000"
);

const myDateProvider = {
  ...dataProvider,
  getProfile: async () => {
    const rawAuth = localStorage.getItem("auth");
    const auth = JSON.parse(rawAuth || "");
    const { code } = auth;
    const { data } = await api.get(`user-accounts/profile/${code}`);
    return {
      data: data,
    };
  },
};

// const dataProvider = simpleRestProvider("http://localhost:3000", fetchJson);
const Logo = () => <Image src={logo} alt="MediReminder" />;

function getCurrentActionForResource(keyword: string) {
  switch (keyword) {
    case "medicationCreate":
      return <MedicationCreate />;
    case "medicationEdit":
      return <MedicationEdit />;
    case "medicationList":
      return <MedicationList />;
    case "medicationShow":
      return <MedicationShow />;
    case "doctor_accountCreate":
      return <DoctorCreate />;
    case "doctor_accountEdit":
      return <DoctorEdit />;
    case "doctor_accountList":
      return <DoctorList />;
    case "doctor_accountShow":
      return <DoctorShow />;
    case "articleCreate":
      return <ArticleCreate />;
    case "articleEdit":
      return <ArticleEdit />;
    case "articleList":
      return <ArticleList />;
    case "articleShow":
      return <ArticleShow />;
    case "patient_accountCreate":
      return <PatientCreate />;
    case "patient_accountEdit":
      return <PatientEdit />;
    case "patient_accountList":
      return <PatientList />;
    case "patient_accountShow":
      return <PatientShow />;
    case "medication_planCreate":
      return <MedicationPlanCreate />;
    case "medication_planEdit":
      return <MedicationPlanEdit />;
    case "medication_planList":
      return <MedicationPlanList />;
    case "medication_planShow":
      return <MedicationPlanShow />;
    case "hospitalList":
      return <HospitalList />;
    default:
      return <div>Not Found!</div>;
  }
}

function DoctorIcon() {
  return <FontAwesomeIcon icon={faUserDoctor} size="lg" />;
}
function PatientIcon() {
  return <FontAwesomeIcon icon={faHospitalUser} size="lg" />;
}
function ArticleIcon() {
  return <FontAwesomeIcon icon={faNewspaper} size="lg" />;
}
function MedicationIcon() {
  return <FontAwesomeIcon icon={faPrescriptionBottle} size="lg" />;
}
function HospitalIcon() {
  return <FontAwesomeIcon icon={faHospital} size="1x" />;
}
function MedicationPlanIcon() {
  return <FontAwesomeIcon icon={faFilePrescription} size="lg" />;
}

function getIconFromResources(resources: string) {
  switch (resources) {
    case "medication":
      return MedicationIcon;
    case "doctor_account":
      return DoctorIcon;
    case "hospital":
      return HospitalIcon;
    case "patient_account":
      return PatientIcon;
    case "medication_plan":
      return MedicationPlanIcon;
    case "article":
      return ArticleIcon;
    default:
      return MedicationIcon;
  }
}
const Empty = () => (
  <div>
    <Typography>Nothing here</Typography>
  </div>
);

const queryClient = new QueryClient();

const App = () => {
  //
  const themeOptions: ThemeOptions = useMemo(
    () => ({
      palette: palette,
      shape: {
        borderRadius: 6,
      },
      typography: typography,
      shadows: shadows(),
    }),
    []
  );
  const theme = createTheme(themeOptions);

  const theme1 = {
    ...defaultTheme,
    palette: palette,
    shape: { borderRadius: 6 },
    typography: typography,
    shadows: shadows(),
    components: {
      ...defaultTheme.components,
      MuiPaper: {
        defaultProps: {
          elevation: 0,
        },
        styleOverrides: {
          root: {
            backgroundImage: "none",
            borderRadius: "20px",
            // borderRadius: "12px",
            // border: "1px solid #e0e0e0",
            // borderBottomRadius: 0,
          },
        },
      },

      MuiTableCell: {
        styleOverrides: {
          head: {
            color: theme.palette.text.secondary,
            backgroundColor: theme.palette.background.neutral,
          },
        },
      },
      MuiTable: {
        styleOverrides: {
          root: {
            // border: "1px solid #e0e0e0",
            // borderRadius: "12px",
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {},
        },
      },
      MuiToolbar: {
        styleOverrides: {
          root: {
            padding: 0,
            // margin: "2em 0 0 0",
            // marginBottom: "20px",
            backgroundColor: "#fff",
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            paddingY: "0.5em",
            paddingX: "1em",
            fontWeight: 600,
            fontSize: "0.875rem",
            lineHeight: "1.75",
            borderRadius: "12px",
          },
        },
      },
      MuiTablePagination: {
        styleOverrides: {
          root: {
            // borderTopLeftRadius: "1px",
            // borderTopRightRadius: "1px",
            borderRadius: "0 0 20px 20px",
          },
          toolbar: {
            // border: "1px solid #e0e0e0",
            border: "none",
            borderRadius: "0 0 20px 20px",
          },
        },
      },
      RaDatagrid: {
        styleOverrides: {
          root: {
            table: {},
            thead: {
              background: "rgb(248, 249, 250)",
            },
            "& .RaDatagrid-headerCell": {
              background: "rgb(248, 249, 250)",
            },
            "& .RaDatagrid-row	": {
              // "& :last-child > ": {
              //   borderBottomLeftRadius: 0,
              //   borderBottomRightRadius: 0,
              // },
            },
            "& .RaDatagrid-tbody	": {
              "& .RaDatagrid-row	": {
                "&:last-child > td": {
                  borderBottomRadius: 0,
                },
              },
            },
          },
        },
      },
      RaList: {
        styleOverrides: {
          root: {
            "& .RaList-main	": {
              margin: "20px",
              border: "1px solid #F4F6F8",
              background: "#F9FAFB",
              boxShadow:
                "rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px",
              borderRadius: "20px",
              "& :last-child > .MuiToolbar-root	": {
                borderBottomLeftRadius: "20px",
                borderBottomRightRadius: "20px",
              },
              "& :last-child > td": {
                borderBottom: 0,
                // marginBottom: 3,
              },
            },
            "& .RaList-actions	": {
              paddingTop: 0,
              marginTop: 0,
            },
            "& :first-of-type > .MuiToolbar-root	": {
              borderTopLeftRadius: "20px",
              borderTopRightRadius: "20px",
            },
            "& .filter-field": {
              width: "100%",
              marginLeft: "20px",
            },
          },
        },
      },
      RaFilterForm: {
        styleOverrides: {
          root: {
            "& .RaFilterForm-input": {
              marginLeft: "40px",
              background: "red",
            },
          },
        },
      },
      RaMenuItemLink: {
        styleOverrides: {
          root: {
            // invisible border when not active, to avoid position flashs
            // boxShadow:
            //   "rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px",
            borderRadius: "20px 0px 0px 20px",
            borderLeft: "3px solid transparent",
            "&.RaMenuItemLink-active": {
              borderRight: "5px solid #00C2CB",
              backgroundColor: "rgba(0, 194, 203, 0.2)",
            },
            "& .RaMenuItemLink-icon": {
              color: "#00C2CB",
            },
          },
        },
      },
      RaShow: {
        styleOverrides: {
          root: {
            // marginRight: "40px",
          },
        },
      },
    },
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
      <Provider store={store}>
        <BrowserRouter>
          <Admin
            queryClient={queryClient}
            dataProvider={myDateProvider}
            authProvider={authProvider}
            loginPage={Login}
            dashboard={Dashboard}
            requireAuth
            theme={theme1}
            title="MediReminder"
            layout={CustomLayout}>
            {(permissions: Role) => {
              const filteredResources =
                permissions.name === "ADMIN"
                  ? permissions.roleAccessesResources
                      .filter(
                        (e) =>
                          !e.resource.name.includes("manage") &&
                          !e.resource.name.includes("saves") &&
                          !e.resource.name.includes("includes") &&
                          !e.resource.name.includes("reminder_plan") &&
                          !e.resource.name.includes("attachment") &&
                          !e.resource.name.includes("user") &&
                          !e.resource.name.includes("resource") &&
                          !e.resource.name.includes("role") &&
                          !e.resource.name.includes("operator")
                      )
                      .sort((a, b) =>
                        a.resource.name.localeCompare(b.resource.name)
                      )
                  : permissions.roleAccessesResources
                      .filter(
                        (e) =>
                          !e.resource.name.includes("manage") &&
                          !e.resource.name.includes("saves") &&
                          !e.resource.name.includes("includes") &&
                          !e.resource.name.includes("reminder_plan") &&
                          !e.resource.name.includes("attachment") &&
                          !e.resource.name.includes("operator_account") &&
                          !e.resource.name.includes("hospital") &&
                          !e.resource.name.includes("user") &&
                          !e.resource.name.includes("resource") &&
                          !e.resource.name.includes("role")
                      )
                      .sort((a, b) =>
                        a.resource.name.localeCompare(b.resource.name)
                      );

              return (
                <>
                  {filteredResources.map((e, index) => {
                    const listName = `${e.resource.name}List` as string;
                    const editName = `${e.resource.name}Edit` as string;
                    const showName = `${e.resource.name}Show` as string;
                    const createName = `${e.resource.name}Create` as string;
                    const tempResourceName = e.resource.name;

                    const resourceName = tempResourceName.includes("_")
                      ? tempResourceName === "medication_plan"
                        ? "medication-plans"
                        : tempResourceName.substring(
                            0,
                            tempResourceName.indexOf("_")
                          ) + "s"
                      : tempResourceName + "s";

                    const listComponent = getCurrentActionForResource(listName);
                    const editComponent = getCurrentActionForResource(editName);
                    const showComponent = getCurrentActionForResource(showName);
                    const createComponent =
                      getCurrentActionForResource(createName);
                    const icon = getIconFromResources(tempResourceName);

                    return (
                      <Resource
                        key={index}
                        name={resourceName}
                        // options={{ label: displayLabel }}
                        icon={icon}
                        list={e.canView ? listComponent : Empty}
                        create={e.canAdd ? createComponent : Empty}
                        edit={e.canEdit ? editComponent : Empty}
                        show={e.canView ? showComponent : Empty}
                      />
                    );
                  })}
                  <CustomRoutes>
                    {permissions.name === "DOCTOR" ? (
                      <>
                        <Route path="/prescribe" element={<Prescribe />} />
                        <Route path="/patient-report" />
                        <Route path="/chat" element={<Chat />} />
                      </>
                    ) : null}
                    <Route path="/profile" element={<ProfilePage />} />
                  </CustomRoutes>
                </>
              );
            }}
          </Admin>
        </BrowserRouter>
      </Provider>
    </LocalizationProvider>
  );
};
export default App;
