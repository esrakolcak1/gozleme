import React from "react";
import { Card } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import Breadcrumb from "../../../layouts/AdminLayout/Breadcrumb";
import FirebaseLogin from "./FirebaseLogin"; // FirebaseLogin bileşenini içe aktarın

const Signin1 = () => {
  return (
    <React.Fragment>
      <Breadcrumb />
      <div className="auth-wrapper">
        <div className="auth-content">
          <div className="auth-bg">
            <span className="r" />
            <span className="r s" />
            <span className="r s" />
            <span className="r" />
          </div>
          <Card className="borderless text-center">
            <Card.Body>
              <div className="mb-4">
                <i className="feather icon-unlock auth-icon" />
              </div>
              <FirebaseLogin />
              <p className="mb-2 text-muted">
                Şifremi unuttum{" "}
                <NavLink to="/auth/reset-password-1" className="f-w-400">
                  Reset
                </NavLink>
              </p>
              <p className="mb-0 text-muted">
                Bir hesabın yok mu ?{" "}
                <NavLink to="/auth/signup-1" className="f-w-400">
                  Kayıt Ol
                </NavLink>
              </p>
            </Card.Body>
          </Card>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Signin1;
