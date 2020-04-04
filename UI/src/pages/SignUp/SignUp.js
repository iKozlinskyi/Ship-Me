import React from 'react';
import {Button, Container, Form, Row, Col, Alert} from 'react-bootstrap';
import authService from '../../service/AuthService';
import {withRouter} from 'react-router-dom';
import {
  SUCCESSFUL_REGISTRATION,
} from '../../constants/messages';
import * as yup from 'yup';
import {Formik} from 'formik';

const schema = yup.object({
  username: yup.string().required('Username is a required field'),
  email: yup.string().email('Please, enter a valid email').required(),
  password: yup.string().required('Password is required'),
  passwordConfirmation: yup.string()
      .oneOf([yup.ref('password'), null], 'Passwords must match'),
  accountType: yup.string().required('Please, choose your account type'),
});

const SignUp = (props) => {
  const handleSubmit = (formValues, {setSubmitting, setStatus}) => {
    const credentials = {
      username: formValues.username,
      password: formValues.password,
      email: formValues.email,
      role: formValues. accountType,
    };

    setStatus(null);

    // TODO: blinking message
    authService.register(credentials)
        .then(() => {
          props.history.push({
            pathname: '/',
            state: {
              message: SUCCESSFUL_REGISTRATION,
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
        email: '',
        password: '',
        passwordConfirmation: '',
        accountType: '',
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
                    isValid={!errors.username}
                  />

                  <Form.Control.Feedback type="invalid">
                    {errors.username}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={values.email}
                    name="email"
                    onChange={handleChange}
                    isInvalid={!!errors.email}
                  />

                  <Form.Control.Feedback type="invalid">
                    {errors.email}
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

                <Form.Group controlId="formBasicPasswordConfirm">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Your password again"
                    value={values.passwordConfirmation}
                    name="passwordConfirmation"
                    onChange={handleChange}
                    isInvalid={!!errors.passwordConfirmation}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.passwordConfirmation}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group>
                  {['DRIVER', 'SHIPPER'].map((accountType, idx) => {
                    return (
                      <Form.Check
                        key={idx}
                        type="radio"
                        name="accountType"
                        label={accountType}
                        value={accountType}
                        onChange={handleChange}
                        id={`accountType${accountType}`}
                        custom
                      />
                    );
                  })}
                  <Form.Control.Feedback type="invalid">
                    {errors.accountType}
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

export default withRouter(SignUp);
