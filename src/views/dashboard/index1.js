import React from "react";
import { Row, Col, Card, Table } from "react-bootstrap";
import { Link } from "react-router-dom";

import avatar1 from "../../assets/images/user/avatar-1.jpg";
import avatar2 from "../../assets/images/user/avatar-2.jpg";
import avatar3 from "../../assets/images/user/avatar-3.jpg";

import BarDiscreteChart from "../charts/nvd3-chart/chart/BarDiscreteChart";
import PieBasicChart from "../charts/nvd3-chart/chart/PieBasicChart";
import MultiBarChart from "../charts/nvd3-chart/chart/MultiBarChart";

const users = [
  {
    name: "Test",
    lastName: "Test2",
    avatar: avatar1,
    subtitle: "subtitleee",
    date: "20 Mayis",
    status: "true",
  },
  {
    name: "Test 2",
    lastName: "Test2",
    avatar: avatar1,
    subtitle: "subtitleee",
    date: "20 Mayis",
    status: "true",
  },
];

const dashSalesData = [
  //   {
  //     title: "",
  //     icon: "feather-trending-up",
  //     value: 75,
  //     class: "bg-c-blue",
  //   },
  //   {
  //     title: "Revenue",
  //     icon: "feather-dollar-sign",
  //     value: 50,
  //     class: "bg-c-green",
  //   },
  //   {
  //     title: "Growth",
  //     icon: "feather-bar-chart-2",
  //     value: 30,
  //     class: "bg-c-yellow",
  //   },
];

const DashDefault = () => {
  return (
    <React.Fragment>
      <Row>
        {dashSalesData.map((data, index) => (
          <Col key={index} xl={6} xxl={4}>
            <Card>
              <Card.Body>
                <h6 className="mb-4">{data.title}</h6>
                <div className="row d-flex align-items-center">
                  <div className="col-9">
                    <h3 className="f-w-300 d-flex align-items-center m-b-0">
                      <i className={`feather ${data.icon} f-30 m-r-5`} />
                      $249.95
                    </h3>
                  </div>
                  <div className="col-3 text-end">
                    <p className="m-b-0">{data.value}%</p>
                  </div>
                </div>
                <div className="progress m-t-30" style={{ height: "7px" }}>
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
        ))}

        {/* <Col md={12} xl={12}>
          <Card className="Recent-Users">
            <Card.Header>
              <Card.Title as="h5">Kullanıcı Giriş Bildirim</Card.Title>
            </Card.Header>
            <Card.Body className="px-0 py-2">
              <Table responsive hover className="recent-users">
                <tbody>
                  {users.map((user, i) => (
                    <tr key={i} className="unread">
                      <td>
                        <img
                          className="rounded-circle"
                          style={{ width: "40px" }}
                          src={user?.avatar}
                          alt="activity-user"
                        />
                      </td>
                      <td>
                        <h6 className="mb-1">
                          {user.name} {user.lastName}
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
                        <Link
                          to="#"
                          className="label theme-bg2 text-white f-12"
                        >
                          Reddet
                        </Link>
                        <Link to="#" className="label theme-bg text-white f-12">
                          Onayla
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col> */}

        <Col md={6} xl={4}>
          <Card>
            <Card.Header>
              <Card.Title as="h5">Rating</Card.Title>
            </Card.Header>
            <Card.Body>
              <div className="row align-items-center justify-content-center m-b-20">
                <div className="col-6">
                  <h2 className="f-w-300 d-flex align-items-center float-start m-0">
                    4.7 <i className="fa fa-star f-10 m-l-10 text-c-yellow" />
                  </h2>
                </div>
                <div className="col-6">
                  <h6 className="d-flex align-items-center float-end m-0">
                    0.4{" "}
                    <i className="fa fa-caret-up text-c-green f-22 m-l-10" />
                  </h6>
                </div>
              </div>
              <div className="row">
                <div className="col-xl-12">
                  <h6 className="align-items-center float-start">
                    <i className="fa fa-star f-10 m-r-10 text-c-yellow" />5
                  </h6>
                  <h6 className="align-items-center float-end">384</h6>
                  <div
                    className="progress m-t-30 m-b-20"
                    style={{ height: "6px" }}
                  >
                    <div
                      className="progress-bar progress-c-theme"
                      role="progressbar"
                      style={{ width: "70%" }}
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
                  <div
                    className="progress m-t-30 m-b-20"
                    style={{ height: "6px" }}
                  >
                    <div
                      className="progress-bar progress-c-theme"
                      role="progressbar"
                      style={{ width: "35%" }}
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
                  <div
                    className="progress m-t-30 m-b-20"
                    style={{ height: "6px" }}
                  >
                    <div
                      className="progress-bar progress-c-theme"
                      role="progressbar"
                      style={{ width: "25%" }}
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
                  <div
                    className="progress m-t-30 m-b-20"
                    style={{ height: "6px" }}
                  >
                    <div
                      className="progress-bar progress-c-theme"
                      role="progressbar"
                      style={{ width: "10%" }}
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
                  <div
                    className="progress m-t-30 m-b-5"
                    style={{ height: "6px" }}
                  >
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{ width: "0%" }}
                      aria-valuenow="0"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    />
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} xl={8}>
          <Card className="user-list">
            <Card.Header>
              <Card.Title as="h5">User Project List</Card.Title>
            </Card.Header>
            <Card.Body className="p-0">
              <Table responsive hover>
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Project</th>
                    <th>Completed</th>
                    <th>Status</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <img
                        className="rounded-circle"
                        style={{ width: "40px" }}
                        src={avatar1}
                        alt="activity-user"
                      />
                    </td>
                    <td>
                      <h6 className="mb-1">Social Media App</h6>
                      <p className="m-0">
                        Assigned to
                        <span className="text-c-green"> Tristan Madsen</span>
                      </p>
                    </td>
                    <td>
                      <span className="pie_1">326,134</span>
                    </td>
                    <td>
                      <h6 className="m-0">68%</h6>
                    </td>
                    <td>
                      <h6 className="m-0">October 26, 2017</h6>
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <img
                        className="rounded-circle"
                        style={{ width: "40px" }}
                        src={avatar2}
                        alt="activity-user"
                      />
                    </td>
                    <td>
                      <h6 className="mb-1">Newspaper Wordpress Web</h6>
                      <p className="m-0">
                        Assigned to
                        <span className="text-c-green"> Marcus Poulsen</span>
                      </p>
                    </td>
                    <td>
                      <span className="pie_2">110,134</span>
                    </td>
                    <td>
                      <h6 className="m-0">46%</h6>
                    </td>
                    <td>
                      <h6 className="m-0">September 4, 2017</h6>
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <img
                        className="rounded-circle"
                        style={{ width: "40px" }}
                        src={avatar3}
                        alt="activity-user"
                      />
                    </td>
                    <td>
                      <h6 className="mb-1">Dashboard UI Kit Design</h6>
                      <p className="m-0">
                        Assigned to
                        <span className="text-c-green"> Felix Johansen</span>
                      </p>
                    </td>
                    <td>
                      <span className="pie_3">226,134</span>
                    </td>
                    <td>
                      <h6 className="m-0">31%</h6>
                    </td>
                    <td>
                      <h6 className="m-0">November 14, 2017</h6>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <img
                        className="rounded-circle"
                        style={{ width: "40px" }}
                        src={avatar1}
                        alt="activity-user"
                      />
                    </td>
                    <td>
                      <h6 className="mb-1">Social Media App</h6>
                      <p className="m-0">
                        Assigned to
                        <span className="text-c-green"> Tristan Madsen</span>
                      </p>
                    </td>
                    <td>
                      <span className="pie_4">500,134</span>
                    </td>
                    <td>
                      <h6 className="m-0">85%</h6>
                    </td>
                    <td>
                      <h6 className="m-0">December 14, 2017</h6>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>

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

export default DashDefault;
