import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import { Container, ListGroup, Nav, Navbar, Offcanvas } from "react-bootstrap";
import { MdRateReview } from "react-icons/md";
import { RiMenu3Line, RiShoppingCartLine } from "react-icons/ri";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [isClicked, setIsClicked] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Navbar
        bg="light"
        variant="light"
        className="border-bottom shadow-sm sticky-top"
      >
        <Container>
          <Link className="navbar-brand fw-bold" to="/dashboard">
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
                  <Link className="text-decoration-none text-secondary">
                    <RiShoppingCartLine size={20} className="me-2 inline" />{" "}
                    Make Admin
                  </Link>
                </ListGroup.Item>
                <ListGroup.Item className="border-bottom border-0 text-center">
                  <Link className="text-decoration-none text-secondary">
                    <MdRateReview size={20} className="me-2 inline" /> Reviews
                  </Link>
                </ListGroup.Item>
              </ListGroup>
            </Offcanvas.Body>
          </Offcanvas>
        </>
      </Navbar>
    </>
  );
};

export default Dashboard;
