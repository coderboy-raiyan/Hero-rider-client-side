import React from "react";
import { Col, Container, FormControl, InputGroup, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";

const Admin = () => {
  const { register, handleSubmit, reset } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <section className="make-admin">
      <Container>
        <Row className="d-flex justify-content-center align-items-center vh-100">
          <Col xs={12} lg={6} md={6}>
            <form
              className="bg-white shadow p-4 rounded"
              onSubmit={handleSubmit(onSubmit)}
            >
              <Row>
                <Col xs={12} lg={12} md={12}>
                  <h3 className="text-center">Make an admin</h3>
                </Col>
                <Col xs={12} lg={12} md={12}>
                  <InputGroup className="mb-3 mt-4">
                    <FormControl
                      placeholder="Email"
                      required
                      {...register("email")}
                      type="email"
                      className="p-3 shadow border-2"
                    />
                  </InputGroup>
                </Col>
                <Col xs={12} lg={12} md={12}>
                  <button className="primary-btn block w-full rounded">
                    Submit
                  </button>
                </Col>
              </Row>
            </form>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Admin;
