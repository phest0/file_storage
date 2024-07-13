import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignIn from "./pages/auth/SignIn";
import HomePage from "./pages/home/HomePage";

import "./App.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <SignIn />,
  },
  {
    path: "login",
    element: <SignIn />,
  },
  {
    path: "home",
    element: <HomePage />,
  },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
