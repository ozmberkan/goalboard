import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomeRoute } from "./routes/HomeRoute";
import { AuthRoute } from "./routes/AuthRoute";
import { PricingRoute } from "./routes/PricingRoute";

const App = () => {
  const router = createBrowserRouter([HomeRoute, AuthRoute, PricingRoute]);
  return <RouterProvider router={router} />;
};

export default App;
