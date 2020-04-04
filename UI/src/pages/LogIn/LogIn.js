import React, {Component} from 'react';
import {Button, Container, Form, Row, Col, Alert} from 'react-bootstrap';
import authService from '../../service/AuthService';
import {withRouter} from 'react-router-dom';
import {SUCCESSFULL_LOG_IN} from '../../constants/messages';

class LogIn extends Component {
  constructor() {
    super();

    this.state = {
      username: '',
      password: '',
      errorMessage: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
      errorMessage: '',
    });
  }

  handleSubmit(evt) {
    evt.preventDefault();

    const {username, password} = this.state;
    const credentials = {username, password};

    // TODO: blinking message
    authService.login(credentials)
        .then(() => {
          this.props.history.push({
            pathname: '/',
            state: {
              message: SUCCESSFULL_LOG_IN,
            },
          });
        }).catch((err) => {
          return this.setState({errorMessage: err.response.data.error});
        });
  }

  render() {
    const {username, password, errorMessage} = this.state;
    return (
      <Container>
        <Row>
          <Col md={{span: 6, offset: 3}}>
            <Form>
              {!!errorMessage && <Alert variant="danger">
                {errorMessage}
              </Alert>}
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter username"
                  value={username}
                  name="username"
                  onChange={this.handleChange}
                />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  name="password"
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Button
                variant="primary"
                type="button"
                onClick={this.handleSubmit}
              >
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default withRouter(LogIn);
