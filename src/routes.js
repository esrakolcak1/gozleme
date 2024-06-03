import React, { Suspense, Fragment, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Loader from "./components/Loader/Loader";
import AdminLayout from "./layouts/AdminLayout";

export const renderRoutes = (routes = []) => (
  <Suspense fallback={<Loader />}>
    <Routes>
      {routes.map((route, i) => {
        const Guard = route.guard || Fragment;
        const Layout = route.layout || Fragment;
        const Element = route.element;

        return (
          <Route
            key={i}
            path={route.path}
            element={
              <Guard>
                <Layout>
                  {route.routes ? (
                    renderRoutes(route.routes)
                  ) : (
                    <Element props={true} />
                  )}
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
  },
  {
    exact: "true",
    path: "/auth/giris",
    element: lazy(() => import("./views/auth/Giris/Giris")),
  },
  {
    exact: "true",
    path: "/auth/kayit",
    element: lazy(() => import("./views/auth/Kayit/Kayit")),
  },
  {
    exact: "true",
    path: "/auth/sifresifirla",
    element: lazy(() => import("./views/auth/SifreSifirla/SifreSifirla")),
  },
  {
    path: "*",
    layout: AdminLayout,
    routes: [
      {
        exact: "true",
        path: "/app/anasayfa/anasayfa",
        element: lazy(() => import("./views/Anasayfa/Anasayfa")),
      },
      {
        exact: "true",
        path: "/basic/ogretmen",
        element: lazy(() => import("./views/Tablolar/basic/Ogretmen")),
      },

      {
        exact: "true",
        path: "/basic/ogrenci",
        element: lazy(() => import("./views/Tablolar/basic/Ogrenci")),
      },

      {
        exact: "true",
        path: "/basic/hami",
        element: lazy(() => import("./views/Tablolar/basic/Hami")),
      },
      {
        exact: "true",
        path: "/basic/firma",
        element: lazy(() => import("./views/Tablolar/basic/Firma")),
      },
      {
        exact: "true",
        path: "/basic/eslesme",
        element: lazy(() => import("./views/Tablolar/basic/Eslesme")),
      },
      {
        exact: "true",
        path: "/basic/ziyaret",
        element: lazy(() => import("./views/Tablolar/basic/Ziyaret")),
      },

      {
        exact: "true",
        path: "/charts/nvd3",
        element: lazy(() => import("./views/charts/nvd3-chart")),
      },

      {
        path: "*",
        exact: "true",
      },
    ],
  },
];

export default routes;
