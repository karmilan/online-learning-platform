import { useContext, useState } from "react";
// import { Link, useLocation } from 'react-router-dom';
import { BookOpen, Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router";
import { DesktopNavigations } from "../components/Navigations";
import AuthContext from "../context/AuthContext";

const NavBar = () => {
  const authContext = useContext(AuthContext);
  const token = authContext?.token;
  const currentToken = token || localStorage.getItem("token");

  const logout = authContext?.logout;

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // const isActive = (path: string) => location.pathname === path;
  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg group-hover:shadow-lg transition-all duration-300">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Online Learning Platform
            </span>
          </Link>

          <DesktopNavigations />

          {/* Desktop nav buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {!currentToken ? (
              <Link
                to="/login"
                className="px-4 py-2 text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium"
              >
                Sign In
              </Link>
            ) : (
              <button
                onClick={logout}
                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg transition-colors duration-200 font-medium"
              >
                Log Out
              </button>
            )}
            ``
            {/* {!currentToken && ( */}
            <Link
              to="/register"
              className={`${
                !currentToken ? "hidden" : "block"
              } px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 font-medium`}
            >
              Get Started
            </Link>
            {/* )} */}
          </div>

          {/* Mobile menu view button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 transition-colors duration-200"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white/95 backdrop-blur-sm rounded-lg mt-2 border border-gray-200/50 shadow-lg">
              <div className="border-t border-gray-200 pt-4 mt-4">
                {!currentToken ? (
                  <Link
                    to="/login"
                    className="block px-3 py-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors duration-200 font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                ) : (
                  <button className="block px-3 py-2 rounded-md bg-gradient-to-r from-blue-600 to-purple-600 text-white transition-colors duration-200 font-medium">
                    Log out
                  </button>
                )}
                {!currentToken && (
                  <Link
                    to="/register"
                    className="block px-3 py-2 mt-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium text-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Get Started
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
