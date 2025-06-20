import { AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-white px-4">
      <div className="text-center">
        <AlertTriangle className="w-16 h-16 text-red-500 mb-4 mx-auto animate-pulse" />
        <h1 className="text-3xl sm:text-4xl font-bold text-red-600 mb-2">
          Oops! Something went wrong.
        </h1>
        <p className="text-gray-600 mb-6">
          Please try again later or return to the home page.
        </p>
        <Link
          to="/"
          className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition duration-300"
        >
          Go to Home
        </Link>
      </div>
    </section>
  );
};

export default Error;
