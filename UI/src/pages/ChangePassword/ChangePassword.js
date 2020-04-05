import React from 'react';
import {Formik} from 'formik';
import {Alert, Button, Col, Container, Form, Row} from 'react-bootstrap';
import * as yup from 'yup';
import {postChangePassword} from '../../api/userApi';
import authService from '../../service/AuthService';
import {withRouter} from 'react-router-dom';
import {
  PASSWORD_CHANGED,
} from '../../constants/messages';

const schema = yup.object({
  currentPassword: yup.string().required('Current password is required'),
  newPassword: yup.string().required('New password is required'),
  passwordConfirmation: yup.string()
      .oneOf([yup.ref('newPassword'), null], 'Passwords must match'),
});

const ChangePassword = ({currentUser, history}) => {
  const handleSubmit = (formValues, {setStatus}) => {
    const passwordData = {
      oldPassword: formValues.currentPassword,
      newPassword: formValues.newPassword,
    };

    postChangePassword(currentUser._id, passwordData)
        .then(() => {
          authService.logOut();
          history.push({
            pathname: '/',
            state: {
              message: PASSWORD_CHANGED,
            },
          });
        })
        .catch((err) => {
          setStatus({password: err.response.data.error});
        });

    setStatus(null);
  };

  return (
    <Formik
      validationSchema={schema}
      onSubmit={handleSubmit}
      initialValues={{
        currentPassword: '',
        newPassword: '',
        passwordConfirmation: '',
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
                  {status.password}
                </Alert>}
                <Form.Group controlId="formCurrentPassword">
                  <Form.Label>Current Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter current password"
                    value={values.currentPassword}
                    name="currentPassword"
                    onChange={handleChange}
                    isInvalid={!!errors.currentPassword}
                  />

                  <Form.Control.Feedback type="invalid">
                    {errors.currentPassword}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formNewPassword">
                  <Form.Label>New password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter new password"
                    value={values.newPassword}
                    name="newPassword"
                    onChange={handleChange}
                    isInvalid={!!errors.newPassword}
                  />

                  <Form.Control.Feedback type="invalid">
                    {errors.newPassword}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formConfirmPassword">
                  <Form.Label>Confirm password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Confirm your new password"
                    value={values.passwordConfirmation}
                    name="passwordConfirmation"
                    onChange={handleChange}
                    isInvalid={!!errors.passwordConfirmation}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.passwordConfirmation}
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

export default withRouter(ChangePassword);
