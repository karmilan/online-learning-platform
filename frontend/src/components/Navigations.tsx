import { useContext } from "react";
import { Link } from "react-router";
import AuthContext from "../context/AuthContext";

type MobileNavigationsProps = {
  setIsMenuOpen: (isOpen: boolean) => void;
};

export const DesktopNavigations = () => {
  const authContext = useContext(AuthContext);
  const token = authContext?.token;
  const currentToken = token || localStorage.getItem("token");
  return (
    <>
      <div className="hidden md:flex items-center space-x-8">
        {currentToken && (
          <>
            <Link
              to="/courses"
              className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium"
            >
              Courses
            </Link>
            <Link
              to="/"
              className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium"
            >
              Enrolls
            </Link>
          </>
        )}
      </div>
    </>
  );
};

export const MobileNavigations: React.FC<MobileNavigationsProps> = ({
  setIsMenuOpen,
}) => {
  const authContext = useContext(AuthContext);
  const token = authContext?.token;
  const currentToken = token || localStorage.getItem("token");
  return (
    <>
      <div className="md:hidden">
        <div className="px-2 pt-2 pb-3 space-y-1 bg-white/95 backdrop-blur-sm rounded-lg mt-2 border border-gray-200/50 shadow-lg">
          {currentToken && (
            <>
              <Link
                to="/courses"
                className="block px-3 py-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Courses
              </Link>

              <Link
                to="/"
                className="block px-3 py-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Enrolls
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
};
