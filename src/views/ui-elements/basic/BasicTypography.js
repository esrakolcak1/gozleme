import React, { useState } from 'react';

import { Row, Col, Card, Table, Form } from 'react-bootstrap';

const BasicTypography = () => {
  const [supportedSelect, setSupportedSelect] = useState(0);
  const [supportedFile, setSupportedFile] = useState(0);

  const supportedSelectHandler = (event) => {
    setSupportedSelect(parseInt(event.target.value));
  };
  const supportedFileHandler = (event) => {
    setSupportedFile(!!event.target.value);
  };

  return (
    <React.Fragment>
      <Row>
        <Col>
          <Card>
            <Card.Header>
              <Card.Title as="h5">ZİYARET</Card.Title>
            </Card.Header>
            <Card.Body>
              <Table responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Öğrenci no </th>
                    <th>Öğretmen id</th>
                    <th>Hami id </th>
                    <th>Ziyaret id</th>
                    <th> Firma id </th>
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

            <Card.Header>
              <Card.Title as="h5"></Card.Title>
            </Card.Header>
            <Card.Body>
              <Table responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Zİyaretin Türü</th>
                    <th>Ziyaret Görüşü</th>
                    <th>Resim</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="table-dark text-white">
                    <th scope="row">1</th>
                    <td>
                      {' '}
                      <Form.Control
                        as="select"
                        required
                        value={supportedSelect}
                        isInvalid={supportedSelect === 0}
                        isValid={supportedSelect !== 0}
                        onChange={(event) => supportedSelectHandler(event)}
                      >
                        <option value={0}>Ziyaretin türünü seçiniz</option>
                        <option value={1}>Yüzyüze</option>
                        <option value={2}>Telefon</option>
                      </Form.Control>
                      {supportedSelect ? '' : <div className="invalid-feedback">Boş bırakmayınız</div>}
                    </td>
                    <td>
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1"
                        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                      >
                        <Form.Control as="textarea" rows="2" />
                      </Form.Group>
                      {supportedFile ? '' : <div className="invalid-feedback">Boş bırakmayınız</div>}
                    </td>
                    <td>
                      <div className="custom-file mt-3">
                        <Form.Control
                          type="file"
                          className="custom-file-input"
                          id="validatedCustomFile"
                          required
                          isInvalid={!supportedFile}
                          isValid={supportedFile}
                          onChange={(event) => supportedFileHandler(event)}
                        />
                        {supportedFile ? '' : <div className="invalid-feedback">Boş bırakmayınız</div>}
                      </div>{' '}
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">2</th>
                    <td>.</td>
                    <td>.</td>
                    <td>.</td>
                  </tr>
                  <tr className="table-success">
                    <th scope="row">3</th>
                    <td>.</td>
                    <td>.</td>
                    <td>.</td>
                  </tr>
                  <tr>
                    <th scope="row">4</th>
                    <td>.</td>
                    <td>.</td>
                    <td>.</td>
                  </tr>
                  <tr className="table-warning">
                    <th scope="row">5</th>
                    <td>.</td>
                    <td>.</td>
                    <td>.</td>
                  </tr>
                  <tr>
                    <th scope="row">6</th>
                    <td>.</td>
                    <td>.</td>
                    <td>.</td>
                  </tr>
                  <tr className="table-danger">
                    <th scope="row">7</th>
                    <td>.</td>
                    <td>.</td>
                    <td>.</td>
                  </tr>
                  <tr>
                    <th scope="row">8</th>
                    <td>.</td>
                    <td>.</td>
                    <td>.</td>
                  </tr>
                  <tr className="table-info">
                    <th scope="row">9</th>
                    <td>.</td>
                    <td>.</td>
                    <td>.</td>
                  </tr>
                  <tr>
                    <th scope="row">10</th>
                    <td>.</td>
                    <td>.</td>
                    <td>.</td>
                  </tr>
                  <tr className="table-primary">
                    <th scope="row">11</th>
                    <td>.</td>
                    <td>.</td>
                    <td>.</td>
                  </tr>
                </tbody>
              </Table>
            </Card.Body>
            <Card.Body>
              <Table responsive>
                <thead>
                  <tr>
                    <th>#</th>

                    <th>Not</th>
                    <th>Tarih</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="table-dark text-white">
                    <th scope="row">1</th>
                    <td>
                      {' '}
                      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Control as="textarea" rows="1" />
                      </Form.Group>
                    </td>
                    <td>
                      {' '}
                      <Form.Control type="date" id="date" />
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">2</th>
                    <td>.</td>
                    <td>.</td>
                  </tr>
                  <tr className="table-success">
                    <th scope="row">3</th>
                    <td>.</td>
                    <td>.</td>
                  </tr>
                  <tr>
                    <th scope="row">4</th>
                    <td>.</td>
                    <td>.</td>
                  </tr>
                  <tr className="table-warning">
                    <th scope="row">5</th>
                    <td>.</td>
                    <td>.</td>
                  </tr>
                  <tr>
                    <th scope="row">6</th>
                    <td>.</td>
                    <td>.</td>
                  </tr>
                  <tr className="table-danger">
                    <th scope="row">7</th>
                    <td>.</td>
                    <td>.</td>
                  </tr>
                  <tr>
                    <th scope="row">8</th>
                    <td>.</td>
                    <td>.</td>
                  </tr>
                  <tr className="table-info">
                    <th scope="row">9</th>
                    <td>.</td>
                    <td>.</td>
                  </tr>
                  <tr>
                    <th scope="row">10</th>
                    <td>.</td>
                    <td>.</td>
                  </tr>
                  <tr className="table-primary">
                    <th scope="row">11</th>
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
export default BasicTypography;
