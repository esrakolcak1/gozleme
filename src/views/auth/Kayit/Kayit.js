import React, { useState, useCallback } from "react";
import { Card, Row, Col, Form } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Breadcrumb from "../../../layouts/AdminLayout/Breadcrumb";
import { auth, firestore, db } from "../../../firebase/firebaseConfig"; // Firebase yapılandırma dosyasını içe aktarın
import { collection, addDoc, doc, setDoc } from "firebase/firestore";

const Kayit = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user"); // Varsayılan rol olarak 'user'

  const roles = [
    {
      label: "Admin",
      value: "admin",
    },
    {
      label: "Kullanıcı",
      value: "user",
    },
  ];

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault(); // sayfa yenilenmesini önleme

      if (!email || !password) {
        return;
      }
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          // Kullanıcı veritabanına rol ekleyin

          postDataFirestore(user);
          alert("Kayıt oldunuz");
        })
        .catch((e) => {
          alert(e.message);
        });
    },
    [email, password, role]
  );

  const postDataFirestore = async (user) => {
    await addDoc(collection(firestore, `rolekontrol`), {
      uid: user?.uid,
      email: email,
      role: role,
    });
  };

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
            <Row className="align-items-center">
              <Col>
                <Card.Body className="text-center">
                  <div className="mb-4">
                    <i className="feather icon-user-plus auth-icon" />
                  </div>
                  <h3 className="mb-4">Kayıt Ol</h3>
                  <form onSubmit={handleSubmit}>
                    <div className="input-group mb-3">
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Email adresi"
                        value={email}
                        onChange={(e) => setEmail(e.currentTarget.value)}
                      />
                    </div>
                    <div className="input-group mb-4">
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Şifre"
                        value={password}
                        onChange={(e) => setPassword(e.currentTarget.value)}
                      />
                    </div>
                    <div className="input-group mb-4">
                      <Form.Control
                        as="select"
                        name="roles"
                        value={role}
                        onChange={(e) => {
                          setRole(e.target.value);
                        }}
                      >
                        <option value="">Rol seçiniz</option>
                        {roles &&
                          Object.keys(roles).map((key) => (
                            <option key={key} value={key.value}>
                              {roles[key].value}
                            </option>
                          ))}
                      </Form.Control>
                    </div>
                    <button type="submit" className="btn btn-primary mb-4">
                      Kayıt Ol
                    </button>
                  </form>
                  <p className="mb-2">
                    Zaten bir hesabın var mı?{" "}
                    <NavLink to="/auth/giris" className="f-w-400">
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

export default Kayit;
