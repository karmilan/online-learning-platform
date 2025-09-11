import api from "./Api";

const enrollmentService = {
  getAllEnrollments: async (token: string) => {
    const tokenVal = token.replace(/"/g, "");
    console.log("token", token);

    const response = await api.get("/enrollments", {
      headers: { Authorization: `Bearer ${tokenVal}` },
    });
    console.log("response>>", response);

    return response.data;
  },

  getAllEnrollmentsByUserId: async (id: string, token: string) => {
    const tokenVal = token.replace(/"/g, "");
    console.log("token", token);

    const response = await api.get(`/enrollments/user/${id}`, {
      headers: { Authorization: `Bearer ${tokenVal}` },
    });
    console.log("response>>", response);

    return response.data;
  },

  addEnrollment: async (enrollmentData: unknown, token: string) => {
    console.log(enrollmentData);

    const tokenVal = token.replace(/"/g, "");
    console.log("tokenVal", tokenVal);

    const response = await api.post("/enrollments", enrollmentData, {
      headers: {
        Authorization: `Bearer ${tokenVal}`,
      },
    });
    console.log("response>>", response);
    return response;
    // return response.data;
  },

  updateEnrollment: async (
    id: string,
    enrollmentData: unknown,
    token: string
  ) => {
    const tokenVal = token.replace(/"/g, "");
    const response = await api.put(`/enrollments/${id}`, enrollmentData, {
      headers: { Authorization: `Bearer ${tokenVal}` },
    });
    console.log("response>>>", response);
    return response.data;
  },

  deleteEnrollment: async (id: string, token: string) => {
    const tokenVal = token.replace(/"/g, "");
    const response = await api.delete(`/enrollments/${id}`, {
      headers: { Authorization: `Bearer ${tokenVal}` },
    });
    return response.data;
  },
};

export default enrollmentService;
