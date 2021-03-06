import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { Col, Container, FormControl, InputGroup, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import "./Footer.css";
const Footer = () => {
  return (
    <section className="footer">
      <Container>
        <Row className="mb-5">
          <Col xs={12} md={3} lg={3}>
            <div className="brand">
              <h4>Hero Rider</h4>
              <ul>
                <li>Location: 35 West Dental Street</li>
                <li>Phone: +088 123 654 987</li>
                <li>Email: info@rola.com</li>
              </ul>
              <ul className="footer-social">
                <li>
                  <i className="fab fa-facebook"></i>
                </li>
                <li>
                  <i className="fab fa-twitter"></i>
                </li>
                <li>
                  <i className="fab fa-linkedin-in"></i>
                </li>
                <li>
                  <i className="fab fa-instagram"></i>
                </li>
              </ul>
            </div>
          </Col>
          <Col xs={12} md={3} lg={3}>
            <div className="useful-links">
              <h4>Useful Links</h4>
              <ul>
                <li>
                  <Link to="">About us</Link>
                </li>
                <li>
                  <Link to="">Our Services</Link>
                </li>
              </ul>
            </div>
          </Col>
          <Col xs={12} md={3} lg={3}>
            <div className="useful-links">
              <h4>Our Services</h4>
              <ul>
                <li>Careers</li>
                <li>General info</li>
                <li>Al about</li>
              </ul>
            </div>
          </Col>
          <Col xs={12} md={3} lg={3}>
            <div className="useful-links">
              <h4>Newsletter</h4>
              <p>
                Best solution for your it startup business consecteturadipiscing
                elit.
              </p>
              <InputGroup className="mb-3">
                <FormControl
                  placeholder="Email"
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                />
                <Button id="button-addon2">
                  <i className="fas fa-paper-plane p-3"></i>
                </Button>
              </InputGroup>
            </div>
          </Col>
        </Row>
      </Container>

      <Container>
        <Row className="mt-5">
          <Col xs={12} md={12} lg={12}>
            <div className="copyright">
              <p>Copyright ?? 2021 Rola is Proudly Created by HiBootstrap</p>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Footer;
