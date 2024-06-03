import React, { Suspense, Fragment, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Loader from "./components/Loader/Loader";
import AdminLayout from "./layouts/AdminLayout";

const role = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).role : null;

// PrivateRoute component to handle role-based access control
const PrivateRoute = ({ element: Element, allowedRoles, ...rest }) => {
 
  return allowedRoles.includes(role) ? <Element {...rest} /> : <Navigate to="/views/NotFound.js" /> ;
};





export const renderRoutes = (routes = []) => (
  <Suspense fallback={<Loader />}>
    <Routes>
      {routes.map((route, i) => {
        const Guard = route.guard || Fragment;
        const Layout = route.layout || Fragment;
        const Element = route.element;
        const allowedRoles = route.allowedRoles || []; // Add allowedRoles to the route definition

        return (
          <Route
            key={i}
            path={route.path}
            element={
              <Guard>
                <Layout>
                  {route.routes ? renderRoutes(route.routes) : <PrivateRoute element={Element} allowedRoles={allowedRoles} />}
                </Layout>
              </Guard>
            }
          />
        );
      })}
    </Routes>
  </Suspense>
);

const routes = [
  {
    exact: "true",
    path: "/fireabasegiris",
    element: lazy(() => import("./views/auth/Giris/Giris")),
    allowedRoles: ["admin" , "user"], 
  },
  {
    exact: "true",
    path: "/auth/giris",
    element: lazy(() => import("./views/auth/Giris/Giris")),
    allowedRoles: ["admin" , "user"], 
  },
  {
    exact: "true",
    path: "/auth/kayit",
    element: lazy(() => import("./views/auth/Kayit/Kayit")),
    allowedRoles: ["admin" , "user"], 
  },
  {
    exact: "true",
    path: "/auth/sifresifirla",
    element: lazy(() => import("./views/auth/SifreSifirla/SifreSifirla")),
    allowedRoles: ["admin" , "user"], 
  },
  {
    path: "*",
    layout: AdminLayout,
    routes: [
      {
        exact: "true",
        path: "/app/anasayfa/anasayfa",
        element: lazy(() => import("./views/Anasayfa/Anasayfa")),
        allowedRoles: ["admin" , "user"], // Specify allowed roles for this route
      },
      {
        exact: "true",
        path: "/basic/ogretmen",
        element: lazy(() => import("./views/Tablolar/basic/Ogretmen")),
        allowedRoles: ["admin"], // 
      },
      {
        exact: "true",
        path: "/basic/ogrenci",
        element: lazy(() => import("./views/Tablolar/basic/Ogrenci")),
        allowedRoles: ["admin"], // 
      },
      {
        exact: "true",
        path: "/basic/hami",
        element: lazy(() => import("./views/Tablolar/basic/Hami")),
        allowedRoles: ["admin"], // 
      },
      {
        exact: "true",
        path: "/basic/firma",
        element: lazy(() => import("./views/Tablolar/basic/Firma")),
        allowedRoles: ["admin"], // 
      },
      {
        exact: "true",
        path: "/basic/eslesme",
        element: lazy(() => import("./views/Tablolar/basic/Eslesme")),
        allowedRoles: ["admin"], // 
      },
      {
        exact: "true",
        path: "/basic/ziyaret",
        element: lazy(() => import("./views/Tablolar/basic/Ziyaret")),
        allowedRoles: ["admin"], // 
      },
      {
        exact: "true",
        path: "/charts/nvd3",
        element: lazy(() => import("./views/charts/nvd3-chart")),
        allowedRoles: ["admin"], // 
      },
      {
        path: "*",
        exact: "true",
        element: lazy(() => import("./views/NotFound.js")), // 404 Not Found Page
      },
    ],
  },
];

export default routes;
