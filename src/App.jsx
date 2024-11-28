import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import Layout from "./Components/Layout/Layout";
import Login from "./pages/Login/Login";
import Notfound from "./pages/Notfound/Notfound";
import UserLoginProvider from "./Context/UserLogin";
import { UserTable } from "./Components/tables/UserTable";
import { ProductsTable } from "./Components/tables/ProductsTable";
import Home from "./pages/home/Home";
import Dashboard from "./pages/dashboard/Dashboard";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

let query = new QueryClient();

let x = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
        children: [
          {
            path: "usertable",
            element: (
              <ProtectedRoute>
                <UserTable />
              </ProtectedRoute>
            ),
          },
          {
            path: "home",
            element: (
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            ),
          },
          {
            path: "productstable",
            element: (
              <ProtectedRoute>
                <ProductsTable />
              </ProtectedRoute>
            ),
          },
        ],
      },
      {
        path: "usertable",
        element: (
          <ProtectedRoute>
            <UserTable />
          </ProtectedRoute>
        ),
      },
      { path: "login", element: <Login /> },
      { path: "*", element: <Notfound /> },
    ],
  },
]);

function App() {
  return (
    <>
      <QueryClientProvider client={query}>
        <UserLoginProvider>
          <RouterProvider router={x}></RouterProvider>
          <ReactQueryDevtools />
        </UserLoginProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
