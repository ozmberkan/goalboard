import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomeRoute } from "./routes/HomeRoute";
import { AuthRoute } from "./routes/AuthRoute";

const App = () => {
  const router = createBrowserRouter([HomeRoute, AuthRoute]);
  return <RouterProvider router={router} />;
};

export default App;
