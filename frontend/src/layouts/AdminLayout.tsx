import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import AdminSideBar from "../components/AdminSideBar";
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
        <AdminSideBar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        <div className="flex-1 flex flex-col">
          {/* Navbar */}
          <header className="flex items-center justify-end bg-white shadow px-4 py-3">
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
            <div>
              <button
                className="ml-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                onClick={logout}
              >
                Logout
              </button>
            </div>
          </header>
          {children}
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
