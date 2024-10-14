import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomeRoutes from "./routes/Home/HomeRoutes";
import AuthRoutes from "./routes/Home/AuthRoutes";

const App = () => {
  const router = createBrowserRouter([HomeRoutes, AuthRoutes]);

  return <RouterProvider router={router} />;
};

export default App;
