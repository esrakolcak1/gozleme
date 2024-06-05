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

const Firma = () => {
  const [showFirmaForm, setShowFirmaForm] = useState(false);
  const [formData, setFormData] = useState({
    firma: "",
    firmaAdresi: "",
    firmaMaili: "",
    firmaTelefonu: "",
    yetkili: "",
    firmaDegerlendirmesi: 1,
    calisankisi: "",
    stajyer: "",
  });
  const [firmas, setFirmas] = useState({});
  const [editingIndex, setEditingIndex] = useState(null);
  const [error, setError] = useState(null);

  const getFirmaData = async () => {
    const querySnapshot = await getDocs(collection(firestore, "firmas"));
    const newData = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setFirmas(newData);
  };

  useEffect(() => {
    getFirmaData();
  }, []);

  const toggleFirmaFormVisibility = () => {
    setShowFirmaForm(!showFirmaForm);
    setError(null); // Form visibility değiştiğinde hatayı sıfırla
  };

  const handleChange = (e) => {
    if (e.target.name === "firmaTelefonu") {
      const firmaTelefonuValue = e.target.value;
      if (!/^\d*$/.test(firmaTelefonuValue)) {
        setError("Telefon numarası sadece rakam olmalıdır");
        return;
      }
      if (formData.firmaTelefonu === firmaTelefonuValue) {
        setError("Aynı telefon numarasını tekrar giremezsiniz");
        return;
      }
    }
    const firmaMailiValue = formData.firmaMaili;
    if (formData.firmaMaili === firmaMailiValue) {
      setError("Aynı maili tekrar giremezsiniz");
      return;
    }

    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(null); // Değişiklik yapıldığında hatayı sıfırla
  };

  const handleSave = async () => {
    // Boş alan kontrolü
    if (
      !formData.firma ||
      !formData.firmaAdresi ||
      !formData.firmaMaili ||
      !formData.firmaTelefonu ||
      !formData.yetkili ||
      !formData.calisankisi ||
      !formData.stajyer
    ) {
      setError("Lütfen tüm alanları doldurun");
      return;
    }

    const uuid = editingIndex !== null ? editingIndex : uid();

    if (editingIndex !== null) {
      const docRef = doc(firestore, "firmas", editingIndex);
      await updateDoc(docRef, {
        uuid,
        firma: formData.firma,
        firmaAdresi: formData.firmaAdresi,
        firmaMaili: formData.firmaMaili,
        firmaTelefonu: formData.firmaTelefonu,
        yetkili: formData.yetkili,
        firmaDegerlendirmesi: formData.firmaDegerlendirmesi,
        calisankisi: formData.calisankisi,
        stajyer: formData.stajyer,
      });
    } else {
      await addDoc(collection(firestore, "firmas"), {
        uuid,
        firma: formData.firma,
        firmaAdresi: formData.firmaAdresi,
        firmaMaili: formData.firmaMaili,
        firmaTelefonu: formData.firmaTelefonu,
        yetkili: formData.yetkili,
        firmaDegerlendirmesi: formData.firmaDegerlendirmesi,
        calisankisi: formData.calisankisi,
        stajyer: formData.stajyer,
      });

      setFormData({
        uuid,
        firma: "",
        firmaAdresi: "",
        firmaMaili: "",
        firmaTelefonu: "",
        yetkili: "",
        firmaDegerlendirmesi: 1,
        calisankisi: "",
        stajyer: "",
      });

      setEditingIndex(null);
      toggleFirmaFormVisibility();
      getFirmaData();
    }
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(firestore, "firmas", id));
    getFirmaData();
  };

  const handleEdit = (id) => {
    const firma = firmas.find((s) => s.id === id);
    setFormData(firma);
    setEditingIndex(id);
    toggleFirmaFormVisibility();
  };

  return (
    <React.Fragment>
      <Row>
        <Col>
          <Card>
            <Card.Header>
              <Card.Title as="h5">FİRMA</Card.Title>
              <div className="ekle">
                <Button onClick={toggleFirmaFormVisibility}>
                  {showFirmaForm ? "Formu Kapat" : "Firma Bilgilerini Ekle"}
                </Button>
                {showFirmaForm && (
                  <div>
                    <Card.Body>
                      {error && <Alert variant="danger">{error}</Alert>}
                      <Form>
                        <Form.Group className="mb-3" controlId="formGridfirma">
                          <Form.Label>Firma Adı</Form.Label>
                          <Form.Control
                            placeholder="Firma Adı giriniz"
                            name="firma"
                            value={formData.firma}
                            onChange={handleChange}
                          />
                        </Form.Group>

                        <Form.Group
                          className="mb-3"
                          controlId="formGridFirmaAdresi"
                        >
                          <Form.Label>Firma Adresi</Form.Label>
                          <Form.Control
                            placeholder="Firma Adresi giriniz"
                            name="firmaAdresi"
                            value={formData.firmaAdresi}
                            onChange={handleChange}
                          />
                        </Form.Group>

                        <Row>
                          <Form.Group
                            className="mb-3"
                            as={Col}
                            controlId="formGridFirmaMaili"
                          >
                            <Form.Label>Firma Maili</Form.Label>
                            <Form.Control
                              type="email"
                              placeholder="Firma Maili giriniz"
                              name="firmaMaili"
                              value={formData.firmaMaili}
                              onChange={handleChange}
                            />
                          </Form.Group>

                          <Form.Group
                            className="mb-3"
                            as={Col}
                            controlId="formGridFirmaTelefonu"
                          >
                            <Form.Label>Firma Telefonu</Form.Label>
                            <Form.Control
                              type="tel"
                              placeholder="Firma Telefonu giriniz"
                              name="firmaTelefonu"
                              value={formData.firmaTelefonu}
                              onChange={handleChange}
                            />
                          </Form.Group>

                          <Form.Group
                            className="mb-3"
                            as={Col}
                            controlId="formGridYetkili"
                          >
                            <Form.Label>Yetkili Adı ve Soyadı</Form.Label>
                            <Form.Control
                              placeholder="Yetkili Adı ve Soyadı giriniz"
                              name="yetkili"
                              value={formData.yetkili}
                              onChange={handleChange}
                            />
                          </Form.Group>

                          <Form.Group
                            className="mb-3"
                            as={Col}
                            controlId="formGridDegerlendirme"
                          >
                            <Form.Label>Firma Değerlendirmesi</Form.Label>
                            <Form.Control
                              as="select"
                              name="firmaDegerlendirmesi"
                              value={formData.firmaDegerlendirmesi}
                              onChange={handleChange}
                            >
                              <option value={1}>1</option>
                              <option value={2}>2</option>
                              <option value={3}>3</option>
                              <option value={4}>4</option>
                              <option value={5}>5</option>
                            </Form.Control>
                          </Form.Group>
                          <Form.Group
                            className="mb-3"
                            as={Col}
                            controlId="formGridCalisankisi"
                          >
                            <Form.Label>Çalışan Sayısı</Form.Label>
                            <Form.Control
                              placeholder="Çalışan sayısı giriniz"
                              name="calisankisi"
                              value={formData.calisankisi}
                              onChange={handleChange}
                            />
                          </Form.Group>
                          <Form.Group
                            className="mb-3"
                            as={Col}
                            controlId="formGridStajyer"
                          >
                            <Form.Label>Stajyer Sayısı</Form.Label>
                            <Form.Control
                              placeholder="Stajyer sayısı giriniz"
                              name="stajyer"
                              value={formData.stajyer}
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
                    <th>Firma id</th>
                    <th>Firma Adı</th>
                    <th>Firma Adresi</th>
                    <th>Firma Maili</th>
                    <th>Firma Telefonu</th>
                    <th>Yetkili Adı ve Soyadı</th>
                    <th>Firma Notu</th>

                    <th>İşlemler</th>
                  </tr>
                </thead>
                <tbody>
                  {firmas?.length > 0 ? (
                    firmas.map((firma, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{firma.id}</td>
                        <td>{firma.firma}</td>
                        <td>{firma.firmaAdresi}</td>
                        <td>{firma.firmaMaili}</td>
                        <td>{firma.firmaTelefonu}</td>
                        <td>{firma.yetkili}</td>
                        <td>{firma.firmaDegerlendirmesi}</td>

                        <td>
                          <Button
                            variant="danger"
                            onClick={() => handleDelete(firma.id)}
                          >
                            Sil
                          </Button>
                          <Button
                            variant="primary"
                            onClick={() => handleEdit(firma.id)}
                          >
                            Düzenle
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="11">Veri bulunmamaktadır</td>
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

export default Firma;
