import {
  Menu,
  useGetPermissions,
  usePermissions,
  useResourceDefinitions,
} from "react-admin";
import LabelIcon from "@mui/icons-material/Label";
import { Divider } from "@mui/material";
import {
  HomeRounded,
  ChatBubbleOutlineRounded,
  ArrowForwardIosRounded,
  HelpOutlineOutlined,
  AccountCircleOutlined,
  LogoutOutlined,
} from "@mui/icons-material";
import {
  faHome,
  faPrescription,
  faUser,
  faMessage,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Role } from "../utils/commons";

export const CustomMenu = () => {
  const resources = useResourceDefinitions();
  const { isLoading, permissions }: { isLoading: boolean; permissions: Role } =
    usePermissions();
  // console.log(resources);

  return isLoading ? (
    <div>Loading contents</div>
  ) : (
    <Menu
      sx={{
        "&.RaMenu-open	": {
          marginTop: 0,
          height: "100%",
          borderRadius: "20px",
          // background: "#F9FAFB",
          background: "white",
        },
      }}>
      <Menu.Item
        to="/"
        primaryText="Home"
        leftIcon={<FontAwesomeIcon icon={faHome} />}
      />
      {Object.keys(resources).map((name) => (
        <Menu.ResourceItem key={name} name={name} />
      ))}
      <Divider />
      <Menu.Item
        to="/profile"
        primaryText="Profile"
        leftIcon={<FontAwesomeIcon icon={faUser} size="lg" />}
      />
      {permissions.name === "DOCTOR" ? (
        <Menu.Item
          to="/prescribe"
          primaryText="Prescribe"
          leftIcon={<FontAwesomeIcon icon={faPrescription} size="lg" />}
        />
      ) : null}
      {permissions.name === "DOCTOR" ? (
        <Menu.Item
          to="/chat"
          primaryText="Chat"
          leftIcon={<FontAwesomeIcon icon={faMessage} size="lg" />}
        />
      ) : null}
      {permissions.name === "DOCTOR" && (
        <Menu.Item
          to="/patient-report"
          primaryText="Patient Report"
          leftIcon={<FontAwesomeIcon icon={faPrescription} size="lg" />}
        />
      )}
    </Menu>
  );
};
