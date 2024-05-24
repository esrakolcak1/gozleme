import React from 'react';
import { Row, Col, Card, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import avatar1 from '../../assets/images/user/avatar-1.jpg';
// import avatar2 from '../../assets/images/user/avatar-2.jpg';

import BarDiscreteChart from '../dashboard';
import PieBasicChart from '../dashboard';
import MultiBarChart from '../dashboard';

const dashSalesData = [
  { title: '2022 Stajyer Sayısı', amount: '$249.95', icon: 'icon-arrow-up text-c-green', value: 50, class: 'progress-c-theme' }, //50-36-10 yazan yerlere yuzdelik bilgileri yazicaz
  { title: '2023 Stajyer Sayısı', amount: '$2.942.32', icon: 'icon-arrow-down text-c-red', value: 36, class: 'progress-c-theme2' },
  { title: '2024 Stajyer Sayısı', amount: '$8.638.32', icon: 'icon-arrow-up text-c-green', value: 10, color: 'progress-c-theme' }
];

const users = [
  {
    name: 'Test',
    lastName: 'Test2',
    avatar: avatar1,
    subtitle: 'subtitleee',
    date: '20 mayis ',
    status: 'true'
  },
  {
    name: 'Test 2',
    lastName: 'Test2',
    avatar: avatar1,
    subtitle: 'subtitleee',
    date: '20 mayis ',
    status: 'true'
  }
];

const DashDefault = () => {
  return (
    <React.Fragment>
      <Row>
        {dashSalesData.map((data, index) => {
          return (
            <Col key={index} xl={6} xxl={4}>
              <Card>
                <Card.Body>
                  <h6 className="mb-4">{data.title}</h6>
                  <div className="row d-flex align-items-center">
                    <div className="col-9">
                      <h3 className="f-w-300 d-flex align-items-center m-b-0">
                        <i className={`feather ${data.icon} f-30 m-r-5`} /> sayı degerleri cekilecek
                      </h3>
                    </div>
                    <div className="col-3 text-end">
                      <p className="m-b-0">{data.value}%</p>
                    </div>
                  </div>
                  <div className="progress m-t-30" style={{ height: '7px' }}>
                    <div
                      className={`progress-bar ${data.class}`}
                      role="progressbar"
                      style={{ width: `${data.value}%` }}
                      aria-valuenow={data.value}
                      aria-valuemin="0"
                      aria-valuemax="100"
                    />
                  </div>
                </Card.Body>
              </Card>
            </Col>
          );
        })}

        <Col md={12} xl={12}>
          <Card className="Recent-Users">
            <Card.Header>
              <Card.Title as="h5">KULLANICI GİRİŞ BİLDİRİM </Card.Title>
            </Card.Header>
            <Card.Body className="px-0 py-2">
              <Table responsive hover className="recent-users">
                <tbody>
                  {users.map((user, i) => {
                    return (
                      <tr key={i} className="unread">
                        <td>
                          <img className="rounded-circle" style={{ width: '40px' }} src={user?.avatar} alt="activity-user" />
                        </td>
                        <td>
                          <h6 className="mb-1">
                            {user.name} + {user.lastName}
                          </h6>
                          <p className="m-0">{user.subtitle}</p>
                        </td>
                        <td>
                          <h6 className="text-muted">
                            <i className="fa fa-circle text-c-green f-10 m-r-15" />
                            {user.date}
                          </h6>
                        </td>
                        <td>
                          <Link to="#" className="label theme-bg2 text-white f-12">
                            Reddet
                          </Link>
                          <Link to="#" className="label theme-bg text-white f-12">
                            Onayla
                          </Link>
                        </td>
                      </tr>
                    );
                  })}

                  {/* <tr className="unread">
                    <td>
                      <img className="rounded-circle" style={{ width: '40px' }} src={avatar1} alt="activity-user" />
                    </td>
                    <td>
                      <h6 className="mb-1">ESRA KOLÇAK</h6>
                      <p className="m-0">En başarılı öğrenci</p>
                    </td>
                    <td>
                      <h6 className="text-muted">
                        <i className="fa fa-circle text-c-green f-10 m-r-15" />
                        20 Mayıs 12:56
                      </h6>
                    </td>
                    <td>
                      <Link to="#" className="label theme-bg2 text-white f-12">
                        Reddet
                      </Link>
                      <Link to="#" className="label theme-bg text-white f-12">
                        Onayla
                      </Link>
                    </td>
                  </tr> */}
                  {/* <tr className="unread">
                    <td>
                      <img className="rounded-circle" style={{ width: '40px' }} src={avatar1} alt="activity-user" />
                    </td>
                    <td>
                      <h6 className="mb-1">ELİF DEMİR</h6>
                      <p className="m-0">Başarılı öğrenci</p>
                    </td>
                    <td>
                      <h6 className="text-muted">
                        <i className="fa fa-circle text-c-red f-10 m-r-15" />
                        20 Mayıs 10:35
                      </h6>
                    </td>
                    <td>
                      <Link to="#" className="label theme-bg2 text-white f-12">
                        Reddet
                      </Link>
                      <Link to="#" className="label theme-bg text-white f-12">
                        Onayla
                      </Link>
                    </td>
                  </tr>
                  <tr className="unread">
                    <td>
                      <img className="rounded-circle" style={{ width: '40px' }} src={avatar2} alt="activity-user" />
                    </td>
                    <td>
                      <h6 className="mb-1">ARDA TOPÇU</h6>
                      <p className="m-0">Sınırdan geçen öğrenci</p>
                    </td>
                    <td>
                      <h6 className="text-muted">
                        <i className="fa fa-circle text-c-green f-10 m-r-15" />
                        19 Mayıs 17:38
                      </h6>
                    </td>
                    <td>
                      <Link to="#" className="label theme-bg2 text-white f-12">
                        Reddet
                      </Link>
                      <Link to="#" className="label theme-bg text-white f-12">
                        Onayla
                      </Link>
                    </td>
                  </tr>
                  <tr className="unread">
                    <td>
                      <img className="rounded-circle" style={{ width: '40px' }} src={avatar2} alt="activity-user" />
                    </td>
                    <td>
                      <h6 className="mb-1">UMUT YAŞAR SARİYERLİOĞLU</h6>
                      <p className="m-0">Gelecek vaad ediyor</p>
                    </td>
                    <td>
                      <h6 className="text-muted f-w-300">
                        <i className="fa fa-circle text-c-red f-10 m-r-15" />
                        18 Mayıs 12:56
                      </h6>
                    </td>
                    <td>
                      <Link to="#" className="label theme-bg2 text-white f-12">
                        Reddet
                      </Link>
                      <Link to="#" className="label theme-bg text-white f-12">
                        Onayla
                      </Link>
                    </td>
                  </tr>
                  <tr className="unread">
                    <td>
                      <img className="rounded-circle" style={{ width: '40px' }} src={avatar2} alt="activity-user" />
                    </td>
                    <td>
                      <h6 className="mb-1">EMİR YÜKSEKTEPE</h6>
                      <p className="m-0">Kürt Dernekleri kurucusu </p>
                    </td>
                    <td>
                      <h6 className="text-muted">
                        <i className="fa fa-circle text-c-green f-10 m-r-15" />
                        21 Nisan 12:56
                      </h6>
                    </td>
                    <td>
                      <Link to="#" className="label theme-bg2 text-white f-12">
                        Reddet
                      </Link>
                      <Link to="#" className="label theme-bg text-white f-12">
                        Onayla
                      </Link>
                    </td>
                  </tr> */}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} xl={4}>
          <Card>
            <Card.Header>
              <Card.Title as="h5">Şirket Puanlama </Card.Title>
            </Card.Header>
            <Card.Body>
              <div className="row align-items-center justify-content-center m-b-20">
                <div className="col-6">
                  <h2 className="f-w-300 d-flex align-items-center float-start m-0">
                    4.7 <i className="fa fa-star f-10 m-l-10 text-c-yellow" />
                  </h2>
                </div>
                <div className="col-6">
                  <h6 className="d-flex  align-items-center float-end m-0">
                    0.4 <i className="fa fa-caret-up text-c-green f-22 m-l-10" />
                  </h6>
                </div>
              </div>

              <div className="row">
                <div className="col-xl-12">
                  <h6 className="align-items-center float-start">
                    <i className="fa fa-star f-10 m-r-10 text-c-yellow" />5
                  </h6>
                  <h6 className="align-items-center float-end">384</h6>
                  <div className="progress m-t-30 m-b-20" style={{ height: '6px' }}>
                    <div
                      className="progress-bar progress-c-theme"
                      role="progressbar"
                      style={{ width: '70%' }}
                      aria-valuenow="70"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    />
                  </div>
                </div>

                <div className="col-xl-12">
                  <h6 className="align-items-center float-start">
                    <i className="fa fa-star f-10 m-r-10 text-c-yellow" />4
                  </h6>
                  <h6 className="align-items-center float-end">145</h6>
                  <div className="progress m-t-30  m-b-20" style={{ height: '6px' }}>
                    <div
                      className="progress-bar progress-c-theme"
                      role="progressbar"
                      style={{ width: '35%' }}
                      aria-valuenow="35"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    />
                  </div>
                </div>

                <div className="col-xl-12">
                  <h6 className="align-items-center float-start">
                    <i className="fa fa-star f-10 m-r-10 text-c-yellow" />3
                  </h6>
                  <h6 className="align-items-center float-end">24</h6>
                  <div className="progress m-t-30  m-b-20" style={{ height: '6px' }}>
                    <div
                      className="progress-bar progress-c-theme"
                      role="progressbar"
                      style={{ width: '25%' }}
                      aria-valuenow="25"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    />
                  </div>
                </div>

                <div className="col-xl-12">
                  <h6 className="align-items-center float-start">
                    <i className="fa fa-star f-10 m-r-10 text-c-yellow" />2
                  </h6>
                  <h6 className="align-items-center float-end">1</h6>
                  <div className="progress m-t-30  m-b-20" style={{ height: '6px' }}>
                    <div
                      className="progress-bar progress-c-theme"
                      role="progressbar"
                      style={{ width: '10%' }}
                      aria-valuenow="10"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    />
                  </div>
                </div>
                <div className="col-xl-12">
                  <h6 className="align-items-center float-start">
                    <i className="fa fa-star f-10 m-r-10 text-c-yellow" />1
                  </h6>
                  <h6 className="align-items-center float-end">0</h6>
                  <div className="progress m-t-30  m-b-5" style={{ height: '6px' }}>
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{ width: '0%' }}
                      aria-valuenow="0"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    />
                  </div>
                </div>
              </div>
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
            </Card.Body>
          </Card>
        </Col>

        {/* <Row>
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
        </Row> */}

        <Col md={6} xl={8}>
          <Card className="user-list">
            <Card.Header>
              <Card.Title as="h5">KULLANICI LİSTESİ </Card.Title>
            </Card.Header>
            <Card.Body className="p-0">
              <Table responsive hover>
                <thead>
                  <tr>
                    <th>Kullanıcı</th>
                    <th>Kullanıcı Adı</th>
                    <th>Bölüm</th>
                    <th>Tarih</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, i) => {
                    return (
                      <tr key={i}>
                        <td>
                          <img className="rounded-circle" style={{ width: '40px' }} src={user?.avatar} alt="activity-user" />
                        </td>
                        <td>
                          <h6 className="mb-1">
                            {user.name} + {user.lastName}{' '}
                          </h6>
                          <p className="m-0">
                            <span className="text-c-green"> {user.subtitle}</span>
                          </p>
                        </td>

                        <td>
                          <h6 className="m-0">{user.subtitle}</h6>
                        </td>
                        <td>
                          <h6 className="m-0">{user.subtitle}</h6>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default DashDefault;
