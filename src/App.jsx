import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomeRoute } from "./routes/HomeRoute";

const App = () => {
  const router = createBrowserRouter([HomeRoute]);
  return <RouterProvider router={router} />;
};

export default App;
