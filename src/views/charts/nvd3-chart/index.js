import React from "react";
import { Row, Col, Card } from "react-bootstrap";

import EklentiTablosu from "./Tablo/EklentiTablosu";

import BolumlerTablosu from "./Tablo/BolumlerTablosu";
import CalisanStajyer from "./Tablo/CalisanStajyer";

const Nvd3Chart = () => {
  return (
    <React.Fragment>
      <Row>
        <Col md={6}>
          <Card>
            <Card.Header>
              <Card.Title as="h5"> Bölümler Tablosu</Card.Title>
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

export default Nvd3Chart;
