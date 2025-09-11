import { Route, Routes } from "react-router";
import AdminLayout from "./layouts/AdminLayout";
import PublicLayout from "./layouts/PublicLayout ";
import AdminCourses from "./pages/admin/AdminCourses";
import AdminEnrolls from "./pages/admin/AdminEnrolls";
import AdminUsers from "./pages/admin/AdminUsers";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Courses from "./pages/student/Courses";
import Enrolls from "./pages/student/Enrolls";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Routes>
        <Route
          path="/"
          element={
            <PublicLayout>
              <HomePage />
            </PublicLayout>
          }
        />
        <Route
          path="/login"
          element={
            <PublicLayout>
              <Login />
            </PublicLayout>
          }
        />
        <Route
          path="/register"
          element={
            <PublicLayout>
              <Register />
            </PublicLayout>
          }
        />
        <Route
          path="/courses"
          element={
            <PublicLayout>
              <Courses />
            </PublicLayout>
          }
        />

        <Route
          path="/enrolls"
          element={
            <PublicLayout>
              <Enrolls />
            </PublicLayout>
          }
        />

        <Route
          path="/admin/courses"
          element={
            <AdminLayout>
              <AdminCourses />
            </AdminLayout>
          }
        />

        <Route
          path="/admin/enrolls"
          element={
            <AdminLayout>
              <AdminEnrolls />
            </AdminLayout>
          }
        />

        <Route
          path="/admin/users"
          element={
            <AdminLayout>
              <AdminUsers />
            </AdminLayout>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
