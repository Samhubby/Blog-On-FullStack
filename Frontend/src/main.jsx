import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store/store.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  AddBlog,
  AllBlogs,
  BlogPage,
  EditBlog,
  LoginPage,
  SignupPage,
  MyProfile,
  HomePage,
} from "./pages/index.js";
import { allBlogsLoader } from "./pages/AllBlogs.jsx";
import { AuthLayout } from "./components/index.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/login",
        element: (
          <AuthLayout authentication={false}>
            <LoginPage />
          </AuthLayout>
        ),
      },
      {
        path: "/signup",
        element: (
          <AuthLayout authentication={false}>
            <SignupPage />
          </AuthLayout>
        ),
      },
      {
        path: "/add-blogs",
        element: (
          <AuthLayout authentication={true}>
            <AddBlog />
          </AuthLayout>
        ),
      },
      {
        path: "/all-blogs",
        element: <AllBlogs />,
        loader: allBlogsLoader,
      },
      {
        path: "/blog/:id",
        element: <BlogPage />,
      },
      {
        path: "/edit-blog/:id",
        element: (
          <AuthLayout authentication={true}>
            <EditBlog />
          </AuthLayout>
        ),
      },
      {
        path: "/profile",
        element: (
          <AuthLayout authentication={true}>
            <MyProfile />
          </AuthLayout>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
