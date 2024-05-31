import axios from "axios";
import React, { useEffect, useState } from "react";
import { Row, Col, Card, Table, Button, Form } from "react-bootstrap";
import { db } from "../../../firebase/firebaseConfig";
import { uid } from "uid";
import { set, ref, remove } from "firebase/database";

const BasicPagination = () => {
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

  useEffect(() => {
    getHamiData();
    getFirmaData();
  }, []);

  const toggleHamiFormVisibility = () => {
    setShowHamiForm(!showHamiForm);
    setError(null); // Form visibility değiştiğinde hatayı sıfırla
  };
  const handleChange = (e) => {
    if (e.target.name === "telefon") {
      // Sadece sayısal değerleri kabul et
      const phoneNumber = e.target.value.replace(/\D/g, "");
      // En fazla 11 hane olacak şekilde sınırla
      if (phoneNumber.length >= 11) return;
      setFormData({ ...formData, [e.target.name]: phoneNumber });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    setError(null); // Değişiklik yapıldığında hatayı sıfırla
    if (e.target.name === "number") {
      const numberValue = e.target.value;
      if (!/^\d*$/.test(numberValue)) {
        setError("Öğrenci numarası sadece rakam olmalıdır");
        return;
      }
    }
  };

  const handleSave = () => {
    // Boş alan kontrolü
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

    set(ref(db, `hamis/${uuid}`), {
      uuid,

      name: formData.name,
      firma: formData.firma,
      telefon: formData.telefon,
      degerlendirmeGorusu: formData.degerlendirmeGorusu,
    });
    if (editingIndex !== null) {
      remove(ref(db, `hamis/${editingIndex}`));
    }

    setFormData({
      name: "",
      firma: "",
      telefon: "",
      degerlendirmeGorusu: "",
    });

    toggleHamiFormVisibility();
    getHamiData();
  };

  const handleDelete = (id) => {
    remove(ref(db, `hamis/${id}`));
    getHamiData();
  };

  const handleEdit = (key) => {
    const hami = hamis[key];
    setFormData(hami);
    setEditingIndex(key);
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
                            <Form.Label>Firma </Form.Label>
                            <Form.Control
                              as="select" // select elementine dönüştürüldü
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
                        <Row gy={3}>
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
                  {keys?.length > 0 ? (
                    keys.map((key, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{hamis[key]?.uuid}</td>
                        <td>{hamis[key]?.name}</td>
                        <td>{hamis[key]?.telefon}</td>
                        <td>{firmas[hamis[key]?.firma]?.firma}</td>
                        <td>{hamis[key]?.degerlendirmeGorusu}</td>

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

export default BasicPagination;
