import api, { getAuthorizationHeader } from "../../services";
import { User, apiURL } from "../utils/commons";

export interface AuthProviderProps {
  username: string;
  password: string;
}

export const authProvider = {
  // called when the user attempts to log in
  login: async ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    const { data, status } = await api.post<User>("auth/operator/login", {
      username,
      password,
    });
    localStorage.setItem("auth", JSON.stringify(data, null, 2));
    return Promise.resolve({ data });
  },
  // called when the user clicks on the logout button
  logout: () => {
    localStorage.removeItem("auth");
    return Promise.resolve();
  },

  // called to get user information
  getIdentity: () => {
    try {
      const auth = localStorage.getItem("auth");
      const { id, firstName, lastName, attachment, code, operatorAccount } =
        JSON.parse(auth || "");
      const { hospitalId } = operatorAccount;
      localStorage.setItem("avatar", attachment ? attachment.filePath : null);
      localStorage.setItem("code", code);
      localStorage.setItem("hospitalId", hospitalId);
      localStorage.setItem("id", id);
      // const img = attachment ? attachment.filePath : null;
      const img = localStorage.getItem("avatar");
      const fullName = `${firstName} ${lastName}`;
      return Promise.resolve({
        id: id,
        fullName: fullName,
        avatar: img ? img : "",
        code: code,
        hospitalId: hospitalId,
      });
    } catch (error) {
      return Promise.reject(error);
    }
  },

  // called when the API returns an error
  checkError: ({ status }: { status: number }) => {
    if (status === 401 || status === 403) {
      localStorage.removeItem("auth");
      return Promise.reject();
    }
    return Promise.resolve();
  },
  // called when the user navigates to a new location, to check for authentication
  checkAuth: () => {
    return localStorage.getItem("auth") ? Promise.resolve() : Promise.reject();
  },
  // called when the user navigates to a new location, to check for permissions / roles
  getPermissions: () => {
    const rawAuth = localStorage.getItem("auth");
    const auth = JSON.parse(rawAuth || "") as User;
    // const role = auth.role
    // const { role } = JSON.parse(auth || "");
    // console.log(role.roleAccessesResources);
    return Promise.resolve(auth.role);
  },
};
