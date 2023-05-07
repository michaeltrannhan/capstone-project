import api from ".";
import { Profile } from "../components/utils/commons";
// import { Medication } from '../components/utils/commons';
// import { getAuthorizationHeader } from ".";

const fetchProfileByUUID = async (uuid: string) => {
  try {
    const url = `user-accounts/profile/${uuid}`;
    const { config, data, headers, status, statusText, request } =
      await api.get<Profile>(url);
    return data;
  } catch (error) {
    console.log(JSON.stringify(error, null, 2));
    return null;
  }
};

const ProfileServices = {
  fetchProfileByUUID,
};

export default ProfileServices;
