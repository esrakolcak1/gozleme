import axios from "axios";
import React, { useEffect, useState } from "react";
import { Row, Col, Card, Table, Form, Button, Alert } from "react-bootstrap";
import { auth, db, firestore } from "../../../firebase/firebaseConfig";
import { uid } from "uid";
import { set, ref, remove } from "firebase/database";
import {
  addDoc,
  collection,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";

const Ogretmen = () => {
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
    const querySnapshot = await getDocs(collection(firestore, "teachers"));
    const newData = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setTeachers(newData);
  };

  useEffect(() => {
    getTeacherData();
  }, []);

  const toggleTeacherFormVisibility = () => {
    setShowTeacherForm(!showTeacherForm);
    setError(null); // Form visibility değiştiğinde hatayı sıfırla
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(null); // Değişiklik yapıldığında hatayı sıfırla
  };

  const handleSave = async () => {
    // Boş alan kontrolü
    if (!formData.teacher || !formData.mail || !formData.sifre) {
      setError("Lütfen tüm alanları doldurun");
      return;
    }
    const uuid = editingIndex !== null ? editingIndex : uid();

    if (editingIndex !== null) {
      const docRef = doc(firestore, "teachers", editingIndex);
      await updateDoc(docRef, {
        uuid,
        teacher: formData.teacher,
        mail: formData.mail,
        sifre: formData.sifre,
      });
    } else {
      await addDoc(collection(firestore, "teachers"), {
        uuid,
        teacher: formData.teacher,
        mail: formData.mail,
        sifre: formData.sifre,
      });

      await addDoc(collection(firestore, `rolekontrol`), {
        uuid,
        email: formData.mail,
        role: "Admin",
      });

      createUserWithEmailAndPassword(auth, formData.mail, formData.sifre)
        .then((userCredential) => {
          const user = userCredential.user;
          // Kullanıcı veritabanına rol ekleyin

          alert("Kayıt oldunuz");
        })
        .catch((e) => {
          alert(e.message);
        });
    }

    setFormData({
      teacher: "",
      mail: "",
      sifre: "",
    });
    setEditingIndex(null);
    toggleTeacherFormVisibility();
    getTeacherData();
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(firestore, "teachers", id));
    getTeacherData();
  };

  const handleEdit = (id) => {
    const teacher = teachers.find((s) => s.id === id);
    setFormData(teacher);
    setEditingIndex(id);
    toggleTeacherFormVisibility();
  };

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
                  {teachers.length > 0 ? (
                    teachers.map((teacher, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{teacher.uuid}</td>
                        <td>{teacher.teacher}</td>
                        <td>{teacher.mail}</td>
                        <td>{teacher.sifre}</td>
                        <td>
                          <Button
                            variant="danger"
                            onClick={() => handleDelete(teacher.id)}
                          >
                            Sil
                          </Button>
                          <Button
                            variant="primary"
                            onClick={() => handleEdit(teacher.id)}
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

export default Ogretmen;
