import { Home } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  if (pathnames.length === 0) return null;

  return (
    <nav className="w-full px-4 py-2 mt-6 mb-2">
      <ol className="flex flex-wrap items-center text-sm sm:text-base text-gray-600">
        <li className="flex items-center">
          <Link
            to="/"
            className="text-blue-500 hover:text-blue-700 transition-colors flex items-center gap-1"
          >
            <Home className="w-4 h-4" />
            <span className="hidden sm:inline">Home</span>
          </Link>
        </li>
        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;
          const displayName = name
            .replace(/-/g, " ")
            .replace(/\b\w/g, (c) => c.toUpperCase());

          return (
            <li key={name} className="flex items-center">
              <span className="mx-2 text-gray-400">/</span>
              {isLast ? (
                <span className="text-gray-800 font-semibold">
                  {displayName}
                </span>
              ) : (
                <Link
                  to={routeTo}
                  className="text-blue-500 hover:text-blue-700 transition-colors"
                >
                  {displayName}
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
