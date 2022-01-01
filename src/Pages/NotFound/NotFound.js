import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { BsArrowLeft } from "react-icons/bs";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <section className="page-not">
      <Container>
        <Row className="py-4">
          <Col xs={12} lg={12} md={12}>
            <div className="back-btn">
              <button
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 1 }}
                onClick={() => window.history.back()}
              >
                {" "}
                <BsArrowLeft size={20} className="me-2" /> Back
              </button>
            </div>
          </Col>
          <Col xs={12} lg={12} md={12}>
            <div className="not-found-image d-flex justify-content-center align-items-center flex-column">
              <div>
                <img
                  src="https://i.postimg.cc/KYjxp2Yt/404-Error-bro.png"
                  alt=""
                  width="500px"
                />
              </div>
              <Link className="text-decoration-none" to="/profile">
                <button
                  className="d-block btn btn-outline-dark m-auto py-2 px-5"
                  onClick={() => window.scrollTo(0, 0)}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 1 }}
                >
                  Home
                </button>
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default NotFound;
