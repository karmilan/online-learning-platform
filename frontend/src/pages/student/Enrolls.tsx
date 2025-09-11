import { BookOpen, Calendar, CheckCircle, Clock } from "lucide-react";
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
      <div className="container mx-auto px-4 py-10">
        <h2 className="text-3xl font-bold mb-10 text-gray-900 tracking-tight">
          My Courses
        </h2>

        {error && (
          <div className="mb-6 text-red-600 bg-red-100 border border-red-300 p-3 rounded-xl">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.length === 0 ? (
            <div className="col-span-full text-center text-gray-500 italic">
              No courses found.
            </div>
          ) : (
            courses.map((course: any) => {
              const statusColors: Record<string, string> = {
                Completed: "bg-green-100 text-green-700 border-green-300",
                "In Progress":
                  "bg-yellow-100 text-yellow-700 border-yellow-300",
                Pending: "bg-gray-100 text-gray-600 border-gray-300",
              };

              return (
                <div
                  key={course.id}
                  className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-xl transition duration-300 flex flex-col overflow-hidden"
                >
                  {/* Thumbnail / Header */}
                  <div className="h-24 bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center">
                    <BookOpen className="w-8 h-8 text-white" />
                  </div>

                  {/* Body */}
                  <div className="flex-1 p-6 flex flex-col">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {course.course.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {course.course.description}
                    </p>

                    {/* Info */}
                    <div className="mt-auto space-y-2 text-sm text-gray-600">
                      <p className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-500" />
                        <span>{course.course.duration} hr</span>
                      </p>
                      <p className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        <span>
                          {new Date(course.createdAt).toLocaleDateString()}
                        </span>
                      </p>
                      <p className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span
                          className={`px-2 py-0.5 text-xs font-medium rounded-md border ${
                            statusColors[course.status] ||
                            "bg-green-100 text-gray-600 border-green-300"
                          }`}
                        >
                          {course.status}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </>
  );
};

export default Enrolls;
