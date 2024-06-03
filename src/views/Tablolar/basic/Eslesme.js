import React, { useState, useEffect } from "react";
import axios from "axios";
import { Row, Col, Card, Table, Button, Form, Alert } from "react-bootstrap";
import { db, firestore } from "../../../firebase/firebaseConfig";
import { uid } from "uid";
import { set, ref, remove } from "firebase/database";
import {
  addDoc,
  collection,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";

const Eslesme = () => {
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
    const querySnapshot = await getDocs(collection(firestore, "eslesmes"));
    const newData = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setEslesmes(newData);
  };

  const getHamiData = async () => {
    const querySnapshot = await getDocs(collection(firestore, "hamis"));
    const newData = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setHamis(newData);
  };

  const getFirmaData = async () => {
    const querySnapshot = await getDocs(collection(firestore, "firmas"));
    const newData = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setFirmas(newData);
  };
  const getStudentData = async () => {
    const querySnapshot = await getDocs(collection(firestore, "students"));
    const newData = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setStudents(newData);
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
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(null); // Değişiklik yapıldığında hatayı sıfırla
  };

  const handleSave = async () => {
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

    if (editingIndex !== null) {
      const docRef = doc(firestore, "eslesmes", editingIndex);
      await updateDoc(docRef, {
        number: formData.number,
        firma: formData.firma,
        hami: formData.hami,
        donem: formData.donem,
        not: formData.not,
      });
    } else {
      await addDoc(collection(firestore, `eslesmes`), {
        uuid,
        number: formData.number,
        firma: formData.firma,
        hami: formData.hami,
        donem: formData.donem,
        not: formData.not,
      });
    }

    if (editingIndex !== null) {
      await deleteDoc(doc(firestore, "eslesmes", editingIndex));
    }

    setFormData({
      number: "",
      firma: "",
      hami: "",
      donem: "",
      not: "",
    });
    setEditingIndex(null);
    toggleEslesmeFormVisibility();
    getEslesmeData();
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(firestore, "eslesmes", id));
    getEslesmeData();
  };

  const handleEdit = (key) => {
    const eslesme = eslesmes.find((s) => s.id === key);
    setFormData(eslesme);
    setEditingIndex(key);
    toggleEslesmeFormVisibility();
  };

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
                              value={formData.number}
                              onChange={handleChange}
                            >
                              <option value="">Öğrenci seçiniz</option>
                              {students &&
                                Object.keys(students).map((key) => (
                                  <option key={key} value={key}>
                                    {students[key].name}
                                  </option>
                                ))}
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

                    <th>Öğrenci No</th>
                    <th>Firma</th>
                    <th>Hami</th>
                    <th>Dönem</th>
                    <th>Not</th>
                    <th>İşlemler</th>
                  </tr>
                </thead>
                <tbody>
                  {eslesmes?.length > 0 ? (
                    eslesmes.map((eslesme, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>

                        <td>{students[eslesme.number]?.name}</td>
                        <td>{firmas[eslesme.firma]?.firma}</td>
                        <td>{hamis[eslesme.hami]?.name}</td>
                        <td>{eslesme.donem}</td>
                        <td>{eslesme.not}</td>
                        <td>
                          <Button
                            variant="danger"
                            onClick={() => handleDelete(eslesme.id)}
                          >
                            Sil
                          </Button>
                          <Button
                            variant="primary"
                            onClick={() => handleEdit(eslesme.id)}
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

export default Eslesme;
