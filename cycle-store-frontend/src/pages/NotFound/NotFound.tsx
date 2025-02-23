import { useNavigate } from "react-router-dom";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-md p-6 text-center rounded-lg border border-gray-500 shadow-lg bg-white">
        <span className="text-6xl text-red-500">🚫</span>
        <h1 className="text-3xl font-semibold text-gray-800 mt-4">
          404 - Page Not Found
        </h1>
        <p className="mt-2 text-lg font-medium text-gray-600">
          The page you are looking for does not exist.
        </p>
        <button
          onClick={() => navigate("/")}
          className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
        >
          Go to Homepage
        </button>
      </div>
    </div>
  );
}
