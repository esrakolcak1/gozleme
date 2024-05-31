import React, { useState, useCallback } from "react";
import { Card, Row, Col } from "react-bootstrap";
import { NavLink } from "react-router-dom";

import Breadcrumb from "../../../layouts/AdminLayout/Breadcrumb";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../../firebase/firebaseConfig";

const ResetPassword1 = () => {
  const [email, setEmail] = useState("");
  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault(); // sayfa yenilenmesini önleme
      if (!email) {
        return;
      }
      sendPasswordResetEmail(auth, email)
        .then(() => {
          alert("Şifreniz sıfırlanmıştır.Emailinize şifreniz gelmiştir.");
        })
        .catch((e) => {
          console.log("e");
        });
    },
    [email]
  );
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
          <Card className="borderless">
            <Row className="align-items-center text-center">
              <Col>
                <Card.Body className="card-body">
                  <div className="mb-4">
                    <i className="feather icon-mail auth-icon" />
                  </div>
                  <h3 className="mb-3 f-w-400">Şifreni Sıfırla</h3>
                  <form onSubmit={handleSubmit}>
                    <div className="input-group mb-4">
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Email adresi"
                        value={email}
                        onChange={(e) => setEmail(e.currentTarget.value)}
                      />
                    </div>
                    <button className="btn btn-primary mb-4">
                      Şifreni Sıfırla
                    </button>
                  </form>
                  <p className="mb-0 text-muted">
                    Tekrardan{" "}
                    <NavLink to="/auth/signin-1" className="f-w-400">
                      Giriş Yap
                    </NavLink>
                  </p>
                </Card.Body>
              </Col>
            </Row>
          </Card>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ResetPassword1;
