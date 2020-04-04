import React from 'react';
import {Button, Container, Form, Row, Col, Alert} from 'react-bootstrap';
import authService from '../../service/AuthService';
import {withRouter} from 'react-router-dom';
import {SUCCESSFUL_LOG_IN} from '../../constants/messages';
import * as yup from 'yup';
import {Formik} from 'formik';

const schema = yup.object({
  username: yup.string().required(),
  password: yup.string().required(),
});

const LogIn = (props) => {
  const handleSubmit = (credentials, {setSubmitting, setStatus}) => {
    setStatus(null);

    // TODO: blinking message
    authService.login(credentials)
        .then(() => {
          props.history.push({
            pathname: '/',
            state: {
              message: SUCCESSFUL_LOG_IN,
            },
          });
        }).catch((err) => {
          setStatus({credentials: err.response.data.error});
          setSubmitting(false);
        });
  };

  return (
    <Formik
      validationSchema={schema}
      onSubmit={handleSubmit}
      initialValues={{
        username: '',
        password: '',
      }}
    >{({
        handleSubmit,
        handleChange,
        values,
        errors,
        status,
      }) => (
        <Container>
          <Row>
            <Col md={{span: 6, offset: 3}}>
              <Form>
                {!!status && <Alert variant="danger">
                  {status.credentials}
                </Alert>}
                <Form.Group controlId="formBasicUsername">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter username"
                    value={values.username}
                    name="username"
                    onChange={handleChange}
                    isInvalid={!!errors.username}
                  />

                  <Form.Control.Feedback type="invalid">
                    {errors.username}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={values.password}
                    name="password"
                    onChange={handleChange}
                    isInvalid={!!errors.password}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                </Form.Group>
                <Button
                  variant="primary"
                  type="button"
                  onClick={handleSubmit}
                >
                Submit
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      )
      }
    </Formik>
  );
};

export default withRouter(LogIn);
