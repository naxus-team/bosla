import { AuthLogin as Login } from "./auth/Login";

import Home from "./pages/Home";
import About from "./pages/About";

import Application from "./pages/Application";
import ProtectedRoute from "./pages/ProtectedRoute";



// Errors are handled all in one place
// so we can use a single component for all 404s
import E404 from "./pages/404";


const routes = [
  { path: "/login", element: <Login /> },
  {
    path: "/app",
    element: (
      <ProtectedRoute>
        <Application />
      </ProtectedRoute>
    )
  },
  { path: "*", element: <E404 /> },
];

export default routes;
