import axios from "axios";
import React, { useEffect, useState } from "react";
import { Row, Col, Card, Table, Form, Button, Alert } from "react-bootstrap";
import { auth, firestore } from "../../../firebase/firebaseConfig";
import { uid } from "uid";
import {
  addDoc,
  collection,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";

const Ogrenci = () => {
  const [showOgrenciForm, setShowOgrenciForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    number: "",
    semester: "",
    teacher: "",
    bolum: "",
    mail: "",
    sifre: "",
  });
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState({});
  const [editingIndex, setEditingIndex] = useState(null);
  const [error, setError] = useState(null);

  const getStudentData = async () => {
    await getDocs(collection(firestore, "students")).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setStudents(newData);
    });
  };

  const getTeacherData = async () => {
    await getDocs(collection(firestore, "teachers")).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setTeachers(newData);
    });
  };

  useEffect(() => {
    getStudentData();
    getTeacherData();
  }, []);

  const toggleOgrenciFormVisibility = () => {
    setShowOgrenciForm(!showOgrenciForm);
    setError(null); // Form visibility değiştiğinde hatayı sıfırla
  };

  const handleChange = (e) => {
    if (e.target.name === "number") {
      const numberValue = e.target.value;
      if (!/^\d*$/.test(numberValue)) {
        setError("Öğrenci numarası sadece rakam olmalıdır");
        return;
      }
    }
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(null); // Değişiklik yapıldığında hatayı sıfırla
  };

  const handleSave = async () => {
    // Boş alan kontrolü
    if (
      !formData.name ||
      !formData.number ||
      !formData.semester ||
      !formData.teacher ||
      !formData.bolum ||
      !formData.mail ||
      !formData.sifre
    ) {
      setError("Lütfen tüm alanları doldurun");
      return;
    }

    const uuid = editingIndex !== null ? editingIndex : uid();

    if (editingIndex !== null) {
      const docRef = doc(firestore, "students", editingIndex);
      await updateDoc(docRef, {
        uuid,
        name: formData.name,
        numbers: formData.number,
        semester: formData.semester,
        teacher: formData.teacher,
        bolum: formData.bolum,
        mail: formData.mail,
        sifre: formData.sifre,
      });
    } else {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          formData.mail,
          formData.sifre
        );
        const user = userCredential.user;
        alert("Kayıt oldunuz");
      } catch (e) {
        alert(e.message);
      }

      await addDoc(collection(firestore, "students"), {
        uuid,
        name: formData.name,
        numbers: formData.number,
        semester: formData.semester,
        teacher: formData.teacher,
        bolum: formData.bolum,
        mail: formData.mail,
        sifre: formData.sifre,
      });

      // await createUserWithEmailAndPassword(auth, formData.mail, formData.sifre)
      //   .then((userCredential) => {
      //     const user = userCredential.user;
      //     alert("Kayıt oldunuz");
      //   })
      //   .catch((e) => {
      //     alert(e.message);
      //   });
    }

    setFormData({
      name: "",
      number: "",
      semester: "",
      teacher: "",
      bolum: "",
      mail: "",
      sifre: "",
    });

    setEditingIndex(null);
    toggleOgrenciFormVisibility();
    getStudentData();
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(firestore, "students", id));
    getStudentData();
  };

  const handleEdit = (id) => {
    const student = students.find((s) => s.id === id);
    setFormData(student);
    setEditingIndex(id);
    toggleOgrenciFormVisibility();
  };

  return (
    <React.Fragment>
      <Row>
        <Col>
          <Card>
            <Card.Header>
              <Card.Title as="h5">ÖĞRENCİ</Card.Title>
              <div className="ekle">
                <Button onClick={toggleOgrenciFormVisibility}>
                  {showOgrenciForm ? "Formu Kapat" : "Öğrenci Ekle"}
                </Button>
                {showOgrenciForm && (
                  <div>
                    <Card.Body>
                      {error && <Alert variant="danger">{error}</Alert>}
                      <Form>
                        <Form.Group className="mb-3" controlId="formGridIsim">
                          <Form.Label>Öğrenci İsim Soyisim</Form.Label>
                          <Form.Control
                            placeholder="Öğrenci İsim ve soyismini giriniz"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                          />
                        </Form.Group>

                        <Row>
                          <Form.Group
                            className="mb-3"
                            as={Col}
                            controlId="formGridNo"
                          >
                            <Form.Label>Öğrenci No</Form.Label>
                            <Form.Control
                              placeholder="Öğrenci No giriniz"
                              name="number"
                              value={formData.number}
                              onChange={handleChange}
                            />
                          </Form.Group>

                          <Form.Group
                            className="mb-3"
                            as={Col}
                            controlId="formGridDonem"
                          >
                            <Form.Label>Dönem</Form.Label>
                            <Form.Control
                              as="select"
                              name="semester"
                              value={formData.semester}
                              onChange={handleChange}
                            >
                              <option value="">Dönem giriniz</option>
                              <option>3.Yarıyıl</option>
                              <option>4.Yarıyıl</option>
                            </Form.Control>
                          </Form.Group>

                          <Form.Group
                            className="mb-3"
                            as={Col}
                            controlId="formGridOgretmen"
                          >
                            <Form.Label>Öğretmen</Form.Label>
                            <Form.Control
                              as="select"
                              name="teacher"
                              value={formData.teacher}
                              onChange={handleChange}
                            >
                              <option value="">Öğretmen seçiniz</option>
                              {teachers &&
                                Object.keys(teachers).map((key) => (
                                  <option key={key} value={key}>
                                    {teachers[key].teacher}
                                  </option>
                                ))}
                            </Form.Control>
                          </Form.Group>
                          <Form.Group
                            className="mb-3"
                            as={Col}
                            controlId="formGridDonem"
                          >
                            <Form.Label>Bölüm</Form.Label>
                            <Form.Control
                              as="select"
                              name="bolum"
                              value={formData.bolum}
                              onChange={handleChange}
                            >
                              <option value="">Bölüm giriniz</option>
                              <option> Bilgisayar Programcılığı</option>
                              <option>Bilişim Güvenliği Teknolojisi</option>
                              <option>Biyomedikal Cihaz Teknolojisi</option>
                              <option>E-Ticaret ve Pazarlama</option>
                              <option>Elektrik</option>
                              <option>
                                Hibrid ve Elektrikli Taşıtlar Teknolojileri
                              </option>
                              <option>
                                İnsansız Hava Aracı Teknolojisi ve Operatörlüğü
                              </option>
                              <option>Lojistik</option>
                              <option>Makine</option>
                              <option>Mekatronik</option>
                              <option>Silah Sanayi Teknikerliği</option>
                            </Form.Control>
                          </Form.Group>
                          <Form.Group className="mb-3" controlId="formGridMail">
                            <Form.Label>Öğrenci Mail</Form.Label>
                            <Form.Control
                              type="email"
                              placeholder="Öğrenci mail adresi giriniz"
                              name="mail"
                              value={formData.mail}
                              onChange={handleChange}
                            />
                          </Form.Group>

                          <Form.Group
                            className="mb-3"
                            controlId="formGridSifre"
                          >
                            <Form.Label>Şifre</Form.Label>
                            <Form.Control
                              type="password"
                              placeholder="Şifre giriniz"
                              name="sifre"
                              value={formData.sifre}
                              onChange={handleChange}
                            />
                          </Form.Group>
                        </Row>

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
                    <th>İsim - Soyisim</th>
                    <th>Öğrenci No</th>
                    <th>Öğrenci id </th>
                    <th>Dönem</th>
                    <th>Öğretmen</th>
                    <th>Bölüm</th>
                    <th>İşlemler</th>
                  </tr>
                </thead>
                <tbody>
                  {students.length > 0 ? (
                    students.map((student, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{student.name}</td>
                        <td>{student.numbers}</td>
                        <td>{student.uuid}</td>
                        <td>{student.semester}</td>
                        <td>{teachers[student.teacher]?.teacher}</td>
                        <td>{student.bolum}</td>
                        <td>
                          <Button
                            variant="danger"
                            onClick={() => handleDelete(student.id)}
                          >
                            Sil
                          </Button>
                          <Button
                            variant="primary"
                            onClick={() => handleEdit(student.id)}
                          >
                            Düzenle
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8">Veri bulunmamaktadır</td>
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

export default Ogrenci;
