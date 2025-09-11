import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";
import enrollmentService from "../../services/EnrollmentService";

const Enrolls = () => {
  const authContext = useContext(AuthContext);
  const token = authContext?.token;
  const user = authContext?.user;
  const currentToken = token || localStorage.getItem("token");
  const currentUser = user || JSON.parse(localStorage.getItem("user") || "{}");

  const [courses, setCourses] = useState([]);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        const response = await enrollmentService.getAllEnrollmentsByUserId(
          currentUser._id,
          currentToken ?? ""
        );
        const courseData = response.map(
          (enrollment: { course: [] }) => enrollment.course
        );

        const status = response.map(
          (enrollment: { status: string }) => enrollment.status
        );

        setCourses(response);
        setStatus(status);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred.");
        }
      }
    };

    fetchEnrollments();
  }, []);
  console.log("course>>>>", courses);

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">My Courses</h2>
        {error && (
          <div className="mb-4 text-red-500 bg-red-100 p-2 rounded">
            {error}
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.length === 0 ? (
            <div className="col-span-full text-gray-500">No courses found.</div>
          ) : (
            courses.map((course: any) => (
              <div
                key={course.id}
                className="bg-white shadow rounded-lg p-6 flex flex-col"
              >
                <h3 className="text-lg font-semibold mb-2">
                  {course.course.title}
                </h3>
                <p className="text-gray-700 mb-4">
                  {course.course.description}
                </p>
                <p className="text-gray-700 mb-4">
                  {course.course.duration} hr
                </p>
                <p className="text-gray-700 mb-4">{course.status}</p>
              </div>
            ))
          )}
          {/* <p className="text-gray-500">{status}</p> */}
        </div>
      </div>
    </>
  );
};

export default Enrolls;
