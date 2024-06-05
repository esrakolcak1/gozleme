import React, { useEffect, useState } from "react";
import { Row, Col, Card, Table, Form, Button, Alert } from "react-bootstrap";
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

const Ziyaret = () => {
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
    await getDocs(collection(firestore, "ziyarets")).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setZiyarets(newData);
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

  const getHamiData = async () => {
    await getDocs(collection(firestore, "hamis")).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setHamis(newData);
    });
  };

  const getStudentData = async () => {
    await getDocs(collection(firestore, "students")).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setStudents(newData);
    });
  };

  const getFirmaData = async () => {
    await getDocs(collection(firestore, "firmas")).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setFirmas(newData);
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

  const handleSave = async () => {
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

    if (editingIndex !== null) {
      const docRef = doc(firestore, "ziyarets", editingIndex);
      await updateDoc(docRef, {
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
    } else {
      await addDoc(collection(firestore, `ziyarets`), {
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
    }
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(firestore, "ziyarets", id));
    getZiyaretData();
  };

  const handleEdit = (id) => {
    const ziyaret = ziyarets.find((s) => s.id === id);
    setFormData(ziyaret);
    setEditingIndex(id);
    toggleZiyaretFormVisibility();
  };

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
                    <th>Ziyaret id</th>
                    <th>Öğretmen</th>
                    <th>Öğrenci No</th>
                    <th>Firma</th>
                    <th>Hami</th>
                    <th>İşlemler</th>
                  </tr>
                </thead>
                <tbody>
                  {ziyarets.length > 0 ? (
                    ziyarets.map((ziyaret, index) => (
                      <tr key={index}>
                        <th>{index + 1}</th>
                        <td>{ziyaret.id}</td>
                        <td>{teachers[ziyaret.teacher]?.teacher}</td>
                        <td>{students[ziyaret.number]?.name}</td>
                        <td>{firmas[ziyaret.firma]?.firma}</td>
                        <td>{hamis[ziyaret.hami]?.name}</td>
                        <td>
                          <Button
                            variant="danger"
                            onClick={() => handleDelete(ziyaret.id)}
                          >
                            Sil
                          </Button>
                          <Button
                            variant="info"
                            onClick={() => handleEdit(ziyaret.id)}
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
                      <Button variant="primary" onClick={handleSave}>
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
                  {ziyarets?.length > 0 ? (
                    ziyarets.map((ziyaret, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{ziyaret.ziyaretturu}</td>
                        <td>{ziyaret.ziyaretgorusu}</td>
                        <td>{ziyaret.resim}</td>
                        <td>
                          <Button
                            variant="danger"
                            onClick={() => handleDelete(ziyaret.id)}
                          >
                            Sil
                          </Button>
                          <Button
                            variant="primary"
                            onClick={() => handleEdit(ziyaret.id)}
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
                      <Button variant="primary" onClick={handleSave}>
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
                  {ziyarets?.length > 0 ? (
                    ziyarets.map((ziyaret, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{ziyaret.not}</td>
                        <td>{ziyaret.tarih}</td>
                        <td>
                          <Button
                            variant="danger"
                            onClick={() => handleDelete(ziyaret.id)}
                          >
                            Sil
                          </Button>
                          <Button
                            variant="primary"
                            onClick={() => handleEdit(ziyaret.id)}
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

export default Ziyaret;
