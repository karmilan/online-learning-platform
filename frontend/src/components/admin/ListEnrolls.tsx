import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";
import enrollmentService from "../../services/EnrollmentService";

const ListEnrolls = () => {
  const authContext = useContext(AuthContext);
  const token = authContext?.token;
  const currentToken = token || localStorage.getItem("token");

  const [enrolls, setEnrolls] = useState([]);
  const [error, setError] = useState("");

  const fetchEnrollments = async () => {
    try {
      const response = await enrollmentService.getAllEnrollments(
        currentToken ?? ""
      );

      setEnrolls(response);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred.");
      }
    }
  };

  useEffect(() => {
    fetchEnrollments();
  }, []);

  console.log("enrolls>>>>", enrolls);

  return (
    <>
      <div className="min-h-screen bg-gray-50 p-6 mt-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Enrollments
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {enrolls.map((enrollment) => (
            <div
              key={enrollment._id}
              className="bg-white shadow-md rounded-lg p-5 border border-gray-100 hover:shadow-lg transition"
            >
              {/* Course Info */}
              <h2 className="text-lg font-semibold text-indigo-600 mb-2">
                {enrollment.course.title}
              </h2>
              <p className="text-gray-600 text-sm mb-4">
                {enrollment.course.description}
              </p>

              {/* Student Info */}
              <div className="mb-3">
                <p className="text-gray-800 text-sm font-medium">
                  👤 {enrollment.user.name}
                </p>
                <p className="text-xs text-gray-500">{enrollment.user.email}</p>
                <p className="text-xs text-gray-500">{enrollment.user.phone}</p>
              </div>

              {/* Status */}
              <div className="flex items-center justify-between mt-4">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium 
                  ${
                    enrollment.status === "enrolled"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {enrollment.status}
                </span>
                <span className="text-xs text-gray-400">
                  {new Date(enrollment.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ListEnrolls;
