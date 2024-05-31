import React, { useState, useEffect } from "react";
import axios from "axios";
import { Row, Col, Card, Table, Button, Form, Alert } from "react-bootstrap";
import { db } from "../../../firebase/firebaseConfig";
import { uid } from "uid";
import { set, ref, remove } from "firebase/database";

const BasicTabsPills = () => {
  const [showEslesmeForm, setShowEslesmeForm] = useState(false);
  const [formData, setFormData] = useState({
    number: "",
    firma: "",
    hami: "",
    donem: "",
    not: "",
  });
  const [eslesmes, setEslesmes] = useState([]);
  const [hamis, setHamis] = useState({});
  const [firmas, setFirmas] = useState({});
  const [students, setStudents] = useState({});

  const [editingIndex, setEditingIndex] = useState(null);
  const [error, setError] = useState(null);

  const getEslesmeData = async () => {
    await axios
      .get("https://gozleme-cc975-default-rtdb.firebaseio.com/eslesmes.json")
      .then((response) => {
        setEslesmes(response?.data);
      });
  };

  const getHamiData = async () => {
    await axios
      .get("https://gozleme-cc975-default-rtdb.firebaseio.com/hamis.json")
      .then((response) => {
        setHamis(response?.data);
      });
  };

  const getFirmaData = async () => {
    await axios
      .get("https://gozleme-cc975-default-rtdb.firebaseio.com/firmas.json")
      .then((response) => {
        setFirmas(response?.data);
      });
  };
  const getStudentData = async () => {
    await axios
      .get("https://gozleme-cc975-default-rtdb.firebaseio.com/students.json")
      .then((response) => {
        setStudents(response?.data);
      });
  };

  useEffect(() => {
    getEslesmeData();
    getHamiData();
    getFirmaData();
    getStudentData();
  }, []);

  const toggleEslesmeFormVisibility = () => {
    setShowEslesmeForm(!showEslesmeForm);
    setError(null); // Form visibility değiştiğinde hatayı sıfırla
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "name" && !/^\d*$/.test(value)) {
      setError("Öğrenci numarası sadece rakam olmalıdır");
      return;
    }
    setFormData({ ...formData, [name]: value });
    setError(null); // Değişiklik yapıldığında hatayı sıfırla
  };

  const handleAdd = () => {
    if (
      !formData.number ||
      !formData.firma ||
      !formData.hami ||
      !formData.donem ||
      !formData.not
    ) {
      setError("Lütfen tüm alanları doldurun");
      return;
    }

    const uuid = editingIndex !== null ? editingIndex : uid();

    set(ref(db, `eslesmes/${uuid}`), {
      uuid,
      number: formData.number,
      firma: formData.firma,
      hami: formData.hami,
      donem: formData.donem,
      not: formData.not,
    });

    if (editingIndex !== null) {
      remove(ref(db, `eslesmes/${editingIndex}`));
    }

    setFormData({
      number: "",
      firma: "",
      hami: "",
      donem: "",
      not: "",
    });

    toggleEslesmeFormVisibility();
    getEslesmeData();
  };

  const handleDelete = (id) => {
    remove(ref(db, `eslesmes/${id}`));
    getEslesmeData();
  };

  const handleEdit = (key) => {
    const eslesme = eslesmes[key];
    setFormData(eslesme);
    setEditingIndex(key);
    toggleEslesmeFormVisibility();
  };

  console.log(eslesmes);

  const keys = eslesmes ? Object.keys(eslesmes) : [];

  return (
    <React.Fragment>
      <Row>
        <Col>
          <Card>
            <Card.Header>
              <Card.Title as="h5">Eşleşme</Card.Title>
              <div className="ekle">
                <Button onClick={toggleEslesmeFormVisibility}>
                  {showEslesmeForm ? "Formu Kapat" : "Eşleşme Bilgilerini Ekle"}
                </Button>
                {showEslesmeForm && (
                  <div>
                    <Card.Body>
                      {error && <Alert variant="danger">{error}</Alert>}
                      <Form>
                        <Row>
                          <Form.Group
                            className="mb-3"
                            as={Col}
                            controlId="formGridNo"
                          >
                            <Form.Label>Öğrenci No</Form.Label>
                            <Form.Control
                              as="select"
                              name="number"
                              value={formData.name}
                              onChange={handleChange}
                            >
                              <option value="">Öğrenci seçiniz</option>
                              {students &&
                                Object.keys(students).map(
                                  (key) => (
                                    console.log("key", key),
                                    (
                                      <option key={key} value={key}>
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
                            controlId="formGridFirma"
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
                          <Form.Group
                            className="mb-3"
                            as={Col}
                            controlId="formGridDonem"
                          >
                            <Form.Label>Dönemi</Form.Label>
                            <Form.Control
                              as="select"
                              name="donem"
                              value={formData.donem}
                              onChange={handleChange}
                            >
                              <option value="">Dönem seçiniz</option>
                              <option value="3.Yarıyıl">3.Yarıyıl</option>
                              <option value="4.Yarıyıl">4.Yarıyıl</option>
                            </Form.Control>
                          </Form.Group>
                        </Row>
                        <Row>
                          <Form.Group
                            className="mb-3"
                            as={Col}
                            controlId="formGridNot"
                          >
                            <Form.Label>Not</Form.Label>
                            <Form.Control
                              as="textarea"
                              name="not"
                              value={formData.not}
                              onChange={handleChange}
                              placeholder="Notu giriniz"
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
            </Card.Header>
            <Card.Body>
              <Table responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Öğrenci No</th>
                    <th>Firma</th>
                    <th>Hami</th>
                    <th>Dönem</th>
                    <th>Not</th>
                    <th>İşlemler</th>
                  </tr>
                </thead>
                <tbody>
                  {keys?.length > 0 ? (
                    keys.map((key, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{students[eslesmes[key]?.number]?.numbers}</td>
                        <td>{firmas[eslesmes[key]?.firma]?.firma}</td>
                        <td>{hamis[eslesmes[key]?.hami]?.hami}</td>
                        <td>{eslesmes[key]?.donem}</td>
                        <td>{eslesmes[key]?.not}</td>
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
                      <td colSpan="7">Veri bulunmamaktadır</td>
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

export default BasicTabsPills;
