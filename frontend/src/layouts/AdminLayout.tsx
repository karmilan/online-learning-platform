import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import AuthContext from "../context/AuthContext";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  const logout = () => {
    auth?.logout();
    navigate("/");
    window.location.reload();
  };

  return (
    <>
      {/* <NavBar /> */}
      <div className="flex min-h-screen">
        {/* Sidebar for desktop */}
        <aside className="hidden md:flex flex-col w-64 bg-gray-800 text-white p-4">
          <div className="mb-8 text-2xl font-bold">Admin Panel</div>
          <nav className="flex flex-col gap-4">
            <a href="#" className="hover:bg-gray-700 rounded px-3 py-2">
              Dashboard
            </a>
            <a href="#" className="hover:bg-gray-700 rounded px-3 py-2">
              Users
            </a>
            <a href="#" className="hover:bg-gray-700 rounded px-3 py-2">
              Courses
            </a>
            <a href="#" className="hover:bg-gray-700 rounded px-3 py-2">
              Settings
            </a>
          </nav>
        </aside>

        {/* Sidebar for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-50 bg-black bg-opacity-50 md:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <aside
              className="fixed left-0 top-0 h-full w-64 bg-gray-800 text-white p-4 z-50"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-8 text-2xl font-bold flex justify-between items-center">
                Admin Panel
                <button
                  className="text-white text-xl"
                  onClick={() => setSidebarOpen(false)}
                  aria-label="Close sidebar"
                >
                  &times;
                </button>
              </div>
              <nav className="flex flex-col gap-4">
                <a href="#" className="hover:bg-gray-700 rounded px-3 py-2">
                  Dashboard
                </a>
                <a href="#" className="hover:bg-gray-700 rounded px-3 py-2">
                  Users
                </a>
                <a href="#" className="hover:bg-gray-700 rounded px-3 py-2">
                  Courses
                </a>
                <a href="#" className="hover:bg-gray-700 rounded px-3 py-2">
                  Settings
                </a>
              </nav>
            </aside>
          </div>
        )}

        <div className="flex-1 flex flex-col">
          {/* Navbar */}
          <header className="flex items-center justify-between bg-white shadow px-4 py-3">
            <div className="md:hidden">
              {/* Mobile sidebar toggle button */}
              <button
                type="button"
                className="text-gray-800 focus:outline-none"
                aria-label="Open sidebar"
                onClick={() => setSidebarOpen(true)}
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
            <div className="text-xl font-semibold">Admin Dashboard</div>
            <div>
              <button className="text-gray-600" onClick={logout}>
                Log Out
              </button>
            </div>
          </header>
          {/* Main content will be rendered below */}
          {children}
        </div>
      </div>

      {/* <div>{children}</div> */}
    </>
  );
};

export default AdminLayout;
