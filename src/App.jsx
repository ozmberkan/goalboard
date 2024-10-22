import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomeRoute } from "./routes/HomeRoute";
import { AuthRoute } from "./routes/AuthRoute";
import { ProjectRoute } from "./routes/ProjectRoute";
import { PricingRoute } from "./routes/PricingRoute";

const App = () => {
  const router = createBrowserRouter([
    HomeRoute,
    AuthRoute,
    PricingRoute,
    ProjectRoute,
  ]);
  return <RouterProvider router={router} />;
};

export default App;
