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
        <Col md={6} xl={12}>
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
