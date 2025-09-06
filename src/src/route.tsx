import { AuthLogin as Login } from "./auth/Login";

import Home from "./pages/Home";
import About from "./pages/About";

import Application from "./pages/App";
import ProtectedRoute from "./pages/ProtectedRoute";




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
