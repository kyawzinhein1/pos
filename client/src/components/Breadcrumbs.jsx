import { Home } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  // Hide breadcrumbs on the home page
  if (pathnames.length === 0) return null;

  return (
    <nav className="text-gray-600 text-sm mt-3">
      <ol className="flex flex-wrap items-center space-x-2 text-sm sm:text-base px-4 py-2">
        <li>
          <Link
            to="/"
            className="text-blue-500 hover:text-blue-700 transition-colors duration-200"
          >
            <Home className="w-4 h-4" />
          </Link>
        </li>
        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;
          return (
            <li key={name} className="flex items-center">
              <span className="mx-2 text-gray-400">/</span>
              {isLast ? (
                <span className="text-gray-500 font-medium capitalize">
                  {name.replace("-", " ")}
                </span>
              ) : (
                <Link
                  to={routeTo}
                  className="text-blue-500 hover:text-blue-700 transition-colors duration-200 capitalize"
                >
                  {name.replace("-", " ")}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
