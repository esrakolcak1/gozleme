// src/components/TeacherComponent.js
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Row, Col, Card, Table, Form, Button, Alert } from "react-bootstrap";
import { db } from "../../../firebase/firebaseConfig";
import { uid } from "uid";
import { set, ref, remove } from "firebase/database";

const TeacherComponent = () => {
  const [showTeacherForm, setShowTeacherForm] = useState(false);
  const [formData, setFormData] = useState({
    teacher: "",
    mail: "",
    sifre: "",
  });
  const [teachers, setTeachers] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [error, setError] = useState(null);

  const getTeacherData = async () => {
    await axios
      .get("https://gozleme-cc975-default-rtdb.firebaseio.com/teachers.json")
      .then((response) => {
        console.log(response);
        setTeachers(response?.data);
      });
  };

  useEffect(() => {
    getTeacherData();
  }, [teachers]);

  const toggleTeacherFormVisibility = () => {
    setShowTeacherForm(!showTeacherForm);
    setError(null); // Form visibility değiştiğinde hatayı sıfırla
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(null); // Değişiklik yapıldığında hatayı sıfırla
  };

  const handleSave = () => {
    // Boş alan kontrolü
    if (!formData.teacher || !formData.mail || !formData.sifre) {
      setError("Lütfen tüm alanları doldurun");
      return;
    }
    const uuid = uid();

    set(ref(db, `teachers/${uuid}`), {
      uuid,
      teacher: formData.teacher,
      mail: formData.mail,
      sifre: formData.sifre,
    });

    setFormData({
      teacher: "",
      mail: "",
      sifre: "",
    });
    toggleTeacherFormVisibility();
    getTeacherData();
  };

  const handleDelete = (id) => {
    remove(ref(db, `teachers/${id}`));
    getTeacherData();
  };

  const handleEdit = (key) => {
    const teacher = teachers[key];
    setFormData(teacher);
    setEditingIndex(key);
    toggleTeacherFormVisibility();
  };

  const keys = teachers != null ? Object.keys(teachers) : [];

  return (
    <React.Fragment>
      <Row>
        <Col>
          <Card>
            <Card.Header>
              <Card.Title as="h5">ÖĞRETMENLER</Card.Title>
              <div className="ekle">
                <Button onClick={toggleTeacherFormVisibility}>
                  {showTeacherForm ? "Formu Kapat" : "Öğretmen Ekle"}
                </Button>
                {showTeacherForm && (
                  <div>
                    <Card.Body>
                      {error && <Alert variant="danger">{error}</Alert>}
                      <Form>
                        <Form.Group className="mb-3" controlId="formGridName">
                          <Form.Label>Öğretmen İsim</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Öğretmen ismini giriniz"
                            name="teacher"
                            value={formData.teacher}
                            onChange={handleChange}
                          />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formGridMail">
                          <Form.Label>Öğretmen Mail</Form.Label>
                          <Form.Control
                            type="email"
                            placeholder="Öğretmen mail adresi giriniz"
                            name="mail"
                            value={formData.mail}
                            onChange={handleChange}
                          />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formGridSifre">
                          <Form.Label>Şifre</Form.Label>
                          <Form.Control
                            type="password"
                            placeholder="Şifre giriniz"
                            name="sifre"
                            value={formData.sifre}
                            onChange={handleChange}
                          />
                        </Form.Group>

                        <Button variant="primary" onClick={handleSave}>
                          {editingIndex !== null ? "DÜZENLE" : "EKLE"}
                        </Button>
                      </Form>
                    </Card.Body>
                  </div>
                )}
              </div>
            </Card.Header>
            <Card.Body>
              <Table responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Öğretmen ID</th>
                    <th>Öğretmen İsim</th>
                    <th>Öğretmen Mail</th>
                    <th>Şifre</th>
                    <th>İşlemler</th>
                  </tr>
                </thead>
                <tbody>
                  {keys?.length > 0 ? (
                    keys.map((key, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{teachers[key]?.uuid}</td>
                        <td>{teachers[key]?.teacher}</td>
                        <td>{teachers[key]?.mail}</td>
                        <td>{teachers[key]?.sifre}</td>

                        <td>
                          <Button
                            variant="danger"
                            onClick={() => handleDelete(key)}
                          >
                            Sil
                          </Button>
                          <Button
                            variant="primary"
                            onClick={() => handleEdit(key)}
                          >
                            Düzenle
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6">Veri bulunmamaktadır</td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default TeacherComponent;
