import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';

import BarDiscreteChart from './chart/BarDiscreteChart';

import PieBasicChart from './chart/PieBasicChart';
import MultiBarChart from './chart/MultiBarChart';

const Nvd3Chart = () => {
  return (
    <React.Fragment>
      <Row>
        <Col md={6}>
          <Card>
            <Card.Header>
              <Card.Title as="h5">Pie Basic Chart</Card.Title>
            </Card.Header>
            <Card.Body className="text-center">
              <PieBasicChart />
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <Card.Header>
              <Card.Title as="h5">Discrete Bar Chart</Card.Title>
            </Card.Header>
            <Card.Body>
              <BarDiscreteChart />
            </Card.Body>
          </Card>
        </Col>
        <Col sm={12}>
          <Card>
            <Card.Header>
              <Card.Title as="h5">Stacked/Grouped Multi-Bar Chart</Card.Title>
            </Card.Header>
            <Card.Body>
              <MultiBarChart />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default Nvd3Chart;
