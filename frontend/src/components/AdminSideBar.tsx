import { Link } from "react-router";

type AdminPSideBarProps = {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
};
const AdminSideBar = ({ sidebarOpen, setSidebarOpen }: AdminPSideBarProps) => {
  return (
    <>
      {/* Sidebar for desktop */}
      <aside className="hidden md:flex flex-col w-45 bg-white/80 backdrop-blur-md border-r border-gray-200/50 p-4">
        <div className="mb-8 text-xl font-bold">Admin Panel</div>
        <nav className="flex flex-col gap-4">
          <Link
            to="/admin/enrolls"
            className="hover:bg-gray-300 rounded px-3 py-2"
          >
            Enrollments
          </Link>

          <Link
            to="/admin/courses"
            className="hover:bg-gray-300 rounded px-3 py-2"
          >
            Courses
          </Link>

          <Link
            to="/admin/users"
            className="hover:bg-gray-300 rounded px-3 py-2"
          >
            Users
          </Link>
        </nav>
      </aside>

      {/* Sidebar for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-50 bg-gray-300 bg-opacity-50 md:hidden"
          onClick={() => setSidebarOpen(false)}
        >
          <aside
            className="fixed left-0 top-0 h-full w-64 bg-white/80 text-white p-4 z-50"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-8 text-2xl text-black font-bold flex justify-between items-center">
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
              <Link
                to="/admin/enrolls"
                className="hover:bg-gray-300 text-black rounded px-3"
              >
                Enrollments
              </Link>

              <Link
                to="/admin/courses"
                className="hover:bg-gray-300 text-black rounded px-3 py-2"
              >
                Courses
              </Link>

              <Link
                to="/admin/users"
                className="hover:bg-gray-300 text-black rounded px-3 py-2"
              >
                Users
              </Link>
            </nav>
          </aside>
        </div>
      )}
    </>
  );
};

export default AdminSideBar;
