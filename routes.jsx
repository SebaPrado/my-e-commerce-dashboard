import { createBrowserRouter } from "react-router-dom";

import MainLayout from "./src/components/views/MainLayout";
import Dashboard from "./src/components/views/Dashboard";
import Products from "./src/components/views/Products";
import ProductUpdate from "./src/components/views/ProductUpdate";
import ProductCreation from "./src/components/views/ProductCreation";
import Categories from "./src/components/views/Categories";
import CategoryUpdate from "./src/components/views/CategoryUpdate";
import CategoryCreation from "./src/components/views/CategoryCreation";
import Artists from "./src/components/views/Artists";
import ArtistUpdate from "./src/components/views/ArtistUpdate";
import ArtistCreation from "./src/components/views/ArtistCreation";
import Orders from "./src/components/views/Orders";
import Users from "./src/components/views/Users";
import UserUpdate from "./src/components/views/UserUpdate";
import UserCreation from "./src/components/views/UserCreation";
import Admins from "./src/components/views/Admins";
import AdminUpdate from "./src/components/views/AdminUpdate";
import AdminCreation from "./src/components/views/AdminCreation";
import NotFound from "./src/components/views/NotFound";
import Login from "./src/components/views/Login";
import OrderUpdate from "./src/components/views/OrderUpdate";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <NotFound />,
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "products/:productId",
        element: <ProductUpdate />,
      },
      {
        path: "/products/create",
        element: <ProductCreation />,
      },
      {
        path: "categories",
        element: <Categories />,
      },
      {
        path: "categories/:categoryId",
        element: <CategoryUpdate />,
      },
      {
        path: "/categories/create",
        element: <CategoryCreation />,
      },
      {
        path: "artists",
        element: <Artists />,
      },
      {
        path: "artists/:artistId",
        element: <ArtistUpdate />,
      },
      {
        path: "/artists/create",
        element: <ArtistCreation />,
      },
      {
        path: "orders",
        element: <Orders />,
      },
      {
        path: "orders/:orderId",
        element: <OrderUpdate />,
      },
      {
        path: "users",
        element: <Users />,
      },
      {
        path: "/users/:userId",
        element: <UserUpdate />,
      },
      {
        path: "/users/create",
        element: <UserCreation />,
      },
      {
        path: "admins",
        element: <Admins />,
      },
      {
        path: "admins/:adminId",
        element: <AdminUpdate />,
      },
      {
        path: "/admins/create",
        element: <AdminCreation />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
  {
    path: "login",
    element: <Login />,
  },
]);

export default router;
