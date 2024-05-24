import React from 'react';
import { Row, Col, Card, Table } from 'react-bootstrap';

const BasicBreadcrumbPagination = () => {
  return (
    <React.Fragment>
      <Row>
        <Col>
          <Card>
            <Card.Header>
              <Card.Title as="h5">HAMİ</Card.Title>
            </Card.Header>
            <Card.Body>
              <Table responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Hami id</th>
                    <th>İsim - Soyisim</th>
                    <th>Telefon</th>
                    <th>Firma id</th>
                    <th>Hami Değerlendirme</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="table-dark text-white">
                    <th scope="row">1</th>
                    <td>.</td>
                    <td>.</td>
                    <td>.</td>
                    <td>.</td>
                    <td>.</td>
                  </tr>
                  <tr>
                    <th scope="row">2</th>
                    <td>.</td>
                    <td>.</td>
                    <td>.</td>
                    <td>.</td>
                    <td>.</td>
                  </tr>
                  <tr className="table-success">
                    <th scope="row">3</th>
                    <td>.</td>
                    <td>.</td>
                    <td>.</td>
                    <td>.</td>
                    <td>.</td>
                  </tr>
                  <tr>
                    <th scope="row">4</th>
                    <td>.</td>
                    <td>.</td>
                    <td>.</td>
                    <td>.</td>
                    <td>.</td>
                  </tr>
                  <tr className="table-warning">
                    <th scope="row">5</th>
                    <td>.</td>
                    <td>.</td>
                    <td>.</td>
                    <td>.</td>
                    <td>.</td>
                  </tr>
                  <tr>
                    <th scope="row">6</th>
                    <td>.</td>
                    <td>.</td>
                    <td>.</td>
                    <td>.</td>
                    <td>.</td>
                  </tr>
                  <tr className="table-danger">
                    <th scope="row">7</th>
                    <td>.</td>
                    <td>.</td>
                    <td>.</td>
                    <td>.</td>
                    <td>.</td>
                  </tr>
                  <tr>
                    <th scope="row">8</th>
                    <td>.</td>
                    <td>.</td>
                    <td>.</td>
                    <td>.</td>
                    <td>.</td>
                  </tr>
                  <tr className="table-info">
                    <th scope="row">9</th>
                    <td>.</td>
                    <td>.</td>
                    <td>.</td>
                    <td>.</td>
                    <td>.</td>
                  </tr>
                  <tr>
                    <th scope="row">10</th>
                    <td>.</td>
                    <td>.</td>
                    <td>.</td>
                    <td>.</td>
                    <td>.</td>
                  </tr>
                  <tr className="table-primary">
                    <th scope="row">11</th>
                    <td>.</td>
                    <td>.</td>
                    <td>.</td>
                    <td>.</td>
                    <td>.</td>
                  </tr>
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default BasicBreadcrumbPagination;
