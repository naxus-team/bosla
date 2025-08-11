import { AuthLogin as Login } from "./auth/login";

import Home from "./components/Home";
import About from "./components/About";

import Dashboard from "./components/dashboard";


// Errors are handled all in one place
// so we can use a single component for all 404s
import E404 from "./components/404";


const routes = [
  { path: "/login", element: <Login /> },

  { path: "/dashboard", element: <Dashboard /> },

  { path: "/", element: <Home /> },
  { path: "/about", element: <About /> },
  { path: "*", element: <E404 /> },
];

export default routes;
