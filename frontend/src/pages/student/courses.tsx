import { BookOpen, Calendar, Clock } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";
import courseService from "../../services/CourseService";

const Courses = () => {
  const authContext = useContext(AuthContext);
  const token = authContext?.token;
  const currentToken = token || localStorage.getItem("token");

  const [courses, setCourses] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
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

    fetchCourses();
  }, []);
  console.log("course>>>>", courses);

  return (
    <>
      <div className="container mx-auto px-4 py-12">
        {/* Heading */}
        <div className="flex items-center gap-3 mb-10">
          <BookOpen className="w-8 h-8 text-indigo-600" />
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
            My Courses
          </h2>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-8 text-red-700 bg-red-100 border border-red-300 p-4 rounded-xl text-sm font-medium">
            {error}
          </div>
        )}

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.length === 0 ? (
            <div className="col-span-full text-center text-gray-500 italic">
              No courses found.
            </div>
          ) : (
            courses.map((course: any) => (
              <div
                key={course.id}
                className="group relative bg-white border border-gray-100 shadow-md rounded-3xl p-6 flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                {/* Gradient accent bar */}
                <div className="absolute top-0 left-0 w-full h-1 rounded-t-3xl bg-gradient-to-r from-indigo-500 to-purple-500" />

                {/* Title */}
                <h3 className="text-xl font-semibold mb-3 text-gray-900 group-hover:text-indigo-600 transition-colors">
                  {course.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 mb-6 line-clamp-4 text-sm leading-relaxed">
                  {course.description}
                </p>

                {/* Info */}
                <div className="mt-auto flex flex-col gap-3 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-indigo-500" />
                    <span>{course.duration} hr</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-emerald-500" />
                    <span>
                      {new Date(course.createdAt).toLocaleDateString(
                        undefined,
                        {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        }
                      )}
                    </span>
                  </div>
                </div>

                {/* Enroll Button */}
                <button className="mt-6 inline-flex items-center justify-center gap-2 py-2 px-4 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition">
                  Enroll
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default Courses;
