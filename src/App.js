import React, { useEffect } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import routes, { renderRoutes } from "./routes";
import businessmanIcon from "./businessman.png";

const App = () => {
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "icon";
    link.href = businessmanIcon;
    link.type = "image/png";
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  const role = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")).role
    : null;

  return (
    <React.Fragment>
      <BrowserRouter basename={process.env.REACT_APP_BASE_NAME}>
        {renderRoutes(routes)}
      </BrowserRouter>
    </React.Fragment>
  );
};

export default App;
