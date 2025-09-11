import api from "./Api";

const courseService = {
  getAllCourses: async (token: string) => {
    const tokenVal = token.replace(/"/g, "");
    console.log("token", token);

    const response = await api.get("/courses", {
      headers: { Authorization: `Bearer ${tokenVal}` },
    });
    console.log("response>>", response);

    return response.data;
  },

  addCourse: async (courseData: unknown, token: string) => {
    console.log(courseData);

    const tokenVal = token.replace(/"/g, "");
    console.log("tokenVal", tokenVal);

    const response = await api.post("/courses", courseData, {
      headers: {
        Authorization: `Bearer ${tokenVal}`,
      },
    });
    console.log("response>>", response);
    return response;
    // return response.data;
  },

  updateCourse: async (id: string, courseData: unknown, token: string) => {
    const tokenVal = token.replace(/"/g, "");
    const response = await api.put(`/courses/${id}`, courseData, {
      headers: { Authorization: `Bearer ${tokenVal}` },
    });
    console.log("response>>>", response);
    return response.data;
  },

  deleteCourse: async (id: string, token: string) => {
    const tokenVal = token.replace(/"/g, "");
    const response = await api.delete(`/courses/${id}`, {
      headers: { Authorization: `Bearer ${tokenVal}` },
    });
    return response.data;
  },
};

export default courseService;
