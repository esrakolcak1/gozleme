import React, { useEffect, useState } from "react";
import { Table, Row, Col, Card } from "react-bootstrap";
import { firestore } from "../../firebase/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

import EklentiTablosu from "../charts/nvd3-chart/Tablo/EklentiTablosu";
import BolumlerTablosu from "../charts/nvd3-chart/Tablo/BolumlerTablosu";
import CalisanStajyer from "../charts/nvd3-chart/Tablo/CalisanStajyer";

const Anasayfa = () => {
  const [users, setUsers] = useState([]);
  const fetchUsers = async () => {
    try {
      const querySnapshot = await getDocs(collection(firestore, "user"));
      const fetchedUsers = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(fetchedUsers);
      console.log("fetchedUsers:", users); // Verileri konsola yazdır
    } catch (error) {
      console.error("Firestore verileri alınırken hata oluştu:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <React.Fragment>
      <Row>
        <Col sm={12}>
          <Card>
            <Card.Header>
              <Card.Title as="h5">Kullanıcı Tablosu</Card.Title>
            </Card.Header>
            <Card.Body>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Mail</th>
                    <th>Kayıt Tarihi</th>
                    <th>Son Giriş Tarihi</th>
                    <th>UUID</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr key={user.id}>
                      <td>{index + 1}</td>
                      <td>{user.mail}</td>
                      <td>{user.kayitTarihi}</td>
                      <td>{user.sonGirisTarihi}</td>
                      <td>{user.uuid}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <Card.Header>
              <Card.Title as="h5">Bölümler Tablosu</Card.Title>
            </Card.Header>
            <Card.Body className="text-center">
              <BolumlerTablosu />
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <Card.Header>
              <Card.Title as="h5">Eklenti Tablosu</Card.Title>
            </Card.Header>
            <Card.Body>
              <EklentiTablosu />
            </Card.Body>
          </Card>
        </Col>
        <Col sm={12}>
          <Card>
            <Card.Header>
              <Card.Title as="h5">Çalısan ve Stajyer Tablosu</Card.Title>
            </Card.Header>
            <Card.Body>
              <CalisanStajyer />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default Anasayfa;
