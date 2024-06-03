import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import { Row, Col, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Formik } from "formik";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db, firestore } from "../../../firebase/firebaseConfig"; // Firebase yapılandırma dosyasını içe aktarın
import { addDoc, collection, getDocs } from "firebase/firestore";

const FirebaseLogin = ({ className, ...rest }) => {
  const navigate = useNavigate();

  const [students, setStudents] = useState([]);

  const getUserForRole = async () => {
    const querySnapshot = await getDocs(collection(firestore, "rolekontrol"));
    const newData = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setStudents(newData);
  };

  const getUserRoleControl = (user) => {

   
    let adminControl = students.find((item) => item.email == user ?  true : false); 

    if (adminControl) {
      localStorage.setItem("user", JSON.stringify({ email: user, role: "admin" }));
    } else {
      localStorage.setItem("user", JSON.stringify({ email: user, role: "user" }));
    }

    navigate("/app/anasayfa/anasayfa");
    
  };

  useEffect(() => {
    getUserForRole();
  }, []);

  return (
    <React.Fragment>
      <Formik
        initialValues={{
          email: "",
          password: "",
          submit: null,
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email("Geçerli bir e-posta adresi giriniz.")
            .max(255)
            .required("E-posta adresinizi giriniz."),
          password: Yup.string().max(255).required("Şifrenizi giriniz."),
        })}
        onSubmit={async (values, { setErrors, setSubmitting }) => {
          try {
            const userCredential = await signInWithEmailAndPassword(
              auth,
              values.email,
              values.password
            );
            const user = userCredential.user;

            if (user) {
              await addDoc(collection(firestore, `user`), {
                uuid: user.uid,
                sonGirisTarihi: user?.metadata.lastSignInTime,
                kayitTarihi: user?.metadata?.creationTime,

                mail: user?.email,
              });
            } else {
            }

            getUserRoleControl(user?.email);

            // navigate("/app/anasayfa/anasayfa"); // Giriş başarılıysa yönlendir
          } catch (error) {
       
            if (
              error.code === "auth/wrong-password" ||
              error.code === "auth/user-not-found"
            ) {
              setErrors({ submit: "Kullanıcı adı veya şifre yanlış." });
            } else {
              setErrors({ submit: "Kullanıcı adı veya şifre yanlış." });
            }
            setSubmitting(false);
          
          }
        }}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          touched,
          values,
        }) => (
          <form
            noValidate
            onSubmit={handleSubmit}
            className={className}
            {...rest}
          >
            <h3 className="mb-4">Giriş Yap</h3>
            <div className="form-group mb-3">
              <input
                className="form-control"
                label="Email Address / Username"
                name="email"
                onBlur={handleBlur}
                onChange={handleChange}
                type="email"
                value={values.email}
                placeholder="Email adresi"
              />
              {touched.email && errors.email && (
                <small className="text-danger form-text">{errors.email}</small>
              )}
            </div>
            <div className="form-group mb-4">
              <input
                className="form-control"
                label="Password"
                name="password"
                onBlur={handleBlur}
                onChange={handleChange}
                type="password"
                value={values.password}
                placeholder="Şifre"
              />
              {touched.password && errors.password && (
                <small className="text-danger form-text">
                  {errors.password}
                </small>
              )}
            </div>

            {errors.submit && (
              <Col sm={12}>
                <Alert variant="danger">{errors.submit}</Alert>
              </Col>
            )}

            <div className="custom-control custom-checkbox text-start mb-4 mt-2">
              <input
                type="checkbox"
                className="custom-control-input"
                id="customCheck1"
              />
              <label
                className="custom-control-label pl-3"
                htmlFor="customCheck1"
              >
                Bilgilerimi Kaydet
              </label>
            </div>

            <Row>
              <Col mt={2}>
                <Button
                  className="btn-block"
                  color="primary"
                  disabled={isSubmitting}
                  size="large"
                  type="submit"
                  variant="primary"
                >
                  Giriş Yap
                </Button>
              </Col>
            </Row>
          </form>
        )}
      </Formik>

      <Row>
        <Col sm={12}></Col>
      </Row>

      <hr />
    </React.Fragment>
  );
};

FirebaseLogin.propTypes = {
  className: PropTypes.string,
};

export default FirebaseLogin;
