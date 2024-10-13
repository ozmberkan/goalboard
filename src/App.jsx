import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomeRoutes from "./routes/Home/HomeRoutes";

const App = () => {
  const router = createBrowserRouter([HomeRoutes]);

  return <RouterProvider router={router} />;
};

export default App;
