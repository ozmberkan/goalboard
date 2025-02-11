import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomeRoute } from "./routes/HomeRoute";
import { AuthRoute } from "./routes/AuthRoute";
import { ProjectRoute } from "./routes/ProjectRoute";
import { PricingRoute } from "./routes/PricingRoute";
import { AdminRoute } from "./routes/AdminRoute";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import "react-tooltip/dist/react-tooltip.css";

const App = () => {
  const { theme } = useSelector((state) => state.theme);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const router = createBrowserRouter([
    HomeRoute,
    AuthRoute,
    PricingRoute,
    ProjectRoute,
    AdminRoute,
  ]);
  return <RouterProvider router={router} />;
};

export default App;
