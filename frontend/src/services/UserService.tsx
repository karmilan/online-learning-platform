import api from "./Api";

const userService = {
  getAllUsers: async (token: string) => {
    const tokenVal = token.replace(/"/g, "");
    console.log("token", token);

    const response = await api.get("/users", {
      headers: { Authorization: `Bearer ${tokenVal}` },
    });
    console.log("response>>", response);

    return response.data;
  },

  addUser: async (userData: unknown, token: string) => {
    console.log(userData);

    const tokenVal = token.replace(/"/g, "");
    console.log("tokenVal", tokenVal);

    const response = await api.post("/users", userData, {
      headers: {
        Authorization: `Bearer ${tokenVal}`,
      },
    });
    console.log("response>>", response);
    return response;
    // return response.data;
  },

  updateUser: async (id: string, userData: unknown, token: string) => {
    const tokenVal = token.replace(/"/g, "");
    const response = await api.put(`/users/${id}`, userData, {
      headers: { Authorization: `Bearer ${tokenVal}` },
    });
    console.log("response>>>", response);
    return response.data;
  },

  deleteUser: async (id: string, token: string) => {
    const tokenVal = token.replace(/"/g, "");
    const response = await api.delete(`/users/${id}`, {
      headers: { Authorization: `Bearer ${tokenVal}` },
    });
    return response.data;
  },
};

export default userService;
