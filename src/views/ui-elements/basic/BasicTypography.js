import axios from "axios";
import React, { useEffect, useState } from "react";
import { Row, Col, Card, Table, Form, Button, Alert } from "react-bootstrap";
import { db } from "../../../firebase/firebaseConfig";
import { uid } from "uid";
import { set, ref, remove } from "firebase/database";

const BasicTypography = () => {
  const [showZiyaretForm, setShowZiyaretForm] = useState(false);
  const [formData, setFormData] = useState({
    teacher: "",
    number: "",
    hami: "",
    firma: "",
    ziyaretturu: "",
    ziyaretgorusu: "",
    resim: "",
    not: "",
    tarih: "",
  });
  const [ziyarets, setZiyarets] = useState([]);
  const [teachers, setTeachers] = useState({});
  const [students, setStudents] = useState({});
  const [hamis, setHamis] = useState({});
  const [firmas, setFirmas] = useState({});
  const [editingIndex, setEditingIndex] = useState(null);
  const [error, setError] = useState(null);

  const getZiyaretData = async () => {
    await axios
      .get("https://gozleme-cc975-default-rtdb.firebaseio.com/ziyarets.json")
      .then((response) => {
        setZiyarets(response?.data || {});
      });
  };

  const getTeacherData = async () => {
    await axios
      .get("https://gozleme-cc975-default-rtdb.firebaseio.com/teachers.json")
      .then((response) => {
        setTeachers(response?.data || {});
      });
  };

  const getHamiData = async () => {
    await axios
      .get("https://gozleme-cc975-default-rtdb.firebaseio.com/hamis.json")
      .then((response) => {
        setHamis(response?.data || {});
      });
  };

  const getStudentData = async () => {
    await axios
      .get("https://gozleme-cc975-default-rtdb.firebaseio.com/students.json")
      .then((response) => {
        setStudents(response?.data || {});
      });
  };

  const getFirmaData = async () => {
    await axios
      .get("https://gozleme-cc975-default-rtdb.firebaseio.com/firmas.json")
      .then((response) => {
        setFirmas(response?.data || {});
      });
  };

  useEffect(() => {
    getZiyaretData();
    getStudentData();
    getTeacherData();
    getFirmaData();
    getHamiData();
  }, []);

  const toggleZiyaretFormVisibility = () => {
    setShowZiyaretForm(!showZiyaretForm);
    setError(null);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(null); // Değişiklik yapıldığında hatayı sıfırla
  };
  const handleAdd = () => {
    if (
      !formData.teacher ||
      !formData.number ||
      !formData.hami ||
      !formData.firma ||
      !formData.ziyaretturu ||
      !formData.ziyaretgorusu ||
      !formData.resim ||
      !formData.not ||
      !formData.tarih
    ) {
      setError("Lütfen tüm alanları doldurun");
      return;
    }
    const uuid = editingIndex !== null ? editingIndex : uid();

    set(ref(db, `ziyarets/${uuid}`), {
      uuid,
      teacher: formData.teacher,
      number: formData.number,
      hami: formData.hami,
      firma: formData.firma,
      ziyaretturu: formData.ziyaretturu,
      ziyaretgorusu: formData.ziyaretgorusu,
      resim: formData.resim,
      not: formData.not,
      tarih: formData.tarih,
    });

    if (editingIndex !== null) {
      remove(ref(db, `ziyarets/${editingIndex}`));
    }

    setFormData({
      teacher: "",
      number: "",
      hami: "",
      firma: "",
      ziyaretturu: "",
      ziyaretgorusu: "",
      resim: "",
      not: "",
      tarih: "",
    });
    setEditingIndex(null);
    toggleZiyaretFormVisibility();
    getZiyaretData();
  };

  const handleDelete = (id) => {
    remove(ref(db, `ziyarets/${id}`));
    getZiyaretData();
  };

  const handleEdit = (key) => {
    const ziyaret = ziyarets[key];
    setFormData(ziyaret);
    setEditingIndex(key);
    toggleZiyaretFormVisibility();
  };

  const keys = ziyarets != null ? Object.keys(ziyarets) : [];

  return (
    <React.Fragment>
      <Row>
        <Col>
          <Card>
            <Card.Header>
              <Card.Title as="h5">ZİYARET</Card.Title>
              <div className="ekle">
                <Button onClick={toggleZiyaretFormVisibility}>
                  {showZiyaretForm ? "Formu Kapat" : "Ziyaret Bilgilerini Ekle"}
                </Button>
                {showZiyaretForm && (
                  <div>
                    <Card.Body>
                      {error && <Alert variant="danger">{error}</Alert>}
                      <Form>
                        <Row>
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
                            controlId="formGridNo"
                          >
                            <Form.Label>Öğrenci No</Form.Label>
                            <Form.Control
                              as="select"
                              name="number"
                              value={formData.number} // Değiştirildi
                              onChange={handleChange}
                            >
                              <option value="">Öğrenci seçiniz</option>
                              {students &&
                                Object.keys(students).map(
                                  (key) => (
                                    console.log("key", key),
                                    (
                                      <option
                                        key={key}
                                        value={students[key].number}
                                      >
                                        {" "}
                                        {/* Değiştirildi */}
                                        {students[key].name}
                                      </option>
                                    )
                                  )
                                )}
                            </Form.Control>
                          </Form.Group>
                          <Form.Group
                            className="mb-3"
                            as={Col}
                            controlId="formGridFirmaId"
                          >
                            <Form.Label>Firma</Form.Label>
                            <Form.Control
                              as="select"
                              name="firma"
                              value={formData.firma}
                              onChange={handleChange}
                            >
                              <option value="">Firma seçiniz</option>
                              {firmas &&
                                Object.keys(firmas).map((key) => (
                                  <option key={key} value={key}>
                                    {firmas[key].firma}
                                  </option>
                                ))}
                            </Form.Control>
                          </Form.Group>
                          <Form.Group
                            className="mb-3"
                            as={Col}
                            controlId="formGridHami"
                          >
                            <Form.Label>Hami</Form.Label>
                            <Form.Control
                              as="select"
                              name="hami"
                              value={formData.hami}
                              onChange={handleChange}
                            >
                              <option value="">Hami seçiniz</option>
                              {hamis &&
                                Object.keys(hamis).map((key) => (
                                  <option key={key} value={key}>
                                    {hamis[key].name}
                                  </option>
                                ))}
                            </Form.Control>
                          </Form.Group>
                        </Row>
                        <Button variant="primary" onClick={handleAdd}>
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
                    <th>Ziyaret id</th>
                    <th>Öğretmen</th>
                    <th>Öğrenci No</th>
                    <th>Firma</th>
                    <th>Hami</th>
                    <th>İşlemler</th>
                  </tr>
                </thead>
                <tbody>
                  {keys?.length > 0 ? (
                    keys.map((key, index) => (
                      <tr key={key}>
                        <th scope="row">{index + 1}</th>
                        <td>{key}</td>
                        <td>{teachers[ziyarets[key]?.teacher]?.teacher}</td>
                        <td>{students[ziyarets[key]?.number]?.number}</td>
                        <td>{firmas[ziyarets[key]?.firma]?.firma}</td>
                        <td>{hamis[ziyarets[key]?.hami]?.name}</td>
                        <td>
                          <Button
                            variant="danger"
                            onClick={() => handleDelete(key)}
                          >
                            Sil
                          </Button>
                          <Button
                            variant="info"
                            onClick={() => handleEdit(key)}
                          >
                            Düzenle
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="text-center">
                        Henüz ziyaret eklenmedi.
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card>
            <Card.Title as="h5">ZİYARET</Card.Title>
            <div className="ekle">
              <Button onClick={toggleZiyaretFormVisibility}>
                {showZiyaretForm ? "Formu Kapat" : "Ziyaret Bilgilerini Ekle"}
              </Button>
              {showZiyaretForm && (
                <div>
                  <Card.Body>
                    <Form>
                      <Row gy={3}>
                        <Form.Group
                          className="mb-3"
                          as={Col}
                          controlId="formGridZiyaretTuru"
                        >
                          <Form.Label>Ziyaret Türü</Form.Label>
                          <Form.Control
                            as="select"
                            name="ziyaretturu"
                            value={formData.ziyaretturu}
                            onChange={handleChange}
                          >
                            <option value="">Ziyaret Türü seçiniz</option>
                            <option>Telefon</option>
                            <option>Yüzyüze</option>
                          </Form.Control>
                        </Form.Group>
                        <Form.Group
                          className="mb-3"
                          as={Col}
                          controlId="formGridZiyaretGorusu"
                        >
                          <Form.Label>Ziyaret Görüşü</Form.Label>
                          <Form.Control
                            as="textarea"
                            rows={3}
                            name="ziyaretgorusu"
                            value={formData.ziyaretgorusu}
                            onChange={handleChange}
                          />
                        </Form.Group>
                        <Form.Group
                          className="mb-3"
                          as={Col}
                          controlId="formGridResim"
                        >
                          <Form.Label>Resim</Form.Label>
                          <Form.Control
                            type="file"
                            name="resim"
                            onChange={handleChange}
                          />
                        </Form.Group>
                      </Row>
                      <Button variant="primary" onClick={handleAdd}>
                        {editingIndex !== null ? "DÜZENLE" : "EKLE"}
                      </Button>
                    </Form>
                  </Card.Body>
                </div>
              )}
            </div>
            <Card.Body>
              <Table responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Ziyaret Türü</th>
                    <th>Ziyaret Görüşü</th>
                    <th>Resim</th>
                    <th>İşlemler</th>
                  </tr>
                </thead>
                <tbody>
                  {keys?.length > 0 ? (
                    keys.map((key, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{ziyarets[key]?.ziyaretturu}</td>
                        <td>{ziyarets[key]?.ziyaretgorusu}</td>
                        <td>{ziyarets[key]?.resim}</td>
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
      <Row>
        <Col>
          <Card>
            <Card.Header>
              <Card.Title as="h5">ZİYARET</Card.Title>
              <Button onClick={toggleZiyaretFormVisibility}>
                {showZiyaretForm ? "Formu Kapat" : "Ziyaret Bilgilerini Ekle"}
              </Button>
              {showZiyaretForm && (
                <div>
                  <Card.Body>
                    <Form>
                      <Row gy={3}>
                        <Form.Group
                          className="mb-3"
                          as={Col}
                          controlId="formGridZiyaret"
                        >
                          <Form.Label>Not</Form.Label>
                          <Form.Control
                            placeholder="Not giriniz"
                            name="not"
                            value={formData.not}
                            onChange={handleChange}
                          />
                        </Form.Group>
                      </Row>
                      <Row>
                        <Form.Group
                          className="mb-3"
                          as={Col}
                          controlId="formGridTarih"
                        >
                          <Form.Label>Tarih</Form.Label>
                          <Form.Control
                            name="tarih"
                            type="date"
                            value={formData.tarih}
                            onChange={handleChange}
                          />
                        </Form.Group>
                      </Row>
                      <Button variant="primary" onClick={handleAdd}>
                        {editingIndex !== null ? "DÜZENLE" : "EKLE"}
                      </Button>
                    </Form>
                  </Card.Body>
                </div>
              )}
            </Card.Header>
            <Card.Body>
              <Table responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Not</th>
                    <th>Tarih</th>
                    <th>İşlemler</th>
                  </tr>
                </thead>
                <tbody>
                  {keys?.length > 0 ? (
                    keys.map((key, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{ziyarets[key]?.not}</td>
                        <td>{ziyarets[key]?.tarih}</td>
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

export default BasicTypography;
