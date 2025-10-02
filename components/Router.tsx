


import { Text, View } from 'react-native';
import { Main } from './Main';
import ProtectedRoute from "./pages/ProtectedRoute";


import { AuthLogin } from './authentication/Login';
import { Dashboard } from './pages/Dashboard';


const routes = [
  {
    path: "/", element: (
      <ProtectedRoute>
        <Main />
      </ProtectedRoute>
    )
  },
  { path: "/dashboard", element: <Dashboard /> },
  { path: "/login", element: <AuthLogin /> },

  { path: "*", element: <Text>404 Not Found</Text> },
];


export default routes;