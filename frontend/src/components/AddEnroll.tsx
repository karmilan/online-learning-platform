import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import courseService from "../services/CourseService";
import enrollmentService from "../services/EnrollmentService";
import userService from "../services/UserService";

const AddEnroll = () => {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [success, setSuccess] = useState("");

  const authContext = useContext(AuthContext);
  const token = authContext?.token;
  const currentToken = token || localStorage.getItem("token");

  const fetchCourses = async () => {
    try {
      console.log("token>>>>", currentToken);
      const response = await courseService.getAllCourses(currentToken ?? "");

      setCourses(response);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred.");
      }
    }
  };

  const fetchUsers = async () => {
    try {
      console.log("token>>>>", currentToken);
      const response = await userService.getAllUsers(currentToken ?? "");

      setUsers(response);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred.");
      }
    }
  };

  useEffect(() => {
    fetchCourses();
    fetchUsers();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("selectedUser, selectedCourse>>", selectedUser, selectedCourse);

    const newEnrollment = { userId: selectedUser, courseId: selectedCourse };

    try {
      await enrollmentService.addEnrollment(newEnrollment, currentToken ?? "");
      setSuccess("Enrollment successful!");
    } catch (err) {
      setSuccess("");
      setError(err instanceof Error ? err.message : "Failed to enroll.");
    }
  };

  return (
    <>
      <div className="max-w-5xl mx-auto p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Enroll User to Course
        </h2>

        {error && (
          <div className="mb-4 rounded-md bg-red-50 border border-red-200 p-3 text-red-600 text-sm">
            {error}
          </div>
        )}

        <form
          className="flex flex-col md:flex-row items-center gap-4"
          onSubmit={handleSubmit}
        >
          {/* User Select */}
          <div className="flex-1">
            <select
              className="w-full rounded-md border-gray-300 bg-gray-50 px-4 py-2 text-gray-700 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
              required
            >
              <option value="">Select User</option>
              {users.map((user: any) => (
                <option key={user._id} value={user._id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>

          {/* Course Select */}
          <div className="flex-1">
            <select
              className="w-full rounded-md border-gray-300 bg-gray-50 px-4 py-2 text-gray-700 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              required
            >
              <option value="">Select Course</option>
              {courses.map((course: any) => (
                <option key={course._id} value={course._id}>
                  {course.title}
                </option>
              ))}
            </select>
          </div>

          {/* Enroll Button */}
          <div className="flex-shrink-0">
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-md bg-blue-600 px-6 py-2 text-white font-medium shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
            >
              Enroll
            </button>
          </div>
        </form>

        {success && (
          <div className="mt-4 rounded-md bg-green-50 border border-green-200 p-3 text-green-700 text-sm">
            {success}
          </div>
        )}
      </div>
    </>
  );
};

export default AddEnroll;
