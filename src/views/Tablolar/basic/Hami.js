import React, { useEffect, useState } from "react";
import { Row, Col, Card, Table, Button, Form, Alert } from "react-bootstrap";
import { firestore } from "../../../firebase/firebaseConfig";
import { uid } from "uid";
import {
  addDoc,
  collection,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";

const Hami = () => {
  const [showHamiForm, setShowHamiForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    firma: "",
    telefon: "",
    degerlendirmeGorusu: "",
  });
  const [hamis, setHamis] = useState([]);
  const [firmas, setFirmas] = useState({});
  const [editingIndex, setEditingIndex] = useState(null);
  const [error, setError] = useState(null);

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

  useEffect(() => {
    getHamiData();
    getFirmaData();
  }, []);

  const toggleHamiFormVisibility = () => {
    setShowHamiForm(!showHamiForm);
    setError(null);
  };

  const handleChange = (e) => {
    if (e.target.name === "telefon") {
      const phoneNumber = e.target.value.replace(/\D/g, "");
      if (phoneNumber.length >= 11) return;
      setFormData({ ...formData, [e.target.name]: phoneNumber });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    setError(null);
  };

  const handleSave = async () => {
    if (
      !formData.name ||
      !formData.firma ||
      !formData.telefon ||
      !formData.degerlendirmeGorusu
    ) {
      setError("Lütfen tüm alanları doldurun");
      return;
    }

    const uuid = editingIndex !== null ? editingIndex : uid();

    if (editingIndex !== null) {
      const docRef = doc(firestore, "hamis", editingIndex);
      await updateDoc(docRef, {
        uuid,
        name: formData.name,
        firma: formData.firma,
        telefon: formData.telefon,
        degerlendirmeGorusu: formData.degerlendirmeGorusu,
      });
    } else {
      await addDoc(collection(firestore, "hamis"), {
        uuid,
        name: formData.name,
        firma: formData.firma,
        telefon: formData.telefon,
        degerlendirmeGorusu: formData.degerlendirmeGorusu,
      });
    }

    setFormData({
      name: "",
      firma: "",
      telefon: "",
      degerlendirmeGorusu: "",
    });

    setEditingIndex(null);
    toggleHamiFormVisibility();
    getHamiData();
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(firestore, "hamis", id));
    getHamiData();
  };

  const handleEdit = (id) => {
    const hami = hamis.find((s) => s.id === id);
    setFormData(hami);
    setEditingIndex(id);
    toggleHamiFormVisibility();
  };

  const keys = hamis != null ? Object.keys(hamis) : [];

  return (
    <React.Fragment>
      <Row>
        <Col>
          <Card>
            <Card.Header>
              <Card.Title as="h5">HAMİ</Card.Title>
              <div className="ekle">
                <Button onClick={toggleHamiFormVisibility}>
                  {showHamiForm ? "Formu Kapat" : "Hami Bilgilerini Ekle"}
                </Button>
                {showHamiForm && (
                  <div>
                    <Card.Body>
                      {error && <Alert variant="danger">{error}</Alert>}
                      <Form>
                        <Row>
                          <Form.Group
                            className="mb-3"
                            as={Col}
                            controlId="formGridState"
                          >
                            <Form.Label>İsim Soyisim</Form.Label>
                            <Form.Control
                              placeholder="İsim soyisim giriniz"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                            />
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
                        </Row>
                        <Row>
                          <Form.Group
                            className="mb-3"
                            as={Col}
                            controlId="formGridTelefon"
                          >
                            <Form.Label>Telefon</Form.Label>
                            <Form.Control
                              type="tel"
                              placeholder="Telefon giriniz"
                              name="telefon"
                              value={formData.telefon}
                              onChange={handleChange}
                            />
                          </Form.Group>
                          <Form.Group
                            className="mb-3"
                            as={Col}
                            controlId="formGridText"
                          >
                            <Form.Label>Değerlendirme Görüşü</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Değerlendirme görüşünüzü giriniz"
                              name="degerlendirmeGorusu"
                              value={formData.degerlendirmeGorusu}
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
                    <th>Hami id</th>
                    <th>İsim - Soyisim</th>
                    <th>Telefon</th>
                    <th>Firma </th>
                    <th>Hami Değerlendirme</th>
                    <th>İşlemler</th>
                  </tr>
                </thead>
                <tbody>
                  {hamis.length > 0 ? (
                    hamis.map((hami, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{hami.uuid}</td>
                        <td>{hami.name}</td>
                        <td>{hami.telefon}</td>
                        <td>{firmas[hami.firma]?.firma}</td>
                        <td>{hami.degerlendirmeGorusu}</td>
                        <td>
                          <Button
                            variant="danger"
                            onClick={() => handleDelete(hami.id)}
                          >
                            Sil
                          </Button>
                          <Button
                            variant="primary"
                            onClick={() => handleEdit(hami.id)}
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

export default Hami;
