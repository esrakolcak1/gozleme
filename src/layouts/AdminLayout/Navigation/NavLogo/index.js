import { Link } from "react-router-dom";
import React, { useContext } from "react";
import { ConfigContext } from "../../../../contexts/ConfigContext";

import * as actionType from "../../../../store/actions";
import BusinesManPng from "../../../../../src/businessman.png";

const NavLogo = () => {
  const configContext = useContext(ConfigContext);
  const { collapseMenu } = configContext.state;
  const { dispatch } = configContext;

  let toggleClass = ["mobile-menu"];
  if (collapseMenu) {
    toggleClass = [...toggleClass, "on"];
  }

  return (
    <React.Fragment>
      <div className="navbar-brand header-logo">
        <Link to="#" className="b-brand">
          <img
            src={BusinesManPng}
            alt="Logo"
            style={{ width: "20%", height: "100%", objectFit: "cover" }}
          />

          <span
            className="b-title"
            style={{
              fontSize: "25px",
              fontWeight: "bold",
              fontFamily: "inter",
            }}
          >
            GÖZleme
          </span>
        </Link>
        <Link
          to="#"
          className={toggleClass.join(" ")}
          id="mobile-collapse"
          // onClick={() => dispatch({ type: actionType.COLLAPSE_MENU })}
        >
          <span />
        </Link>
      </div>
    </React.Fragment>
  );
};

export default NavLogo;
