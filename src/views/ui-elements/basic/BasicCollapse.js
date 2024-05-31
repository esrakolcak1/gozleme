import axios from "axios";
import React, { useEffect, useState } from "react";
import { Row, Col, Card, Table, Form, Button, Alert } from "react-bootstrap";
import { db } from "../../../firebase/firebaseConfig";
import { uid } from "uid";
import { set, ref, remove } from "firebase/database";

const BasicCollapse = () => {
  const [showFirmaForm, setShowFirmaForm] = useState(false);
  const [formData, setFormData] = useState({
    firma: "",
    firmaAdresi: "",
    firmaMaili: "",
    firmaTelefonu: "",
    yetkili: "",
    firmaDegerlendirmesi: 1,
  });
  const [firmas, setFirmas] = useState({});
  const [editingIndex, setEditingIndex] = useState(null);
  const [error, setError] = useState(null);

  const getFirmaData = async () => {
    await axios
      .get("https://gozleme-cc975-default-rtdb.firebaseio.com/firmas.json")
      .then((response) => {
        setFirmas(response?.data || {});
      });
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
    }
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(null); // Değişiklik yapıldığında hatayı sıfırla
  };

  const handleSave = () => {
    // Boş alan kontrolü
    if (
      !formData.firma ||
      !formData.firmaAdresi ||
      !formData.firmaMaili ||
      !formData.firmaTelefonu ||
      !formData.yetkili
    ) {
      setError("Lütfen tüm alanları doldurun");
      return;
    }

    const uuid = editingIndex !== null ? editingIndex : uid();

    set(ref(db, `firmas/${uuid}`), {
      uuid,
      firma: formData.firma,
      firmaAdresi: formData.firmaAdresi,
      firmaMaili: formData.firmaMaili,
      firmaTelefonu: formData.firmaTelefonu,
      yetkili: formData.yetkili,
      firmaDegerlendirmesi: formData.firmaDegerlendirmesi,
    });

    if (editingIndex !== null) {
      remove(ref(db, `firmas/${editingIndex}`));
    }

    setFormData({
      firma: "",
      firmaAdresi: "",
      firmaMaili: "",
      firmaTelefonu: "",
      yetkili: "",
      firmaDegerlendirmesi: 1,
    });

    setEditingIndex(null);
    toggleFirmaFormVisibility();
    getFirmaData();
  };

  const handleDelete = (id) => {
    remove(ref(db, `firmas/${id}`));
    getFirmaData();
  };

  const handleEdit = (key) => {
    const firma = firmas[key];
    setFormData(firma);
    setEditingIndex(key);
    toggleFirmaFormVisibility();
  };

  const keys = firmas != null ? Object.keys(firmas) : [];

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
                    <th>Firma Değerlendirmesi</th>
                    <th>İşlemler</th>
                  </tr>
                </thead>
                <tbody>
                  {keys?.length > 0 ? (
                    keys.map((key, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{firmas[key]?.uuid}</td>
                        <td>{firmas[key]?.firma}</td>
                        <td>{firmas[key]?.firmaAdresi}</td>
                        <td>{firmas[key]?.firmaMaili}</td>
                        <td>{firmas[key]?.firmaTelefonu}</td>
                        <td>{firmas[key]?.yetkili}</td>
                        <td>{firmas[key]?.firmaDegerlendirmesi}</td>
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

export default BasicCollapse;
