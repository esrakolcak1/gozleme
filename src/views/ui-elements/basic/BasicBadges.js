import axios from "axios";
import React, { useEffect, useState } from "react";
import { Row, Col, Card, Table, Form, Button, Alert } from "react-bootstrap";
import { db } from "../../../firebase/firebaseConfig";
import { uid } from "uid";
import { set, ref, remove } from "firebase/database";

const BasicBadges = () => {
  const [showOgrenciForm, setShowOgrenciForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    number: "",
    semester: "",
    teacher: "",
  });
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState({});
  const [editingIndex, setEditingIndex] = useState(null);
  const [error, setError] = useState(null);

  const getStudentData = async () => {
    await axios
      .get("https://gozleme-cc975-default-rtdb.firebaseio.com/students.json")
      .then((response) => {
        setStudents(response?.data);
      });
  };

  const getTeacherData = async () => {
    await axios
      .get("https://gozleme-cc975-default-rtdb.firebaseio.com/teachers.json")
      .then((response) => {
        setTeachers(response?.data);
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

  const handleSave = () => {
    // Boş alan kontrolü
    if (
      !formData.name ||
      !formData.number ||
      !formData.semester ||
      !formData.teacher
    ) {
      setError("Lütfen tüm alanları doldurun");
      return;
    }

    const uuid = editingIndex !== null ? editingIndex : uid();

    set(ref(db, `students/${uuid}`), {
      uuid,
      name: formData.name,
      numbers: formData.number,
      semester: formData.semester,
      teacher: formData.teacher,
    });

    if (editingIndex !== null) {
      remove(ref(db, `students/${editingIndex}`));
    }

    setFormData({
      name: "",
      number: "",
      semester: "",
      teacher: "",
    });

    setEditingIndex(null);
    toggleOgrenciFormVisibility();
    getStudentData();
  };

  const handleDelete = (id) => {
    remove(ref(db, `students/${id}`));
    getStudentData();
  };

  const handleEdit = (key) => {
    const student = students[key];
    setFormData(student);
    setEditingIndex(key);
    toggleOgrenciFormVisibility();
  };

  const keys = students != null ? Object.keys(students) : [];

  return (
    <React.Fragment>
      <Row>
        <Col>
          <Card>
            <Card.Header>
              <Card.Title as="h5">ÖĞRENCİ</Card.Title>
              <div className="ekle">
                <Button onClick={toggleOgrenciFormVisibility}>
                  {showOgrenciForm ? "Formu Kapat" : "Eşleşme Bilgilerini Ekle"}
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
                              as="select" // select elementine dönüştürüldü
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

                    <th>İşlemler</th>
                  </tr>
                </thead>
                <tbody>
                  {keys?.length > 0 ? (
                    Object.keys(students)?.map((key, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{students[key]?.name}</td>
                        <td>{students[key]?.numbers}</td>
                        <td>{students[key]?.uuid}</td>
                        <td>{students[key]?.semester}</td>
                        <td>{teachers[students[key]?.teacher]?.teacher}</td>
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

export default BasicBadges;
