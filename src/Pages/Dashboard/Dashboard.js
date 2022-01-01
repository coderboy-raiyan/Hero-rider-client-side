import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import {
  Col,
  Container,
  ListGroup,
  Nav,
  Navbar,
  Offcanvas,
  Row,
} from "react-bootstrap";
import { RiMenu3Line, RiShoppingCartLine } from "react-icons/ri";
import { Link, Switch, useRouteMatch } from "react-router-dom";
import Admin from "./Admin/Admin";
import PrivateDashBoard from "./PrivateDashboard/PrivateDashBoard";
import Users from "./Users/Users";

const Dashboard = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  let { path, url } = useRouteMatch();
  const handleShow = () => setShow(true);
  return (
    <>
      <Navbar
        bg="light"
        variant="light"
        className="border-bottom shadow-sm sticky-top"
      >
        <Container>
          <Link className="navbar-brand fw-bold" to={`${url}`}>
            Dash Board
          </Link>
          <Nav className="ms-auto p-2">
            <li className="nav-item" onClick={handleShow}>
              <button className="nav-item btn btn-transparent">
                <RiMenu3Line size={30} />
              </button>
            </li>
          </Nav>
        </Container>

        <>
          <Offcanvas show={show} onHide={handleClose}>
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>All Menus</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body className="p-0">
              <ListGroup>
                <ListGroup.Item className="border-bottom border-0 text-center">
                  <Link
                    to={`${url}/users`}
                    className="text-decoration-none text-secondary"
                    onClick={() => handleClose()}
                  >
                    <RiShoppingCartLine size={20} className="me-2 inline" /> All
                    Users
                  </Link>
                </ListGroup.Item>
                <ListGroup.Item className="border-bottom border-0 text-center">
                  <Link
                    to={`${url}/admin`}
                    onClick={() => handleClose()}
                    className="text-decoration-none text-secondary"
                  >
                    <RiShoppingCartLine size={20} className="me-2 inline" />{" "}
                    Make Admin
                  </Link>
                </ListGroup.Item>
              </ListGroup>
            </Offcanvas.Body>
          </Offcanvas>
        </>
      </Navbar>

      <section>
        <Container>
          <Row>
            <Col xs={12} md={12} lg={12}>
              <Switch>
                <PrivateDashBoard exact path={path}>
                  <Users />
                </PrivateDashBoard>
                <PrivateDashBoard path={`${path}/users`}>
                  <Users />
                </PrivateDashBoard>
                <PrivateDashBoard path={`${path}/admin`}>
                  <Admin />
                </PrivateDashBoard>
              </Switch>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Dashboard;
