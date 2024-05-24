import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

import Breadcrumb from '../../../layouts/AdminLayout/Breadcrumb';

const ResetPassword1 = () => {
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
                  <div className="input-group mb-4">
                    <input type="email" className="form-control" placeholder="Email adresi" />
                  </div>
                  <button className="btn btn-primary mb-4">Şifreni Sıfırla</button>
                  <p className="mb-0 text-muted">
                    Bir hesap açmadın mı ?{' '}
                    <NavLink to="/auth/signup-1" className="f-w-400">
                      Kayıt Ol
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
